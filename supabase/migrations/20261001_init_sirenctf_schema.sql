-- =============================================================================
-- SirenCTF Production PostgreSQL / Supabase Migration
-- Initial Schema & Row-Level Security Policies
-- =============================================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Function to handle updated_at timestamps automatically
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- -----------------------------------------------------------------------------
-- 1. TENANTS TABLE
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.tenants (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('UNIVERSITY', 'SOCIETY', 'ENTERPRISE', 'COMMUNITY')),
    plan TEXT NOT NULL CHECK (plan IN ('FREE_COMMUNITY', 'ACADEMIC_TIER', 'ENTERPRISE_CUSTOM')),
    status TEXT NOT NULL CHECK (status IN ('ACTIVE', 'PROVISIONING', 'SUSPENDED')),
    contact_email TEXT NOT NULL,
    branding JSONB NOT NULL DEFAULT '{}'::jsonb,
    quota JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_tenants_slug ON public.tenants (slug);
CREATE INDEX IF NOT EXISTS idx_tenants_status ON public.tenants (status);

CREATE TRIGGER set_tenants_updated_at
BEFORE UPDATE ON public.tenants
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- -----------------------------------------------------------------------------
-- 2. COMPETITIONS TABLE
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.competitions (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    tagline TEXT,
    description TEXT,
    status TEXT NOT NULL CHECK (status IN ('DRAFT', 'ANNOUNCED', 'REGISTRATION_OPEN', 'LIVE', 'ENDED', 'ARCHIVED')),
    registration_status TEXT NOT NULL DEFAULT 'TBA' CHECK (registration_status IN ('TBA', 'OPENING_SOON', 'OPEN', 'CLOSED')),
    format TEXT NOT NULL DEFAULT 'Jeopardy' CHECK (format IN ('Jeopardy', 'Attack-Defense', 'King of the Hill', 'Mixed')),
    start_date TIMESTAMPTZ NOT NULL,
    end_date TIMESTAMPTZ NOT NULL,
    duration_hours INTEGER NOT NULL DEFAULT 48,
    is_provisional BOOLEAN NOT NULL DEFAULT true,
    ctfd_url TEXT DEFAULT '',
    registration_url TEXT DEFAULT '',
    rules JSONB DEFAULT '[]'::jsonb,
    prizes JSONB DEFAULT '[]'::jsonb,
    schedule JSONB DEFAULT '[]'::jsonb,
    tenant_id TEXT REFERENCES public.tenants(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_competitions_slug ON public.competitions (slug);
CREATE INDEX IF NOT EXISTS idx_competitions_status ON public.competitions (status);
CREATE INDEX IF NOT EXISTS idx_competitions_tenant ON public.competitions (tenant_id);

CREATE TRIGGER set_competitions_updated_at
BEFORE UPDATE ON public.competitions
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- -----------------------------------------------------------------------------
-- 3. CHALLENGES TABLE
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.challenges (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    competition_id TEXT REFERENCES public.competitions(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('web', 'crypto', 'forensics', 'osint', 'rev', 'pwn', 'linux', 'misc')),
    difficulty TEXT NOT NULL CHECK (difficulty IN ('Easy', 'Medium', 'Hard', 'Insane')),
    points INTEGER NOT NULL DEFAULT 100,
    type TEXT NOT NULL CHECK (type IN ('DYNAMIC_CONTAINER', 'STATIC_ARTIFACT', 'MANAGED_SERVICE')),
    flag_pattern TEXT NOT NULL DEFAULT 'siren{[a-f0-9]+}',
    container_spec JSONB,
    artifact_url TEXT,
    is_isolated BOOLEAN NOT NULL DEFAULT false,
    author TEXT NOT NULL DEFAULT 'SirenCTF Core',
    status TEXT NOT NULL DEFAULT 'DEPLOYED' CHECK (status IN ('DEPLOYED', 'STANDBY', 'DRAFT')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_challenges_competition ON public.challenges (competition_id);
CREATE INDEX IF NOT EXISTS idx_challenges_category ON public.challenges (category);

CREATE TRIGGER set_challenges_updated_at
BEFORE UPDATE ON public.challenges
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- -----------------------------------------------------------------------------
-- 4. CERTIFICATES TABLE (Verifiable Achievement Records)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.certificates (
    id TEXT PRIMARY KEY, -- e.g. "SRN-2025-8F92A"
    participant_name TEXT NOT NULL,
    team_name TEXT NOT NULL,
    competition_id TEXT REFERENCES public.competitions(id) ON DELETE SET NULL,
    competition_name TEXT NOT NULL,
    achievement_type TEXT NOT NULL CHECK (achievement_type IN ('WINNER', 'PODIUM', 'TOP_TEN', 'PARTICIPATION', 'HONORABLE_MENTION')),
    achievement_title TEXT NOT NULL,
    placement_rank INTEGER,
    total_teams INTEGER,
    issue_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    issuer TEXT NOT NULL DEFAULT 'SirenCTF Competitions Committee',
    verification_hash TEXT NOT NULL,
    is_valid BOOLEAN NOT NULL DEFAULT true,
    is_demo_record BOOLEAN NOT NULL DEFAULT false,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_certificates_hash ON public.certificates (verification_hash);
CREATE INDEX IF NOT EXISTS idx_certificates_competition ON public.certificates (competition_id);

CREATE TRIGGER set_certificates_updated_at
BEFORE UPDATE ON public.certificates
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- -----------------------------------------------------------------------------
-- 5. ORGANIZERS TABLE
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.organizers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('PLATFORM_ADMIN', 'ORGANIZER', 'CHALLENGE_AUTHOR')),
    tenant_id TEXT REFERENCES public.tenants(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_organizers_email ON public.organizers (email);
CREATE INDEX IF NOT EXISTS idx_organizers_tenant ON public.organizers (tenant_id);

CREATE TRIGGER set_organizers_updated_at
BEFORE UPDATE ON public.organizers
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =============================================================================
-- ROW-LEVEL SECURITY (RLS) POLICIES
-- =============================================================================

ALTER TABLE public.tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.competitions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.organizers ENABLE ROW LEVEL SECURITY;

-- -----------------------------------------------------------------------------
-- Tenants RLS
-- -----------------------------------------------------------------------------
-- Public read active tenants
CREATE POLICY "Public Read Active Tenants" ON public.tenants
    FOR SELECT USING (status = 'ACTIVE' OR status = 'PROVISIONING');

-- Organizers and Admins Full Access
CREATE POLICY "Admin Full Access Tenants" ON public.tenants
    FOR ALL USING (auth.uid() IN (SELECT id FROM public.organizers WHERE role = 'PLATFORM_ADMIN'));

-- -----------------------------------------------------------------------------
-- Competitions RLS
-- -----------------------------------------------------------------------------
-- Public read published competitions
CREATE POLICY "Public Read Competitions" ON public.competitions
    FOR SELECT USING (status IN ('ANNOUNCED', 'REGISTRATION_OPEN', 'LIVE', 'ENDED', 'ARCHIVED'));

-- Organizer Tenant Write Access
CREATE POLICY "Organizer Write Competitions" ON public.competitions
    FOR ALL USING (
        tenant_id IN (
            SELECT tenant_id FROM public.organizers WHERE id = auth.uid()
        ) OR auth.uid() IN (
            SELECT id FROM public.organizers WHERE role = 'PLATFORM_ADMIN'
        )
    );

-- -----------------------------------------------------------------------------
-- Challenges RLS
-- -----------------------------------------------------------------------------
-- Public read deployed challenges for live/ended competitions
CREATE POLICY "Public Read Deployed Challenges" ON public.challenges
    FOR SELECT USING (status = 'DEPLOYED');

-- Organizer / Challenge Author Full Access
CREATE POLICY "Organizer Manage Challenges" ON public.challenges
    FOR ALL USING (
        auth.uid() IN (SELECT id FROM public.organizers)
    );

-- -----------------------------------------------------------------------------
-- Certificates RLS
-- -----------------------------------------------------------------------------
-- Public read valid certificates (Verification Portal)
CREATE POLICY "Public Read Valid Certificates" ON public.certificates
    FOR SELECT USING (is_valid = true);

-- Organizer Manage Certificates
CREATE POLICY "Organizer Manage Certificates" ON public.certificates
    FOR ALL USING (
        auth.uid() IN (SELECT id FROM public.organizers)
    );

-- -----------------------------------------------------------------------------
-- Organizers RLS
-- -----------------------------------------------------------------------------
-- Self profile read
CREATE POLICY "Self Profile Read" ON public.organizers
    FOR SELECT USING (id = auth.uid() OR auth.uid() IN (SELECT id FROM public.organizers WHERE role = 'PLATFORM_ADMIN'));
