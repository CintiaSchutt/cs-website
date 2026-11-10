---
title: Conditional Access (Microsoft Entra)
summary: If-then policies that use signals like user, device, location and risk to allow, block or require more at sign-in.
updated: 2026-11-10
---

## In one sentence

**Conditional Access** is Microsoft Entra's policy engine: each policy is an **if-then** statement that combines signals to decide whether a sign-in is allowed, blocked or needs extra steps such as MFA.

## How a policy is built

```text
IF   assignments match     (who, what app, which conditions)
THEN apply access controls (grant or block, plus session controls)
```

| Part | Options (examples) |
| --- | --- |
| **Users** | Users, groups, roles, guests. Exclusions too |
| **Target resources** | Cloud apps, user actions (like registering security info) |
| **Network** | Named locations, countries |
| **Conditions** | User risk, sign-in risk, device platform, client apps, device filters |
| **Grant controls** | Block, require MFA, require an **authentication strength**, compliant device, hybrid joined device, password change, terms of use |
| **Session controls** | Sign-in frequency, persistent browser session, app-enforced restrictions |

```text
Example policy: "Admins need phishing-resistant MFA"
  Users:     directory roles = Global Administrator, Security Administrator
  Resources: all resources
  Grant:     require authentication strength = Phishing-resistant MFA
```

## Important behaviour

- Policies are enforced **after first-factor authentication**. They don't replace defences against password spraying or denial of service.
- All matching policies apply together. **Block wins**, and every grant requirement must be met.
- Conditional Access needs **Microsoft Entra ID P1** or higher. Tenants without it can turn on **security defaults** for baseline protection such as MFA registration.

## Rolling out safely

1. Start in **report-only** mode. Policies are evaluated and logged, but not enforced.
2. Test specific scenarios with the **What If** tool.
3. Exclude **emergency access** (break-glass) accounts, so a bad policy can't lock everyone out. Microsoft recommends **two or more**, cloud-only.
4. Check results in the sign-in logs' *Conditional Access* tab, then switch to *On*.

## Troubleshooting

`AADSTS53003` means "access has been blocked by Conditional Access policies". The sign-in log entry shows which policy applied and why (see [Troubleshooting sign-in failures](/notes/troubleshooting-sign-in)).

## Security angle

- Conditional Access is where zero trust becomes real: identity, device and risk are checked on every sign-in.
- Exclusions are the most common weak spot. Every excluded user or app needs a reason and a review.
- Prefer *authentication strengths* over plain "require MFA" for sensitive apps and admins.

## Check yourself

1. Two policies match: one requires MFA, the other blocks. What happens?
2. Why use report-only mode before turning a policy on?
3. Why must emergency access accounts be excluded and closely monitored?

## Sources

- Microsoft Learn: [What is Conditional Access?](https://learn.microsoft.com/en-us/entra/identity/conditional-access/overview)
- Microsoft Learn: [Building a Conditional Access policy](https://learn.microsoft.com/en-us/entra/identity/conditional-access/concept-conditional-access-policies)
- Microsoft Learn: [Grant controls](https://learn.microsoft.com/en-us/entra/identity/conditional-access/concept-conditional-access-grant)
- Microsoft Learn: [Session controls](https://learn.microsoft.com/en-us/entra/identity/conditional-access/concept-conditional-access-session)
- Microsoft Learn: [Report-only mode](https://learn.microsoft.com/en-us/entra/identity/conditional-access/concept-conditional-access-report-only)
- Microsoft Learn: [The What If tool](https://learn.microsoft.com/en-us/entra/identity/conditional-access/what-if-tool)
- Microsoft Learn: [Plan a Conditional Access deployment](https://learn.microsoft.com/en-us/entra/identity/conditional-access/plan-conditional-access)
- Microsoft Learn: [Manage emergency access accounts](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/security-emergency-access)
- Microsoft Learn: [Security defaults](https://learn.microsoft.com/en-us/entra/fundamentals/security-defaults)
