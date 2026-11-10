---
title: Troubleshooting sign-in failures
summary: A repeatable method for "I can't sign in" tickets, using sign-in logs and AADSTS error codes.
updated: 2026-11-10
---

## In one sentence

Good sign-in troubleshooting is a method: **collect the facts, find the log entry, read the error code, then check the user, the app and the policy**, in that order.

## Step 1: collect the facts

- Who (user principal name), which app, **when** (with time zone), from which device or network.
- The exact error message, and the **correlation ID** and **request ID** shown on the error page.

## Step 2: find the sign-in log entry

In the Microsoft Entra admin centre, open **Sign-in logs** and filter by user, app, time or correlation ID. Useful tabs:

- **Basic info**: status, error code, failure reason.
- **Authentication details**: which methods were tried, and whether MFA succeeded.
- **Conditional Access**: which policies applied, and their result.

Remember to check **non-interactive** and **service principal** sign-ins when the failure comes from a background process.

## Step 3: read the error code

| Code | Meaning (Microsoft error reference) | Usually look at |
| --- | --- | --- |
| `AADSTS50126` | Invalid username or password | User |
| `AADSTS50034` | User account not found in the directory | User (typo? wrong tenant?) |
| `AADSTS50057` | User account is disabled | User / lifecycle |
| `AADSTS50053` | Account locked (too many attempts) or sign-in blocked | User / possible attack |
| `AADSTS50076` | MFA required (for example by a policy change) | Policy |
| `AADSTS53003` | Blocked by Conditional Access | Policy |
| `AADSTS50011` | Redirect URI mismatch | App registration |
| `AADSTS65001` | Consent not granted | App consent |
| `AADSTS700016` | App not found in the tenant | App registration |
| `AADSTS7000215` | Invalid client secret | App credentials |

## Step 4: user, app, policy

```text
User    → exists? enabled? locked? licensed? MFA registered? right tenant?
App     → registered? redirect URI right? consent given? secret/cert valid?
Policy  → which CA policy applied? expected? report-only result?
```

For SAML apps, also compare the **Identifier** and **Reply URL** in Entra with what the app sends, and check the signing certificate hasn't expired. Microsoft has a dedicated troubleshooting guide for SAML-based apps.

## Step 5: confirm and record

Fix one thing at a time, ask the user to retry, and confirm success in the logs. Write down the cause. Repeated causes point to a process fix, such as an expiring secret nobody owned.

## Mind the retention

Sign-in and audit logs are kept for **7 days** with Microsoft Entra ID Free and **30 days** with P1 or P2. For longer history, send them to Log Analytics, storage or a SIEM (see [Reading sign-in and audit logs](/notes/logs)).

## Where I've seen this

I investigate and resolve production issues with cross-functional teams. Sign-in issues follow the same discipline: reproduce, find the evidence, change one thing, confirm.

## Security angle

- A burst of `50126` or `50053` across many users may be password spraying, not a help-desk problem.
- Don't "fix" a block by excluding the user from Conditional Access without understanding why.
- Never ask a user to send their password or a token in a ticket.

## Check yourself

1. What two IDs from the error page help you find the log entry quickly?
2. A user gets `AADSTS53003`. Where do you look first?
3. Why might a failure not show in interactive sign-ins?

## Sources

- Microsoft Learn: [Microsoft Entra authentication and authorization error codes](https://learn.microsoft.com/en-us/entra/identity-platform/reference-error-codes)
- Microsoft Learn: [Sign-in logs in Microsoft Entra ID](https://learn.microsoft.com/en-us/entra/identity/monitoring-health/concept-sign-ins)
- Microsoft Learn: [How to troubleshoot sign-in errors using reports](https://learn.microsoft.com/en-us/entra/identity/monitoring-health/howto-troubleshoot-sign-in-errors)
- Microsoft Learn: [Troubleshooting sign-in problems with Conditional Access](https://learn.microsoft.com/en-us/entra/identity/conditional-access/troubleshoot-conditional-access)
- Microsoft Learn: [Troubleshoot sign-in to SAML-based single sign-on apps](https://learn.microsoft.com/en-us/troubleshoot/entra/entra-id/app-integration/troubleshoot-sign-in-saml-based-apps)
- Microsoft Learn: [Microsoft Entra data retention](https://learn.microsoft.com/en-us/entra/identity/monitoring-health/reference-reports-data-retention)
