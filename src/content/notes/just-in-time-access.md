---
title: Just-in-time access
summary: Granting privileged access only when it's needed, for a limited time, with approval and a record, instead of leaving it on permanently.
---

## In one sentence

**Just-in-time (JIT) access** replaces permanent ("standing") privileges with access that is **activated when needed** and **expires automatically**.

## Standing vs just-in-time

| | Standing access | Just-in-time access |
| --- | --- | --- |
| Admin rights exist | 24/7 | Only during an activation |
| If the account is stolen | Attacker has admin immediately | Attacker must also pass activation (MFA, approval) |
| Evidence | Who *could* act | Who *did* activate, when and why |

## Microsoft Entra Privileged Identity Management (PIM)

Microsoft lists PIM's key features:

- **Just-in-time** privileged access to Microsoft Entra ID and Azure resources.
- **Time-bound** access with start and end dates.
- **Approval** required to activate privileged roles.
- **MFA** enforced to activate any role.
- **Justification** so you understand why users activate.
- **Notifications** when privileged roles are activated.
- **Access reviews** to confirm users still need roles.
- **Audit history** for internal or external audits.

### Eligible vs active

| Assignment | Meaning |
| --- | --- |
| **Eligible** | The user must take action (activate) to use the role |
| **Active** | The user has the role without any action |

```text
Jane: eligible for "User Administrator"
  1. Jane opens PIM and selects "Activate"
  2. Completes MFA, enters a justification: "Ticket 4821: reset contractor accounts"
  3. (Optional) An approver approves
  4. Role is active for the configured maximum, for example 4 hours
  5. Role deactivates automatically. Activation is in the audit history
```

PIM also works for **groups** (PIM for Groups), so a user can activate group membership that grants several roles or resources at once.

## Other platforms

- **SailPoint Privilege on Demand**: access authorized ahead of time, provisioned only when the user activates it, and removed when the period ends.
- **BeyondTrust** describes Password Safe as a just-in-time privileged access management solution.
- **CyberArk** combines vault checkout with dual control (approval) and exclusive access (see [Vaulting](/notes/vaulting)).

## Security angle

- JIT shrinks the window an attacker has, and makes privileged use visible.
- Keep a small number of **emergency access** accounts permanently active, outside PIM, so a PIM or MFA outage can't lock everyone out.
- Activation is only as strong as its checks: require phishing-resistant MFA for the most sensitive roles.

## Try it yourself

In a Microsoft Entra test tenant with PIM licensing, make your test admin **eligible** for a role. Activate it, then find the activation in PIM's audit history.

## Check yourself

1. What's the difference between an eligible and an active assignment?
2. Name four controls PIM can require at activation.
3. Why keep emergency accounts outside PIM?

## Sources

- Microsoft Learn: [What is Microsoft Entra Privileged Identity Management?](https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/pim-configure)
- Microsoft Learn: [Activate a Microsoft Entra role in PIM](https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/pim-how-to-activate-role)
- Microsoft Learn: [Configure Microsoft Entra role settings in PIM](https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/pim-how-to-change-default-settings)
- Microsoft Learn: [View audit history for Microsoft Entra roles in PIM](https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/pim-how-to-use-audit-log)
- Microsoft Learn: [Manage emergency access accounts](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/security-emergency-access)
- SailPoint: [Managing Roles](https://documentation.sailpoint.com/saas/help/access/roles.html) (Privilege on Demand)
- BeyondTrust Docs: [Welcome to Password Safe](https://docs.beyondtrust.com/bips/docs/welcome-to-password-safe)
