import { Competition, Category, LeaderboardEntry, Certificate, WinnerEntry, CommunityChannel, RoadmapPhase } from "../types";

export const mockCategories: Category[] = [
  {
    id: "cat-web",
    name: "Web Exploitation",
    slug: "web",
    description: "Flaws in modern web applications, API security, SSRF, JWT vulnerabilities, OAuth bypasses, and state-of-state web protocols.",
    challengeCount: 14,
    iconName: "Globe",
    colorBadge: "border-cyan-500/40 text-cyan-400 bg-cyan-950/30",
  },
  {
    id: "cat-crypto",
    name: "Cryptography",
    slug: "crypto",
    description: "Mathematical ciphers, RSA weak key construction, ECC attacks, lattice-based cryptography, and broken protocol primitives.",
    challengeCount: 12,
    iconName: "KeyRound",
    colorBadge: "border-purple-500/40 text-purple-400 bg-purple-950/30",
  },
  {
    id: "cat-forensics",
    name: "Digital Forensics",
    slug: "forensics",
    description: "Memory dumps, pcap network analysis, file format carving, disk artifacts, and incident investigation.",
    challengeCount: 10,
    iconName: "FileSearch",
    colorBadge: "border-emerald-500/40 text-emerald-400 bg-emerald-950/30",
  },
  {
    id: "cat-osint",
    name: "OSINT",
    slug: "osint",
    description: "Open source intelligence gathering, geolocation identification, public metadata analysis, and digital footprint tracking.",
    challengeCount: 8,
    iconName: "Radar",
    colorBadge: "border-amber-500/40 text-amber-400 bg-amber-950/30",
  },
  {
    id: "cat-rev",
    name: "Reverse Engineering",
    slug: "rev",
    description: "Decompiling ELF binaries, PE analysis, obfuscated bytecode unpacking, firmware reversing, and custom architecture assembly.",
    challengeCount: 11,
    iconName: "Binary",
    colorBadge: "border-blue-500/40 text-blue-400 bg-blue-950/30",
  },
  {
    id: "cat-pwn",
    name: "Binary Exploitation (Pwn)",
    slug: "pwn",
    description: "Stack buffer overflows, heap exploitation, ROP chain synthesis, format string vulnerability execution, and kernel pwn.",
    challengeCount: 9,
    iconName: "Terminal",
    colorBadge: "border-rose-500/40 text-rose-400 bg-rose-950/30",
  },
  {
    id: "cat-linux",
    name: "Linux Security",
    slug: "linux",
    description: "Privilege escalation, misconfigured SUID binaries, kernel module reversing, systemd sandboxing, and container escapes.",
    challengeCount: 8,
    iconName: "Cpu",
    colorBadge: "border-teal-500/40 text-teal-400 bg-teal-950/30",
  },
  {
    id: "cat-misc",
    name: "Miscellaneous",
    slug: "misc",
    description: "Esoteric programming languages, hardware signals, steganography, machine learning adversarial attacks, and hybrid security challenges.",
    challengeCount: 6,
    iconName: "Sparkles",
    colorBadge: "border-slate-500/40 text-slate-300 bg-slate-900/40",
  },
];

export const mockCompetitions: Competition[] = [
  {
    id: "comp-01",
    slug: "sirenctf-01",
    name: "SirenCTF #01",
    tagline: "The inaugural cybersecurity tournament by Siren Cybersecurity Community.",
    description: "SirenCTF #01 is our flagship upcoming open cybersecurity competition. Official dates, challenge counts, format rules, and prize distributions will be announced prior to registration opening.",
    status: "UPCOMING",
    format: "Jeopardy",
    startDate: "2026-11-14T12:00:00Z",
    endDate: "2026-11-16T12:00:00Z",
    durationHours: 48,
    teamSize: "1 - 4 Members",
    difficulty: "All Skill Levels",
    prizePool: "TBA (To Be Announced)",
    participantCount: 0,
    teamCount: 0,
    challengeCount: 0,
    categories: ["web", "crypto", "forensics", "osint", "rev", "pwn", "linux", "misc"],
    rules: [
      "Attacking competition infrastructure or scoring servers will result in immediate disqualification.",
      "Flag sharing or collusion between different registered teams is strictly prohibited.",
      "Automated heavy vulnerability scanners (e.g. sqlmap, dirbuster) against challenge web servers are prohibited unless explicitly instructed.",
      "The decision of SirenCTF administrators is final regarding flag disputes.",
      "Writeups may be published after the official competition conclusion."
    ],
    schedule: [
      { time: "Nov 14, 12:00 UTC", event: "Opening Ceremony & Competition Kickoff" },
      { time: "Nov 14, 18:00 UTC", event: "Wave 2 Challenge Unlock" },
      { time: "Nov 15, 12:00 UTC", event: "Wave 3 Hardcore Challenge Unlock" },
      { time: "Nov 16, 11:30 UTC", event: "Final Score Freeze (Last 30 Mins)" },
      { time: "Nov 16, 12:00 UTC", event: "Competition Conclusion & Writeup Submission Window" },
      { time: "Nov 18, 16:00 UTC", event: "Official Results Announcement & Certificate Issuance" }
    ],
    prizes: [
      { rank: "1st Place", reward: "$1,800 USD", detail: "Custom SirenCTF Trophy + Gold Verifiable Winner Certificates + Hardware Hacking Kit" },
      { rank: "2nd Place", reward: "$1,000 USD", detail: "Silver Verifiable Winner Certificates + Annual Security Subscription" },
      { rank: "3rd Place", reward: "$700 USD", detail: "Bronze Verifiable Winner Certificates + SirenCTF Swag Pack" },
      { rank: "Top 10", reward: "Official Distinction", detail: "Digitally Signed Top 10 Certificate of Excellence" },
      { rank: "First Bloods", reward: "Special Badge", detail: "Special Recognition Certificate for Fastest Category Solves" }
    ],
    organizers: ["Siren Cybersecurity Community Core Team"]
  },
  {
    id: "comp-00",
    slug: "sirenctf-00-beta",
    name: "SirenCTF #00 Beta",
    tagline: "Closed beta testing tournament for platform stability & challenge calibration.",
    description: "SirenCTF #00 Beta brought together 120 invite-only teams to benchmark our scoring infrastructure, calibrate challenge difficulty, and validate certificate verification flows.",
    status: "ENDED",
    format: "Jeopardy",
    startDate: "2026-03-10T14:00:00Z",
    endDate: "2026-03-11T14:00:00Z",
    durationHours: 24,
    teamSize: "1 - 4 Members",
    difficulty: "Intermediate",
    prizePool: "$1,000 USD + Swag + Beta Contributor Badges",
    participantCount: 420,
    teamCount: 128,
    challengeCount: 28,
    categories: ["web", "crypto", "forensics", "rev", "pwn"],
    winner: {
      teamName: "nullbyte",
      score: 4850,
      countryCode: "US"
    },
    rules: [
      "Standard SirenCTF Fair Play rules applied."
    ],
    schedule: [
      { time: "Mar 10, 14:00 UTC", event: "Beta Start" },
      { time: "Mar 11, 14:00 UTC", event: "Beta End" }
    ],
    prizes: [
      { rank: "1st Place", reward: "$500 USD", detail: "Team nullbyte" },
      { rank: "2nd Place", reward: "$300 USD", detail: "Team 0xghost" },
      { rank: "3rd Place", reward: "$200 USD", detail: "Team packetloss" }
    ],
    organizers: ["Siren CTF Team"]
  },
  {
    id: "comp-winter-2025",
    slug: "sirenctf-winter-2025",
    name: "SirenCTF Winter Cyber Clash 2025",
    tagline: "End-of-year cybersecurity contest featuring realistic cloud and kernel scenarios.",
    description: "A 36-hour intense competition testing defensive analysis, reverse engineering, and advanced web exploitation tactics under simulated enterprise network conditions.",
    status: "ENDED",
    format: "Jeopardy",
    startDate: "2025-12-05T18:00:00Z",
    endDate: "2025-12-07T06:00:00Z",
    durationHours: 36,
    teamSize: "1 - 5 Members",
    difficulty: "Advanced",
    prizePool: "$2,000 USD + Digital Badges",
    participantCount: 650,
    teamCount: 194,
    challengeCount: 35,
    categories: ["web", "crypto", "forensics", "osint", "rev", "pwn", "linux"],
    winner: {
      teamName: "0xghost",
      score: 6120,
      countryCode: "DE"
    },
    rules: [
      "Fair Play rules enforced."
    ],
    schedule: [],
    prizes: [],
    organizers: ["Siren Community"]
  }
];

export const mockLeaderboardEntries: LeaderboardEntry[] = [
  {
    rank: 1,
    teamId: "team-nullbyte",
    teamName: "nullbyte",
    affiliation: "Independent Security Collective",
    countryCode: "US",
    score: 4850,
    solvesCount: 27,
    lastSolveTime: "18m ago",
    categoryBreakdown: { web: 4, crypto: 5, forensics: 4, osint: 3, rev: 4, pwn: 4, linux: 2, misc: 1 },
    trend: "steady"
  },
  {
    rank: 2,
    teamId: "team-0xghost",
    teamName: "0xghost",
    affiliation: "CyberSec Research Labs",
    countryCode: "DE",
    score: 4620,
    solvesCount: 25,
    lastSolveTime: "34m ago",
    categoryBreakdown: { web: 5, crypto: 4, forensics: 3, osint: 3, rev: 4, pwn: 3, linux: 2, misc: 1 },
    trend: "up"
  },
  {
    rank: 3,
    teamId: "team-packetloss",
    teamName: "packetloss",
    affiliation: "TU Berlin Security",
    countryCode: "SE",
    score: 4210,
    solvesCount: 23,
    lastSolveTime: "1h 05m ago",
    categoryBreakdown: { web: 3, crypto: 4, forensics: 4, osint: 2, rev: 3, pwn: 4, linux: 2, misc: 1 },
    trend: "down"
  },
  {
    rank: 4,
    teamId: "team-rootkit",
    teamName: "rootkit",
    affiliation: "Kernel Exploiters Guild",
    countryCode: "JP",
    score: 3950,
    solvesCount: 21,
    lastSolveTime: "1h 42m ago",
    categoryBreakdown: { web: 2, crypto: 3, forensics: 3, osint: 2, rev: 5, pwn: 4, linux: 1, misc: 1 },
    trend: "up"
  },
  {
    rank: 5,
    teamId: "team-shellshock",
    teamName: "shellshock",
    affiliation: "MIT Cybersecurity Club",
    countryCode: "CA",
    score: 3780,
    solvesCount: 20,
    lastSolveTime: "2h 10m ago",
    categoryBreakdown: { web: 4, crypto: 3, forensics: 3, osint: 2, rev: 2, pwn: 3, linux: 2, misc: 1 },
    trend: "steady"
  },
  {
    rank: 6,
    teamId: "team-synack",
    teamName: "synack_attackers",
    affiliation: "RedTeam Ops",
    countryCode: "UK",
    score: 3410,
    solvesCount: 18,
    lastSolveTime: "3h 15m ago",
    categoryBreakdown: { web: 3, crypto: 2, forensics: 3, osint: 3, rev: 2, pwn: 2, linux: 2, misc: 1 },
    trend: "up"
  },
  {
    rank: 7,
    teamId: "team-bytebenders",
    teamName: "bytebenders",
    affiliation: "ETH Zurich Security",
    countryCode: "CH",
    score: 3200,
    solvesCount: 17,
    lastSolveTime: "4h 02m ago",
    categoryBreakdown: { web: 3, crypto: 3, forensics: 2, osint: 2, rev: 3, pwn: 2, linux: 1, misc: 1 },
    trend: "down"
  },
  {
    rank: 8,
    teamId: "team-bufferoverflow",
    teamName: "buffer_overflow",
    affiliation: "Carnegie Mellon",
    countryCode: "US",
    score: 2980,
    solvesCount: 16,
    lastSolveTime: "5h 20m ago",
    categoryBreakdown: { web: 2, crypto: 2, forensics: 2, osint: 2, rev: 4, pwn: 3, linux: 1, misc: 0 },
    trend: "steady"
  },
  {
    rank: 9,
    teamId: "team-darksignal",
    teamName: "darksignal",
    affiliation: "Independent Team",
    countryCode: "NL",
    score: 2850,
    solvesCount: 15,
    lastSolveTime: "6h 11m ago",
    categoryBreakdown: { web: 3, crypto: 2, forensics: 2, osint: 3, rev: 2, pwn: 1, linux: 1, misc: 1 },
    trend: "up"
  },
  {
    rank: 10,
    teamId: "team-cybervanguard",
    teamName: "cyber_vanguard",
    affiliation: "SG Security Alliance",
    countryCode: "SG",
    score: 2640,
    solvesCount: 14,
    lastSolveTime: "7h 45m ago",
    categoryBreakdown: { web: 2, crypto: 3, forensics: 2, osint: 2, rev: 2, pwn: 1, linux: 1, misc: 1 },
    trend: "steady"
  }
];

export const mockCertificates: Record<string, Certificate> = {
  "SRN-2025-8F92A": {
    id: "SRN-2025-8F92A",
    participantName: "Alex Vance",
    teamName: "nullbyte",
    competitionId: "comp-00",
    competitionName: "SirenCTF #00 Beta",
    achievement: "1st Place Winner",
    placementRank: 1,
    totalTeams: 128,
    issueDate: "March 11, 2026",
    issuer: "Siren Cybersecurity Community Certification Board",
    verificationHash: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    isValid: true,
    metadata: {
      totalSolves: 27,
      totalPoints: 4850,
      categoriesMastered: ["Web Exploitation", "Cryptography", "Reverse Engineering", "Pwn"]
    }
  },
  "SRN-2025-7E14B": {
    id: "SRN-2025-7E14B",
    participantName: "Elena Rostova",
    teamName: "0xghost",
    competitionId: "comp-winter-2025",
    competitionName: "SirenCTF Winter Cyber Clash 2025",
    achievement: "1st Place Winner",
    placementRank: 1,
    totalTeams: 194,
    issueDate: "December 7, 2025",
    issuer: "Siren Cybersecurity Community Certification Board",
    verificationHash: "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08",
    isValid: true,
    metadata: {
      totalSolves: 25,
      totalPoints: 6120,
      categoriesMastered: ["Digital Forensics", "OSINT", "Pwn", "Linux Security"]
    }
  },
  "SRN-2025-3C99D": {
    id: "SRN-2025-3C99D",
    participantName: "Marcus Brody",
    teamName: "packetloss",
    competitionId: "comp-00",
    competitionName: "SirenCTF #00 Beta",
    achievement: "Top 3 Finalist",
    placementRank: 3,
    totalTeams: 128,
    issueDate: "March 11, 2026",
    issuer: "Siren Cybersecurity Community Certification Board",
    verificationHash: "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8",
    isValid: true,
    metadata: {
      totalSolves: 23,
      totalPoints: 4210,
      categoriesMastered: ["Cryptography", "Digital Forensics"]
    }
  }
};

export const mockWinners: WinnerEntry[] = [
  {
    competitionId: "comp-00",
    competitionName: "SirenCTF #00 Beta",
    date: "March 2026",
    highlight: "128 teams fought in a 24-hour non-stop tournament. Team nullbyte achieved first blood on the hard pwn challenge.",
    topTeams: [
      { rank: 1, teamName: "nullbyte", score: 4850, members: ["Alex Vance", "V0idPointer", "CipherGeek", "HexRider"], countryCode: "US", prize: "$500 USD + Gold Certificate" },
      { rank: 2, teamName: "0xghost", score: 4620, members: ["Elena Rostova", "PhantomKernel", "ShadowByte"], countryCode: "DE", prize: "$300 USD + Silver Certificate" },
      { rank: 3, teamName: "packetloss", score: 4210, members: ["Marcus Brody", "NetSniffer", "AckOverflow"], countryCode: "SE", prize: "$200 USD + Bronze Certificate" }
    ]
  },
  {
    competitionId: "comp-winter-2025",
    competitionName: "SirenCTF Winter Cyber Clash 2025",
    date: "December 2025",
    highlight: "194 international teams solved 35 enterprise infrastructure scenarios over 36 hours.",
    topTeams: [
      { rank: 1, teamName: "0xghost", score: 6120, members: ["Elena Rostova", "PhantomKernel", "ShadowByte", "RootReaper"], countryCode: "DE", prize: "$1,000 USD + Trophy" },
      { rank: 2, teamName: "nullbyte", score: 5890, members: ["Alex Vance", "V0idPointer", "CipherGeek"], countryCode: "US", prize: "$600 USD" },
      { rank: 3, teamName: "rootkit", score: 5410, members: ["Kenji Sato", "SyscallMaster", "ElfUnpacker"], countryCode: "JP", prize: "$400 USD" }
    ]
  }
];

export const mockCommunityChannels: CommunityChannel[] = [
  {
    id: "comm-discord",
    platform: "Discord",
    name: "SirenCTF Official Discord",
    description: "The primary hub for real-time competition announcements, team formation, writeup discussions, and category help.",
    memberCount: "PRIMARY HUB",
    url: "",
    isPrimary: true
  },
  {
    id: "comm-whatsapp",
    platform: "WhatsApp",
    name: "Siren Cybersecurity Community Chat",
    description: "Direct channel for competition reminders, registration notifications, schedule updates, and official SirenCTF announcements.",
    memberCount: "ANNOUNCEMENTS",
    url: "",
    isPrimary: true
  },
  {
    id: "comm-github",
    platform: "GitHub",
    name: "SirenCTF Open Source & Writeups",
    description: "Official repository for challenge archives, past competition writeups, open-source toolkits, and platform resources.",
    memberCount: "OPEN REPOSITORY",
    url: "",
    isPrimary: true
  }
];

export const mockRoadmap: RoadmapPhase[] = [
  {
    phase: "V0",
    title: "Public Branded Platform Foundation",
    status: "CURRENT",
    description: "Launch polished public website, brand visual system, digital certificate verification engine, and competition calendar.",
    features: [
      "Custom modern technical dark theme & signal visual system",
      "Decoupled data access layer abstraction",
      "Verifiable digital certificates public portal",
      "Community hub integration (Discord, WhatsApp, GitHub)"
    ]
  },
  {
    phase: "V1",
    title: "Branded CTFd Integration & Direct Registration",
    status: "PLANNED",
    description: "Seamless single sign-on experience between SirenCTF portal and CTFd competition engine.",
    features: [
      "Custom CTFd theme matching SirenCTF design tokens",
      "Unified participant registration & team dashboard",
      "Automatic post-competition certificate issuance"
    ]
  },
  {
    phase: "V2",
    title: "Organizer Control Dashboard",
    status: "PLANNED",
    description: "Internal dashboard for SirenCTF organizers to manage challenges, schedule waves, freeze scoreboards, and issue prizes.",
    features: [
      "Challenge deployment status monitors",
      "Real-time solve telemetry & suspicious submission flags",
      "Automated writeup submission reviewer"
    ]
  },
  {
    phase: "V3",
    title: "Native Siren CTF Engine API",
    status: "PLANNED",
    description: "Custom lightweight API layer bridging scoring engines, database backends, and verification services.",
    features: [
      "REST & GraphQL endpoints for real-time scoreboard sync",
      "Supabase database integration",
      "Encrypted flag submission validation"
    ]
  },
  {
    phase: "V4",
    title: "Dockerized Dynamic Challenge Orchestration",
    status: "FUTURE",
    description: "On-demand isolated container instances per team for Web and Pwn challenges.",
    features: [
      "Isolated container spawning via Kubernetes / Docker Swarm",
      "Automated challenge instance lifespan timer & extension",
      "Resource allocation safety limits"
    ]
  },
  {
    phase: "V5",
    title: "Self-Service Organization Hosting",
    status: "FUTURE",
    description: "Allow university clubs and cybersecurity organizations to host their own CTFs using SirenCTF infrastructure.",
    features: [
      "Custom domain & sub-brand support for host organizations",
      "Curated challenge library access for organizers",
      "Organization competition analytics & reports"
    ]
  },
  {
    phase: "V6",
    title: "SirenCTF Multi-Tenant CTF-as-a-Service Platform",
    status: "FUTURE",
    description: "Full multi-tenant enterprise cybersecurity competition cloud platform.",
    features: [
      "Enterprise SLA & dedicated challenge cluster provisioning",
      "Custom skill taxonomy matrix & hiring assessment reporting",
      "Global verified security talent leaderboard"
    ]
  }
];
