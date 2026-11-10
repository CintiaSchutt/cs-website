---
title: Automating the lifecycle
summary: Turning joiner, mover and leaver events into automatic, logged changes, using built-in workflows first and scripts where needed.
updated: 2026-11-10
---

## In one sentence

**Lifecycle automation** turns HR events into identity changes (create, update, disable) automatically, so access is right on day one and gone on the last day, without depending on someone remembering.

## The building blocks in Microsoft Entra

| Need | Feature |
| --- | --- |
| Get people from HR into Entra | HR-driven provisioning (Workday, SAP SuccessFactors) or **API-driven inbound provisioning** for any other source |
| Give apps accounts | App provisioning, usually via SCIM |
| Run tasks at the right time | **Lifecycle workflows** |
| Bundle access to grant or remove | Access packages, dynamic groups |

## Lifecycle workflows

A workflow has a **trigger** (for example "7 days before `employeeHireDate`" or "on `employeeLeaveDateTime`"), a **scope** (which users) and **tasks**. Built-in tasks include sending a welcome email, generating a **Temporary Access Pass** for the manager, adding or removing groups, and disabling or deleting the account. Custom task extensions can call your own logic.

## API-driven inbound provisioning

If the HR source isn't a supported system, Microsoft provides an API that accepts **SCIM-formatted** bulk requests. A script (PowerShell, for example) can read an HR export and send the records, and the Entra provisioning service creates and updates the users.

```text
HR CSV export ──► script converts rows to SCIM bulk request ──► Entra inbound provisioning API
                                                                      │
                                                     create / update / disable users in Entra
                                                                      │
                                         lifecycle workflows + app provisioning take it from there
```

## Design rules

- **One source of truth** for each attribute. Don't let two systems fight over `department`.
- **Use built-in features first.** Write scripts only for the gaps.
- **Idempotent**: running the job twice must give the same result.
- **Dry run and approval** for destructive changes, at least at first.
- **Fail safe**: if the HR file is empty or half the usual size, stop. Don't disable everyone.
- **Log everything**, and alert on failures. A silent failure means leavers keep access.

## Okta's version

Okta Lifecycle Management assigns app access through groups and provisions or **deprovisions** app accounts when assignments change, with profiles sourced from HR or a directory.

## A project I'm planning

My planned **joiner, mover, leaver automation** project fits here: read an HR file, then create, update and disable accounts automatically. The design rules above are its acceptance criteria.

## Check yourself

1. What should a job do if the HR file has half the usual number of rows?
2. What is a lifecycle workflow trigger?
3. When would you use API-driven inbound provisioning?

## Sources

- Microsoft Learn: [What are lifecycle workflows?](https://learn.microsoft.com/en-us/entra/id-governance/what-are-lifecycle-workflows)
- Microsoft Learn: [Lifecycle workflow built-in templates](https://learn.microsoft.com/en-us/entra/id-governance/lifecycle-workflow-templates)
- Microsoft Learn: [Lifecycle workflow tasks and definitions](https://learn.microsoft.com/en-us/entra/id-governance/lifecycle-workflow-tasks)
- Microsoft Learn: [API-driven inbound provisioning concepts](https://learn.microsoft.com/en-us/entra/identity/app-provisioning/inbound-provisioning-api-concepts)
- Microsoft Learn: [Plan cloud HR application to Microsoft Entra user provisioning](https://learn.microsoft.com/en-us/entra/identity/app-provisioning/plan-cloud-hr-provision)
- Okta Help: [Lifecycle of a provisioned user](https://help.okta.com/en-us/content/topics/provisioning/lcm/lcm-provisioning-workflow.htm)
