---
title: Provisioning and deprovisioning
summary: Creating accounts with the right access, and removing them completely and quickly when they're no longer needed.
---

## In one sentence

**Provisioning** creates accounts and grants access in the systems a person needs. **Deprovisioning** removes that access, and it is the half that matters most for security.

## Directions

| Direction | From → to | Example in Microsoft Entra |
| --- | --- | --- |
| **Inbound** (HR-driven) | HR system → directory | Workday or SAP SuccessFactors → Entra ID, or any source through the API-driven inbound provisioning API |
| **Outbound** (app provisioning) | Directory → apps | Entra ID → a SaaS app through SCIM |
| **Sync** | On-premises AD ↔ cloud | Entra Connect / Cloud Sync |

## How Entra app provisioning behaves

- **Scoping**: only users and groups *assigned* to the app (or matching scoping filters) are provisioned.
- **Attribute mappings** decide which directory attributes fill which app attributes.
- An **initial cycle** processes everyone in scope. Later **incremental cycles** send only changes.
- When a user goes out of scope, is disabled or is deleted, the app account is **disabled** (or deleted, depending on the app and settings).

## Deprovisioning: more than "disable"

Microsoft's guide to revoking access in an emergency points out that disabling an account does not instantly end every session:

- Apps using **access tokens** keep access until the token expires. The guide says that is about one hour by default.
- So for an urgent leaver: **disable the account**, **revoke sign-in sessions** (which invalidates refresh tokens), and remove them from groups and roles.

```powershell
# Microsoft Graph PowerShell
Update-MgUser -UserId jdoe@contoso.com -AccountEnabled:$false
Revoke-MgUserSignInSession -UserId jdoe@contoso.com
```

## Okta's version

Okta describes provisioning as Create, Read, Update and **Deprovision**. Removing an app assignment deactivates the account in the external app, and reactivating the Okta user reactivates their app accounts.

## Security angle

- **Orphaned accounts**: accounts in apps with no matching active person. Usually caused by apps outside automated provisioning.
- Apps without SCIM need a manual or ticketed deprovisioning step, and someone must own it.
- Test the leaver path end to end, and log every step as [audit evidence](/notes/audit-evidence).

## Flashcards

```flashcards
Q: What is the difference between provisioning and deprovisioning?
A: Provisioning creates accounts and grants access. Deprovisioning removes it, and matters most for security.

Q: Inbound or outbound provisioning: what is the difference?
A: **Inbound**: HR system to directory. **Outbound**: directory to apps, usually through SCIM.

Q: What decides which users Entra provisions to an app?
A: **Scoping**: users and groups assigned to the app, or matching scoping filters.

Q: What do attribute mappings do?
A: Decide which directory attributes fill which app attributes.

Q: Initial or incremental cycle: what is the difference?
A: The **initial** cycle processes everyone in scope. **Incremental** cycles send only changes.

Q: A disabled user is still using an app 20 minutes later. Is that expected?
A: Yes. Apps using access tokens keep access until the token expires, about an hour by default.

Q: Which three steps does an urgent leaver need?
A: **Disable** the account, **revoke sign-in sessions**, and remove groups and roles.

Q: What is an orphaned account?
A: An app account with no matching active person, often in apps outside automated provisioning.
```

## Sources

- Microsoft Learn: [What is app provisioning in Microsoft Entra ID?](https://learn.microsoft.com/en-us/entra/identity/app-provisioning/user-provisioning)
- Microsoft Learn: [How application provisioning works](https://learn.microsoft.com/en-us/entra/identity/app-provisioning/how-provisioning-works)
- Microsoft Learn: [Plan cloud HR application to Microsoft Entra user provisioning](https://learn.microsoft.com/en-us/entra/identity/app-provisioning/plan-cloud-hr-provision)
- Microsoft Learn: [API-driven inbound provisioning concepts](https://learn.microsoft.com/en-us/entra/identity/app-provisioning/inbound-provisioning-api-concepts)
- Microsoft Learn: [Revoke user access in an emergency](https://learn.microsoft.com/en-us/entra/identity/users/users-revoke-access)
- Okta Help: [Provisioning](https://help.okta.com/en-us/content/topics/provisioning/lcm/con-okta-prov.htm)
- NIST: [SP 800-53 Rev. 5](https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final), control AC-2 Account Management
