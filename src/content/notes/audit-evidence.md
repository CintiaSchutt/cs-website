---
title: Audit evidence for access
summary: What auditors ask about access, which records answer them, and how to keep those records long enough.
---

## In one sentence

**Audit evidence** for access is the set of records that proves access was **approved**, **reviewed**, **removed** on time and **used** appropriately, not just that the policy says so.

## What auditors typically ask, and what answers it

| Question | Evidence |
| --- | --- |
| Who has access to this system? | An access report or export from the directory or IGA tool, dated |
| Who approved it, and when? | Access request and approval records |
| Is access reviewed? | Access review history: reviewers, decisions, completion dates |
| Was denied access actually removed? | Review results *and* the matching removal in audit logs |
| Are leavers removed promptly? | HR termination dates compared with account disable dates |
| Who used admin rights? | PIM activation history, privileged session records |
| Who changed the configuration? | Directory audit logs |

## Microsoft Entra sources

- **Audit logs**: changes to users, groups, roles, apps and policies, with who did it and when.
- **Sign-in logs**: who signed in to what, from where, and the result.
- **Access review** history and decisions.
- **Entitlement management** request and approval history.
- **PIM** audit history: role activations, with justification and approver.

**Retention**: audit and sign-in logs are kept **7 days** on Entra ID Free and **30 days** on P1/P2. Evidence for an annual audit has to be exported, for example with **diagnostic settings** to a Log Analytics workspace, a storage account or a SIEM.

## What the standards say

NIST SP 800-53 has a whole family for this:

- **AU-2** Event Logging: decide which events to log.
- **AU-3** Content of Audit Records: what, when, where, source, outcome and identity.
- **AU-6** Audit Record Review, Analysis and Reporting.
- **AU-11** Audit Record Retention.

NIST SP 800-92 is NIST's guide to log management.

## Good evidence is

- **Complete**: covers the whole period, not a sample you chose afterwards.
- **Tamper-resistant**: stored where the people being audited can't edit it.
- **Traceable**: you can follow one access from request to approval to grant to review to removal.
- **Timestamped** with a clear time zone.

## Where I've seen this

Working on enterprise healthcare SaaS that handles sensitive health information means working where evidence of access control matters.

## Check yourself

1. How long are sign-in logs kept on Entra ID P1?
2. A review denied someone's access. What second record proves it was removed?
3. Why should audit logs be stored where admins can't edit them?

## Sources

- Microsoft Learn: [Audit logs in Microsoft Entra ID](https://learn.microsoft.com/en-us/entra/identity/monitoring-health/concept-audit-logs)
- Microsoft Learn: [Sign-in logs in Microsoft Entra ID](https://learn.microsoft.com/en-us/entra/identity/monitoring-health/concept-sign-ins)
- Microsoft Learn: [Microsoft Entra data retention](https://learn.microsoft.com/en-us/entra/identity/monitoring-health/reference-reports-data-retention)
- Microsoft Learn: [Configure diagnostic settings for activity logs](https://learn.microsoft.com/en-us/entra/identity/monitoring-health/howto-configure-diagnostic-settings)
- Microsoft Learn: [View audit history for Microsoft Entra roles in PIM](https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/pim-how-to-use-audit-log)
- NIST: [SP 800-53 Rev. 5](https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final), AU (Audit and Accountability) family
- NIST: [SP 800-92, Guide to Computer Security Log Management](https://csrc.nist.gov/pubs/sp/800/92/final)
