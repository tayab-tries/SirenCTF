-- =============================================================================
-- SirenCTF Database Hydration Seed Script
-- Translates initial mock records into production SQL INSERT statements
-- =============================================================================

-- 1. SEED TENANTS
INSERT INTO public.tenants (id, slug, name, type, plan, status, contact_email, branding, quota) VALUES
(
    'tenant-siren-core',
    'siren-core',
    'SirenCTF Platform Core',
    'ENTERPRISE',
    'ENTERPRISE_CUSTOM',
    'ACTIVE',
    'admin@sirenctf.org',
    '{"displayName": "SirenCTF Official", "tagline": "The premier cybersecurity competition platform", "primaryAccentColor": "#E31B2E"}'::jsonb,
    '{"maxActiveTournaments": 10, "maxParticipantsPerEvent": 5000, "dynamicContainersEnabled": true, "customCertificatesEnabled": true}'::jsonb
),
(
    'tenant-nust-cyber',
    'nust-cyber',
    'NUST Cyber Security Society',
    'UNIVERSITY',
    'ACADEMIC_TIER',
    'ACTIVE',
    'cybersec@nust.edu.pk',
    '{"displayName": "NUST CyberSec", "tagline": "National University of Sciences & Technology Cyber Club", "primaryAccentColor": "#00E5FF"}'::jsonb,
    '{"maxActiveTournaments": 3, "maxParticipantsPerEvent": 1000, "dynamicContainersEnabled": true, "customCertificatesEnabled": true}'::jsonb
),
(
    'tenant-fast-sec',
    'fast-sec',
    'FAST NUCES Security Chapter',
    'UNIVERSITY',
    'ACADEMIC_TIER',
    'ACTIVE',
    'security@fast.edu.pk',
    '{"displayName": "FAST-Sec", "tagline": "FAST National University Cybersecurity Chapter", "primaryAccentColor": "#00FF66"}'::jsonb,
    '{"maxActiveTournaments": 2, "maxParticipantsPerEvent": 800, "dynamicContainersEnabled": true, "customCertificatesEnabled": true}'::jsonb
),
(
    'tenant-air-sec',
    'air-sec',
    'Air University Cyber Alliance',
    'SOCIETY',
    'FREE_COMMUNITY',
    'PROVISIONING',
    'info@airsec-society.org',
    '{"displayName": "AirSec Society", "tagline": "Student cybersecurity research group", "primaryAccentColor": "#FFB000"}'::jsonb,
    '{"maxActiveTournaments": 1, "maxParticipantsPerEvent": 300, "dynamicContainersEnabled": false, "customCertificatesEnabled": false}'::jsonb
)
ON CONFLICT (id) DO NOTHING;

-- 2. SEED COMPETITIONS
INSERT INTO public.competitions (id, slug, name, tagline, description, status, registration_status, format, start_date, end_date, duration_hours, is_provisional, ctfd_url, registration_url, rules, prizes, schedule, tenant_id) VALUES
(
    'comp-01',
    'sirenctf-01',
    'SirenCTF #01',
    'The inaugural university cybersecurity championship.',
    'SirenCTF #01 is our flagship upcoming cybersecurity competition. Official dates, challenge counts, format rules, and prize distributions will be announced prior to registration opening.',
    'ANNOUNCED',
    'OPENING_SOON',
    'Jeopardy',
    '2026-10-01T00:00:00Z',
    '2026-10-03T00:00:00Z',
    48,
    true,
    '',
    '',
    '["Final competition rules and platform guidelines will be published prior to registration opening.", "Attacking competition scoring infrastructure or other teams is strictly prohibited.", "Fair Play guidelines enforce individual and team integrity across all challenge categories."]'::jsonb,
    '[{"rank": "Top Teams", "reward": "TBA", "detail": "Custom SirenCTF Trophies, Badges & Verifiable Certificates"}]'::jsonb,
    '[{"time": "Target Q4 2026", "event": "Official Registration Opening & Platform Onboarding"}]'::jsonb,
    'tenant-siren-core'
),
(
    'comp-00',
    'sirenctf-00-beta',
    'SirenCTF #00 Beta',
    'Closed beta testing tournament for platform stability & challenge calibration.',
    'SirenCTF #00 Beta brought together 120 invite-only teams to benchmark our scoring infrastructure, calibrate challenge difficulty, and validate certificate verification flows.',
    'ENDED',
    'CLOSED',
    'Jeopardy',
    '2026-03-10T14:00:00Z',
    '2026-03-11T14:00:00Z',
    24,
    false,
    '',
    '',
    '["Standard SirenCTF Fair Play rules applied."]'::jsonb,
    '[{"rank": "1st Place", "reward": "$500 USD", "detail": "Team nullbyte"}, {"rank": "2nd Place", "reward": "$300 USD", "detail": "Team 0xghost"}]'::jsonb,
    '[{"time": "Mar 10, 14:00 UTC", "event": "Beta Start"}]'::jsonb,
    'tenant-siren-core'
),
(
    'comp-winter-2025',
    'sirenctf-winter-2025',
    'SirenCTF Winter Cyber Clash 2025',
    'End-of-year cybersecurity contest featuring realistic cloud and kernel scenarios.',
    'A 36-hour intense competition testing defensive analysis, reverse engineering, and advanced web exploitation tactics under simulated enterprise network conditions.',
    'ENDED',
    'CLOSED',
    'Jeopardy',
    '2025-12-05T18:00:00Z',
    '2025-12-07T06:00:00Z',
    36,
    false,
    '',
    '',
    '["Fair Play rules enforced."]'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb,
    'tenant-siren-core'
)
ON CONFLICT (id) DO NOTHING;

-- 3. SEED CHALLENGES
INSERT INTO public.challenges (id, competition_id, title, category, difficulty, points, type, flag_pattern, container_spec, artifact_url, is_isolated, author, status) VALUES
(
    'chal-pwn-01',
    'comp-01',
    'Stack Overflow Odyssey',
    'pwn',
    'Medium',
    350,
    'DYNAMIC_CONTAINER',
    'siren{st4ck_sm4sh_pr0t3ct10n_byp4ss_2026}',
    '{"image": "sirenctf/pwn-stack-odyssey:v1.2", "internalPort": 1337, "memoryLimit": "128MB", "cpuLimit": "0.25", "timeoutMinutes": 15, "networkIsolation": "INTERNAL_ONLY"}'::jsonb,
    NULL,
    true,
    'V0idPointer',
    'DEPLOYED'
),
(
    'chal-web-01',
    'comp-01',
    'SQLi Vault Breach',
    'web',
    'Hard',
    450,
    'DYNAMIC_CONTAINER',
    'siren{un10n_b4s3d_sqli_3xf1ltr4t10n_m4st3r}',
    '{"image": "sirenctf/web-sqli-vault:v2.0", "internalPort": 80, "memoryLimit": "256MB", "cpuLimit": "0.50", "timeoutMinutes": 20, "networkIsolation": "EGRESS_FILTERED"}'::jsonb,
    NULL,
    true,
    'CipherGeek',
    'DEPLOYED'
),
(
    'chal-crypto-01',
    'comp-01',
    'Faulty RSA Prime Forge',
    'crypto',
    'Easy',
    200,
    'STATIC_ARTIFACT',
    'siren{gcd_sm4ll_pr1m3_f4ct0r1z4t10n}',
    NULL,
    '/artifacts/faulty_rsa_public_keys.tar.gz',
    false,
    'Alice_Crypto',
    'DEPLOYED'
),
(
    'chal-forensics-01',
    'comp-01',
    'Memory Artifact Extraction',
    'forensics',
    'Medium',
    300,
    'STATIC_ARTIFACT',
    'siren{v0l4t1l1ty_3xr4ct_ls4ss_dmp}',
    NULL,
    '/artifacts/memdump_win11_investigation.raw.xz',
    false,
    'ForensicsCore',
    'DEPLOYED'
)
ON CONFLICT (id) DO NOTHING;

-- 4. SEED CERTIFICATES
INSERT INTO public.certificates (id, participant_name, team_name, competition_id, competition_name, achievement_type, achievement_title, placement_rank, total_teams, issue_date, issuer, verification_hash, is_valid, is_demo_record, metadata) VALUES
(
    'SRN-2025-8F92A',
    'Alex Vance',
    'nullbyte',
    'comp-00',
    'SirenCTF #00 Beta',
    'WINNER',
    '1st Place Champion',
    1,
    128,
    '2026-03-11T00:00:00Z',
    'SirenCTF Competitions Committee',
    'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    true,
    true,
    '{"totalSolves": 27, "totalPoints": 4850, "categoriesMastered": ["Web Exploitation", "Cryptography", "Reverse Engineering", "Pwn"]}'::jsonb
),
(
    'SRN-2025-7E14B',
    'Elena Rostova',
    '0xghost',
    'comp-winter-2025',
    'SirenCTF Winter Cyber Clash 2025',
    'WINNER',
    '1st Place Champion',
    1,
    194,
    '2025-12-07T00:00:00Z',
    'SirenCTF Competitions Committee',
    '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08',
    true,
    true,
    '{"totalSolves": 25, "totalPoints": 6120, "categoriesMastered": ["Digital Forensics", "OSINT", "Pwn", "Linux Security"]}'::jsonb
),
(
    'SRN-2025-3C99D',
    'Marcus Brody',
    'packetloss',
    'comp-00',
    'SirenCTF #00 Beta',
    'PODIUM',
    'Top 3 Podium Finalist',
    3,
    128,
    '2026-03-11T00:00:00Z',
    'SirenCTF Competitions Committee',
    '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8',
    true,
    true,
    '{"totalSolves": 23, "totalPoints": 4210, "categoriesMastered": ["Cryptography", "Digital Forensics"]}'::jsonb
)
ON CONFLICT (id) DO NOTHING;
