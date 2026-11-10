---
title: What is privileged access management?
summary: Extra protection for the accounts that can change everything, from discovery and vaulting to just-in-time access and session recording.
updated: 2026-11-10
---

## In one sentence

**Privileged access management (PAM)** protects, controls and monitors the accounts and sessions that can perform security-relevant actions, such as changing configurations, creating users or reading all data.

## What makes access "privileged"

NIST describes a **privileged user** as one who is authorized, and therefore trusted, to perform security-relevant functions that ordinary users can't. A **privileged account** is an account with those rights. Examples:

- Directory admins (Domain Admins, Global Administrator)
- Cloud subscription owners
- Root / local administrator accounts on servers and workstations
- Database administrators
- Service accounts with broad rights
- Emergency (break-glass) accounts

## Why PAM is its own discipline

Attackers who get in with a normal account try to **escalate** to privileged access, because that's what lets them spread and cause damage. Microsoft's privileged access strategy treats privileged access as the top priority for that reason.

## Core PAM capabilities

| Capability | What it does | Note |
| --- | --- | --- |
| **Discovery** | Finds privileged accounts and credentials, including forgotten ones | [Privileged accounts](/notes/privileged-accounts) |
| **Vaulting** | Stores privileged credentials securely, checked out on demand | [Vaulting and rotation](/notes/vaulting) |
| **Rotation** | Changes passwords and keys automatically | [Vaulting and rotation](/notes/vaulting) |
| **Just-in-time (JIT) access** | Grants privilege only when needed, for a limited time | [Just-in-time access](/notes/just-in-time-access) |
| **Session management** | Proxies, monitors and records admin sessions | [Session management](/notes/session-management) |
| **Approval and justification** | Someone else confirms the need | Dual control |
| **Audit** | Keeps evidence of who used privilege, when and why | [Audit evidence](/notes/audit-evidence) |

## Microsoft's enterprise access model

Microsoft splits privileged access into planes:

- **Control plane**: the identity systems that control access to everything (for example Entra ID, AD).
- **Management plane**: the tools that manage workloads and infrastructure.
- **Data/workload plane**: the business data and apps themselves.

A key rule is **hierarchy**: lower planes must not be able to take control of higher ones. For example, a server admin's laptop must not hold credentials that control the identity system.

## What the standards say

NIST SP 800-53 includes:

- **AC-6(5)** Privileged Accounts: restrict them to specific people or roles.
- **AC-6(9)** Log the use of privileged functions.
- **AC-2(7)** Privileged User Accounts: manage them with a role-based scheme and monitor them.
- **IA-2(1)** MFA for privileged accounts.

## PAM tools

- **Microsoft Entra Privileged Identity Management (PIM)**: just-in-time *role* activation for Entra and Azure.
- **Dedicated PAM platforms** such as CyberArk and BeyondTrust: credential vaults, rotation and session management across servers, databases, network devices and clouds (see [CyberArk or BeyondTrust](/notes/pam-platforms)).

## Check yourself

1. Why do attackers go after privileged accounts?
2. Name the three planes in Microsoft's enterprise access model.
3. What is the difference between PIM and a credential vault?

## Sources

- NIST CSRC Glossary: [privileged account](https://csrc.nist.gov/glossary/term/privileged_account) and [privileged user](https://csrc.nist.gov/glossary/term/privileged_user)
- NIST: [SP 800-53 Rev. 5](https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final), controls AC-2(7), AC-6(5), AC-6(9), IA-2(1)
- Microsoft Learn: [Privileged access: strategy](https://learn.microsoft.com/en-us/security/privileged-access-workstations/privileged-access-strategy)
- Microsoft Learn: [Enterprise access model](https://learn.microsoft.com/en-us/security/privileged-access-workstations/privileged-access-access-model)
- Microsoft Learn: [What is Privileged Identity Management?](https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/pim-configure)
