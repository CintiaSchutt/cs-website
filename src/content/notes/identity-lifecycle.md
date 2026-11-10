---
title: The identity lifecycle
summary: An identity is created, changes over time and must be removed. Each stage has its own access risks.
updated: 2026-11-10
---

## In one sentence

The **identity lifecycle** covers everything from creating an account, through every change in a person's role, to disabling and removing it, with access kept correct at every step.

## The stages

| Stage | What happens | Main risk if done badly |
| --- | --- | --- |
| **Create** (joiner) | Account created, starting access granted | Too much access from day one |
| **Change** (mover) | Role, team or location changes | Old access is never removed ("privilege creep") |
| **Review** | Access confirmed or removed regularly | Access nobody needs stays forever |
| **Remove** (leaver) | Account disabled, access removed, later deleted | Former staff can still sign in |

The [Joiner, mover, leaver](/notes/joiner-mover-leaver) note goes deeper into each event.

## A trusted source of truth

Lifecycle work starts from a reliable source, usually the **HR system**. When HR records a hire date, a new department or a last day, the identity system reacts. Microsoft calls this HR-driven provisioning, and Microsoft Entra can provision accounts from HR systems such as Workday and SAP SuccessFactors, or from any source through an API.

```text
HR system  →  identity system (Entra ID, Okta)  →  apps (via SCIM, connectors)
 "hired"        create account, add groups          create app accounts
 "moved"        update attributes, change groups     update app access
 "left"         disable, revoke sessions             deactivate app accounts
```

## What the standards say

NIST SP 800-53 control **AC-2 Account Management** expects an organization to define account types, require approvals to create accounts, monitor their use, and disable or remove accounts when they are no longer needed. It also expects account managers to be told when users leave or change roles.

## Security angle

- **Disable before delete.** Disabling stops sign-in right away and keeps the record for audit and recovery.
- Disabling an account is not always enough on its own. Existing sessions and refresh tokens should also be revoked (see [Provisioning and deprovisioning](/notes/provisioning)).
- Workload identities have a lifecycle too: an app that is retired should lose its credentials and permissions.

## Try it yourself

Write the lifecycle of a fictional employee who joins as a support agent, moves to the billing team, then leaves. For each event, list what access should be added or removed.

## Check yourself

1. Why is the mover event often the riskiest?
2. Why is HR usually the source of truth?
3. Why disable an account before deleting it?

## Sources

- NIST: [SP 800-53 Rev. 5](https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final), control AC-2 Account Management
- Microsoft Learn: [What is Microsoft Entra ID Governance?](https://learn.microsoft.com/en-us/entra/id-governance/identity-governance-overview)
- Microsoft Learn: [Plan cloud HR application to Microsoft Entra user provisioning](https://learn.microsoft.com/en-us/entra/identity/app-provisioning/plan-cloud-hr-provision)
- Microsoft Learn: [What are lifecycle workflows?](https://learn.microsoft.com/en-us/entra/id-governance/what-are-lifecycle-workflows)
