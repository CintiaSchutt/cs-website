---
title: Joiner, mover, leaver
summary: The three lifecycle events that drive most access changes, with a checklist for each.
---

## In one sentence

**Joiner, mover, leaver (JML)** is the model for the three moments that change a person's access: they **join**, they **move** to a new role, and they **leave**.

## Joiner

**Trigger**: HR records a new hire with a start date.

- Create the account *before* day one, but keep sign-in limited until the start date.
- Grant **birthright access**: what everyone in that role or department gets (email, intranet, team apps).
- Give the person a safe way to set up their first credential. In Microsoft Entra, lifecycle workflows can generate a **Temporary Access Pass** for the manager to hand over.

## Mover

**Trigger**: HR records a new department, job title, manager or location.

- **Add** the access the new role needs.
- **Remove** the access the old role needed. This is the step most often missed.
- If removal is skipped, the person collects access from every role they've held. That is **privilege creep**.

```text
Before:  Support agent    → Ticketing, Knowledge base
After:   Billing analyst  → Billing app, Finance reports
Wrong:   Billing analyst  → Ticketing, Knowledge base, Billing app, Finance reports
```

## Leaver

**Trigger**: HR records a last day (planned) or an urgent termination.

- **Disable** the account and **revoke sessions** (see [Provisioning and deprovisioning](/notes/provisioning)).
- Remove group memberships, app assignments, licences and admin roles.
- Hand over data and ownership (files, mailboxes, groups or apps the person owned).
- Delete later, after the retention period.

## JML in Microsoft Entra lifecycle workflows

Microsoft built lifecycle workflows around the JML model. Built-in templates include:

| JML | Templates (examples) |
| --- | --- |
| Joiner | *Onboard pre-hire employee*, *Onboard new hire employee*, *Post-Onboarding of an employee* |
| Mover | *Real-time employee change* |
| Leaver | *Pre-Offboarding of an employee*, *Offboard an employee*, *Post-Offboarding of an employee*, *Real-time employee termination* |

Workflows run on triggers such as the user's hire date or leave date attributes.

## Security angle

- Movers are the quiet risk: nothing breaks when old access stays, so nobody notices.
- Leavers are the loud risk: a former employee who can still sign in is a classic audit finding.
- Contractors and guests need end dates too, not just employees.

## A project I'm planning

One of my planned portfolio projects is **joiner, mover, leaver automation**: creating, updating and disabling accounts automatically from an HR file. This note is the requirements list for it.

## Check yourself

1. What is birthright access?
2. Why does privilege creep happen at the mover stage?
3. List four things to do for a leaver besides disabling the account.

## Sources

- Microsoft Learn: [What are lifecycle workflows?](https://learn.microsoft.com/en-us/entra/id-governance/what-are-lifecycle-workflows)
- Microsoft Learn: [Lifecycle workflow built-in templates](https://learn.microsoft.com/en-us/entra/id-governance/lifecycle-workflow-templates)
- Microsoft Learn: [Revoke user access in an emergency](https://learn.microsoft.com/en-us/entra/identity/users/users-revoke-access)
- Okta Help: [Lifecycle of a provisioned user](https://help.okta.com/en-us/content/topics/provisioning/lcm/lcm-provisioning-workflow.htm)
- NIST: [SP 800-53 Rev. 5](https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final), controls AC-2 Account Management and PS-4/PS-5 Personnel Termination and Transfer
