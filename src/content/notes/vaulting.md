---
title: Vaulting and credential rotation
summary: Keeping privileged passwords and secrets in a controlled vault, checking them out on demand, and changing them automatically.
updated: 2026-11-10
---

## In one sentence

**Vaulting** stores privileged credentials in a secure, access-controlled store instead of in people's heads, spreadsheets or scripts. **Rotation** changes those credentials automatically, on a schedule or after each use.

## Why it matters

- A password nobody knows can't be phished, shared or kept by someone who left.
- Automatic rotation limits how long a stolen credential stays useful.
- Every checkout is logged, so you know who used which account and when.

## How a PAM vault works (CyberArk's terms)

CyberArk's documentation describes a central **Vault** that stores privileged accounts and controls access to them, plus components around it:

- The **Central Policy Manager (CPM)** changes passwords on target systems, following policy, and stores the new value in the Vault.
- The **Privileged Session Manager (PSM)** opens sessions to targets for the user, so the user doesn't need to see the password (see [Session management](/notes/session-management)).

CyberArk's *Master Policy* includes rules such as:

| Rule | Effect |
| --- | --- |
| **Dual control** | One or more authorized people must approve a request before the account can be used |
| **Exclusive access** | A user *checks out* the account, and nobody else can use it until it's checked in |
| **One-time password** | The password is changed after every use |

Combining exclusive access and one-time passwords ties every use of the account to one person.

## BeyondTrust's terms

BeyondTrust Password Safe's documentation uses:

- **Managed system**: the asset whose accounts are managed.
- **Managed account**: a privileged account on that system.
- **Functional account**: the account Password Safe uses to change passwords on managed systems. It must be set up before accounts can be onboarded.

## Secrets for workloads

Applications need secrets too: API keys, connection strings, certificates.

- In Azure, **Azure Key Vault** stores secrets, keys and certificates, with access control and logging.
- Better still, use a **managed identity** or workload identity federation, so there's no secret to store at all (see [Digital identities](/notes/digital-identities)).
- **Windows LAPS** is a built-in way to rotate each device's local administrator password.

## Security angle

- The vault becomes the most valuable target. Protect its admins with the strongest controls and keep it isolated.
- Rotation can break things: services that use the old password stop working. Map dependencies before you rotate.
- "Break glass" access to the vault itself must be planned and tested.

## Check yourself

1. What does the CPM do?
2. How do exclusive access and one-time passwords work together?
3. Why is a managed identity better than a secret in Key Vault?

## Sources

- CyberArk Docs: [Privileged Access Manager - Self-Hosted introduction](https://docs.cyberark.com/pam-self-hosted/latest/en/content/pasimp/introducing-the-privileged-account-security-solution-intro.htm)
- CyberArk Docs: [Privileged Access Manager - Self-Hosted architecture](https://docs.cyberark.com/pam-self-hosted/latest/en/content/pasimp/privileged-account-security-solution-architecture.htm)
- CyberArk Docs: [Master Policy rules and settings (Privilege Cloud)](https://docs.cyberark.com/privilege-cloud-shared-services/latest/en/content/privilege%20cloud/privcloud-master-policy-rules-settings.htm)
- BeyondTrust Docs: [Password Safe - Getting Started](https://docs.beyondtrust.com/bips/docs/ps-getting-started)
- Microsoft Learn: [About Azure Key Vault](https://learn.microsoft.com/en-us/azure/key-vault/general/overview)
- Microsoft Learn: [Windows LAPS overview](https://learn.microsoft.com/en-us/windows-server/identity/laps/laps-overview)
