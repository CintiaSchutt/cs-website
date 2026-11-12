---
title: CyberArk or BeyondTrust: core concepts
summary: The main components and vocabulary of two dedicated PAM platforms, from their official documentation, compared with Entra PIM.
---

## In one sentence

**CyberArk** and **BeyondTrust** are dedicated PAM platforms: they vault and rotate privileged credentials and control privileged sessions across servers, databases, network devices and clouds, well beyond one identity provider's roles.

## CyberArk Privileged Access Manager

From CyberArk's documentation for the self-hosted product (a SaaS version, **Privilege Cloud**, uses the same concepts):

| Component | Role |
| --- | --- |
| **Vault** | Secure storage for privileged accounts and SSH keys, with access control. Can run as a high-availability cluster |
| **PVWA** (Password Vault Web Access) | The web portal where users find accounts and connect |
| **CPM** (Central Policy Manager) | Changes passwords on target systems according to policy and stores them in the Vault |
| **PSM** (Privileged Session Manager) | A proxy that starts privileged sessions and records them |

**Master Policy** rules include *dual control* (approval before use), *exclusive access* (check-out/check-in) and *one-time password* (change after every use).

## BeyondTrust Password Safe

From BeyondTrust's documentation:

| Concept | Meaning |
| --- | --- |
| **Password Safe** | Combines privileged password and session management to discover, manage and audit privileged credential activity |
| **Managed system** | An asset whose accounts Password Safe manages |
| **Managed account** | A privileged account on a managed system |
| **Functional account** | The account Password Safe uses to change passwords on managed systems |
| **Smart Rules / Smart Groups** | Ways to organize assets and accounts automatically |
| **Web Console / Web Portal** | Admin interface / end-user interface for requestors and approvers |

It can be deployed in the cloud or on-premises. Cloud deployments use a **Resource Broker** to reach systems in your network.

## How they compare with Microsoft Entra PIM

| Need | Entra PIM | CyberArk / BeyondTrust |
| --- | --- | --- |
| Time-bound Entra or Azure **roles** | Yes, the main purpose | Not the main focus |
| **Vault** for server, database and device passwords | No | Yes |
| Automatic **password rotation** on targets | No | Yes |
| **Session proxy and recording** | No | Yes |
| Approval before privileged use | Yes (role activation) | Yes (dual control / request approval) |

Many organizations use both: PIM for cloud admin roles, a PAM platform for everything else.

## How to study it

- Learn the generic ideas first: [vaulting](/notes/vaulting), [session management](/notes/session-management), [just-in-time access](/notes/just-in-time-access).
- Then map each vendor's terms onto them, using the tables above.
- Both vendors offer official training and certifications. Check their current catalogues before choosing one.

## Flashcards

```flashcards
Q: Name CyberArk's four main components.
A: The **Vault**, the **PVWA** (web portal), the **CPM** (password rotation) and the **PSM** (session proxy and recording).

Q: Which CyberArk component rotates passwords?
A: The **CPM**.

Q: Name three CyberArk Master Policy rules.
A: Dual control, exclusive access and one-time password.

Q: In BeyondTrust, what are a managed system and a managed account?
A: An asset whose accounts Password Safe manages, and a privileged account on that asset.

Q: What does BeyondTrust's Resource Broker do?
A: In cloud deployments, it reaches the systems in your network.

Q: Web Console or Web Portal: who uses each?
A: Admins use the Web Console. Requestors and approvers use the Web Portal.

Q: Why would an organization with Entra PIM still buy a PAM platform?
A: PIM doesn't vault or rotate server and device passwords, or proxy and record sessions.
```

## Sources

- CyberArk Docs: [Privileged Access Manager - Self-Hosted introduction](https://docs.cyberark.com/pam-self-hosted/latest/en/content/pasimp/introducing-the-privileged-account-security-solution-intro.htm)
- CyberArk Docs: [Privileged Access Manager - Self-Hosted architecture](https://docs.cyberark.com/pam-self-hosted/latest/en/content/pasimp/privileged-account-security-solution-architecture.htm)
- CyberArk Docs: [Privileged Session Manager](https://docs.cyberark.com/pam-self-hosted/latest/en/content/pasimp/privileged-session%20manager-introduction.htm)
- CyberArk Docs: [Master Policy rules and settings (Privilege Cloud)](https://docs.cyberark.com/privilege-cloud-shared-services/latest/en/content/privilege%20cloud/privcloud-master-policy-rules-settings.htm)
- BeyondTrust Docs: [Password Safe - Getting Started](https://docs.beyondtrust.com/bips/docs/ps-getting-started)
- BeyondTrust Docs: [Welcome to Password Safe](https://docs.beyondtrust.com/bips/docs/welcome-to-password-safe)
- Microsoft Learn: [What is Privileged Identity Management?](https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/pim-configure)
