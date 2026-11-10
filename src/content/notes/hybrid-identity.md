---
title: Hybrid identity
summary: Connecting on-premises Active Directory to Microsoft Entra ID so people use one identity everywhere.
---

## In one sentence

**Hybrid identity** gives users one identity across on-premises and cloud apps, usually by **synchronizing** Active Directory to Microsoft Entra ID and choosing how cloud sign-ins are **authenticated**.

## Two synchronization tools

| | Microsoft Entra Connect Sync | Microsoft Entra Cloud Sync |
| --- | --- | --- |
| Runs | A sync server you install on-premises | Lightweight agents. Configuration lives in the cloud |
| Good for | Complex or long-established deployments | Simpler setups, several disconnected forests |

By default, Connect Sync runs a synchronization cycle every **30 minutes**.

## Three ways to authenticate

| Method | How the password is checked | Notes |
| --- | --- | --- |
| **Password hash synchronization (PHS)** | In the cloud, against a hash of the password hash synced from AD | Simplest. Needed for ID Protection's *leaked credentials* report |
| **Pass-through authentication (PTA)** | On-premises, by agents that check against AD | Cloud sign-in depends on agents being reachable |
| **Federation** (for example AD FS) | By your own federation servers | Most infrastructure to run and protect |

Microsoft notes that organizations can fail over to PHS if their main method fails, as long as PHS was set up beforehand. For Windows devices that can't be Entra joined, Microsoft recommends **seamless SSO** with PHS.

## How objects line up

```text
AD user  jdoe  (objectGUID …)  ──sync──►  Entra user  jdoe@contoso.com
  source of authority: AD                    edits to synced attributes
                                             happen in AD, not in Entra
```

## Security angle

- Synchronization creates a path from on-premises to the cloud. Microsoft recommends **cloud-only accounts for privileged Entra and Microsoft 365 roles**, so an on-premises compromise can't take over cloud admin.
- The sync server is a tier-0 asset: it can change identities in both places. Protect it like a domain controller.
- Leavers must be disabled in AD *and* the change must sync. Know your sync interval when timing matters.

## Check yourself

1. Where is the password checked with PTA?
2. Why does Microsoft recommend cloud-only accounts for cloud admins?
3. What is the default Connect Sync interval?

## Sources

- Microsoft Learn: [What is hybrid identity with Microsoft Entra ID?](https://learn.microsoft.com/en-us/entra/identity/hybrid/whatis-hybrid-identity)
- Microsoft Learn: [Choose the right authentication method](https://learn.microsoft.com/en-us/entra/identity/hybrid/connect/choose-ad-authn)
- Microsoft Learn: [What is Microsoft Entra Connect?](https://learn.microsoft.com/en-us/entra/identity/hybrid/connect/whatis-azure-ad-connect)
- Microsoft Learn: [What is Microsoft Entra Cloud Sync?](https://learn.microsoft.com/en-us/entra/identity/hybrid/cloud-sync/what-is-cloud-sync)
- Microsoft Learn: [Password hash synchronization](https://learn.microsoft.com/en-us/entra/identity/hybrid/connect/whatis-phs)
- Microsoft Learn: [Pass-through authentication](https://learn.microsoft.com/en-us/entra/identity/hybrid/connect/how-to-connect-pta)
- Microsoft Learn: [Connect Sync scheduler](https://learn.microsoft.com/en-us/entra/identity/hybrid/connect/how-to-connect-sync-feature-scheduler)
- Microsoft Learn: [Protect Microsoft 365 from on-premises attacks](https://learn.microsoft.com/en-us/entra/architecture/protect-m365-from-on-premises-attacks)
