---
title: Reading sign-in and audit logs
summary: What Microsoft Entra and Okta record, how long they keep it, and how to query it for troubleshooting and investigations.
---

## In one sentence

**Sign-in logs** record who tried to sign in to what and what happened. **Audit logs** record changes to the directory: who changed what, and when. Together they answer most identity questions during troubleshooting, audits and incidents.

## Microsoft Entra log types

| Log | Records | Example question |
| --- | --- | --- |
| **Sign-in logs** | Authentication attempts | "Why couldn't Jane sign in at 9:14?" |
| **Audit logs** | Changes to users, groups, roles, apps, policies | "Who added Bob to Global Administrator?" |
| **Provisioning logs** | What the provisioning service created, updated or skipped | "Why doesn't Jane have an account in the HR app?" |

Sign-in logs are split into **interactive user**, **non-interactive user**, **service principal** and **managed identity** sign-ins. Background and app activity is easy to miss if you only look at the first tab.

## Fields worth knowing in a sign-in

- **Status** and **error code** (see [Troubleshooting sign-in failures](/notes/troubleshooting-sign-in))
- **Correlation ID** and **request ID**
- **Application**, **IP address**, **location**, **device**
- **Authentication details**: which methods were used
- **Conditional Access**: which policies applied, and the result

## Retention, and keeping more

| | Entra ID Free | P1 / P2 |
| --- | --- | --- |
| Sign-in logs | 7 days | 30 days |
| Audit logs | 7 days | 30 days |

For longer retention and real querying, use **diagnostic settings** to send logs to a **Log Analytics workspace**, a **storage account**, an **event hub** (for a SIEM), or a combination.

## Querying in Log Analytics (KQL)

```kusto
// Failed sign-ins in the last day, by error code
SigninLogs
| where TimeGenerated > ago(1d)
| where ResultType != "0"
| summarize failures = count() by ResultType, ResultDescription
| order by failures desc
```

```kusto
// Recent role assignment changes
AuditLogs
| where TimeGenerated > ago(7d)
| where OperationName has "role"
| project TimeGenerated, OperationName, InitiatedBy, TargetResources
```

The same data is available through Microsoft Graph at `/auditLogs/signIns` and `/auditLogs/directoryAudits`.

## Okta

Okta's **System Log** records events such as sign-ins, policy evaluations and admin changes. It can be searched in the admin console and queried through the System Log API.

## What to watch for

- Many failures for many users from one IP address: possible **password spraying**.
- Successful sign-in right after many failures for the same user.
- New admin role assignments, new app credentials or consent grants, Conditional Access policy changes.
- Any sign-in by an **emergency access** account.

## Security angle

- Logs are evidence: store them where the people being logged can't change them (NIST SP 800-92 covers log management practices).
- Logs contain personal data. Limit who can read them and how long you keep them, according to policy.

## Flashcards

```flashcards
Q: Sign-in logs or audit logs: what does each record?
A: Sign-in logs record authentication attempts. Audit logs record changes to the directory.

Q: What do provisioning logs answer?
A: What the provisioning service created, updated or skipped.

Q: Name the four types of sign-in logs.
A: Interactive user, non-interactive user, service principal and managed identity.

Q: Which log answers "who changed this group?"
A: The **audit log**.

Q: Name three useful fields in a sign-in entry.
A: For example: status and error code, correlation ID, application, IP address and location, authentication details, and the Conditional Access result.

Q: Where can diagnostic settings send Entra logs?
A: To a Log Analytics workspace, a storage account or an event hub.

Q: In KQL, which table holds sign-ins, and which `ResultType` means success?
A: `SigninLogs`, where `ResultType` `"0"` means success.

Q: Name three things to watch for in identity logs.
A: For example: many failures from one IP, a success right after many failures, new admin roles or app credentials, Conditional Access changes, and any emergency account sign-in.
```

## Sources

- Microsoft Learn: [Sign-in logs in Microsoft Entra ID](https://learn.microsoft.com/en-us/entra/identity/monitoring-health/concept-sign-ins)
- Microsoft Learn: [Audit logs in Microsoft Entra ID](https://learn.microsoft.com/en-us/entra/identity/monitoring-health/concept-audit-logs)
- Microsoft Learn: [Microsoft Entra data retention](https://learn.microsoft.com/en-us/entra/identity/monitoring-health/reference-reports-data-retention)
- Microsoft Learn: [Configure diagnostic settings for activity logs](https://learn.microsoft.com/en-us/entra/identity/monitoring-health/howto-configure-diagnostic-settings)
- Microsoft Learn: [Integrate activity logs with Azure Monitor logs](https://learn.microsoft.com/en-us/entra/identity/monitoring-health/howto-integrate-activity-logs-with-azure-monitor-logs)
- Microsoft Learn: [SigninLogs table reference](https://learn.microsoft.com/en-us/azure/azure-monitor/reference/tables/signinlogs)
- Microsoft Learn: [signIn resource type (Graph)](https://learn.microsoft.com/en-us/graph/api/resources/signin)
- Okta Developer: [System Log query](https://developer.okta.com/docs/reference/system-log-query/)
- NIST: [SP 800-92, Guide to Computer Security Log Management](https://csrc.nist.gov/pubs/sp/800/92/final)
