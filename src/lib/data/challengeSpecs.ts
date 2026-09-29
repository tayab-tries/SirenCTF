import { ChallengeRecord } from "../types";

export const mockChallengeRecords: ChallengeRecord[] = [
  {
    id: "chal-pwn-01",
    title: "Stack Overflow Odyssey",
    category: "pwn",
    difficulty: "Medium",
    points: 350,
    type: "DYNAMIC_CONTAINER",
    flagPattern: "siren{st4ck_sm4sh_pr0t3ct10n_byp4ss_2026}",
    containerSpec: {
      image: "sirenctf/pwn-stack-odyssey:v1.2",
      internalPort: 1337,
      memoryLimit: "128MB",
      cpuLimit: "0.25",
      timeoutMinutes: 15,
      networkIsolation: "INTERNAL_ONLY",
      envVars: {
        FLAG: "siren{st4ck_sm4sh_pr0t3ct10n_byp4ss_2026}",
        LISTEN_PORT: "1337"
      }
    },
    isIsolated: true,
    author: "V0idPointer",
    status: "DEPLOYED"
  },
  {
    id: "chal-web-01",
    title: "SQLi Vault Breach",
    category: "web",
    difficulty: "Hard",
    points: 450,
    type: "DYNAMIC_CONTAINER",
    flagPattern: "siren{un10n_b4s3d_sqli_3xf1ltr4t10n_m4st3r}",
    containerSpec: {
      image: "sirenctf/web-sqli-vault:v2.0",
      internalPort: 80,
      memoryLimit: "256MB",
      cpuLimit: "0.50",
      timeoutMinutes: 20,
      networkIsolation: "EGRESS_FILTERED",
      envVars: {
        DB_HOST: "localhost",
        ADMIN_TOKEN: "siren{un10n_b4s3d_sqli_3xf1ltr4t10n_m4st3r}"
      }
    },
    isIsolated: true,
    author: "CipherGeek",
    status: "DEPLOYED"
  },
  {
    id: "chal-crypto-01",
    title: "Faulty RSA Prime Forge",
    category: "crypto",
    difficulty: "Easy",
    points: 200,
    type: "STATIC_ARTIFACT",
    flagPattern: "siren{gcd_sm4ll_pr1m3_f4ct0r1z4t10n}",
    artifactUrl: "/artifacts/faulty_rsa_public_keys.tar.gz",
    isIsolated: false,
    author: "Alice_Crypto",
    status: "DEPLOYED"
  },
  {
    id: "chal-forensics-01",
    title: "Memory Artifact Extraction",
    category: "forensics",
    difficulty: "Medium",
    points: 300,
    type: "STATIC_ARTIFACT",
    flagPattern: "siren{v0l4t1l1ty_3xr4ct_ls4ss_dmp}",
    artifactUrl: "/artifacts/memdump_win11_investigation.raw.xz",
    isIsolated: false,
    author: "ForensicsCore",
    status: "DEPLOYED"
  },
  {
    id: "chal-rev-01",
    title: "Obfuscated ELF Matrix",
    category: "rev",
    difficulty: "Hard",
    points: 400,
    type: "STATIC_ARTIFACT",
    flagPattern: "siren{gh1dr4_d3c0mp1l3_4nt1_d3bug}",
    artifactUrl: "/artifacts/matrix_rev_challenge.elf",
    isIsolated: false,
    author: "ElfUnpacker",
    status: "STANDBY"
  },
  {
    id: "chal-linux-01",
    title: "Container SUID Escape",
    category: "linux",
    difficulty: "Insane",
    points: 500,
    type: "DYNAMIC_CONTAINER",
    flagPattern: "siren{k3rn3l_cgr0up_n4m3sp4c3_3sc4p3}",
    containerSpec: {
      image: "sirenctf/linux-suid-escape:v1.0",
      internalPort: 22,
      memoryLimit: "512MB",
      cpuLimit: "1.00",
      timeoutMinutes: 30,
      networkIsolation: "INTERNAL_ONLY"
    },
    isIsolated: true,
    author: "SyscallMaster",
    status: "DRAFT"
  }
];
