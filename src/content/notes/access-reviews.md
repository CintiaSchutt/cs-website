---
title: Access reviews
summary: Regularly asking the right people to confirm that existing access is still needed, and removing what isn't.
updated: 2026-11-10
---

## In one sentence

An **access review** (SailPoint calls it a **certification**) asks reviewers to confirm or remove existing access on a regular schedule, so access that is no longer needed doesn't stay forever.

## What gets reviewed

- Membership of **groups**, especially those that grant app access.
- **App assignments**.
- **Access package** assignments.
- **Privileged role** assignments (Entra roles and Azure resource roles).
- **Guest** users' access.

## Who reviews

| Reviewer | Good for |
| --- | --- |
| **Manager** | Knows what the person's job needs |
| **Resource or group owner** | Knows what the access allows |
| **Self-review** | Low-risk access. Cheap, but weak evidence |
| **Selected users** (security, compliance) | Sensitive or privileged access |

Multi-stage reviews can combine them, for example the manager first, then the resource owner.

## Microsoft Entra access reviews

- Reviews can recur **weekly, monthly, quarterly or annually**. Reviewers are notified when each review starts.
- Reviewers get **recommendations** to help decide (for example, based on recent sign-in activity).
- Settings decide what happens when a reviewer doesn't respond, and whether to **auto-apply** results. With auto-apply, denied access is removed when the review completes.
- Some advanced options, such as reviews targeting inactive users, need a **Microsoft Entra ID Governance** licence.

## SailPoint certifications

SailPoint's documentation explains that the access model shapes what reviewers see:

- Roles obtained by **request** can be approved or revoked.
- Roles assigned **automatically** by assignment criteria can only be *acknowledged*, because the role model controls them.
- Access profiles granted through a role don't appear on their own. They are managed through the role.

## Making reviews meaningful

- Keep each review **small and specific**. A list of 400 items invites "approve all".
- Give reviewers **context**: last sign-in, what the access allows, when it was granted.
- Make **deny** easy and safe, with a way to request access back.
- Track **completion** and follow up on reviews nobody finished.

## Security angle

- Reviews catch what lifecycle automation misses: movers' old access, forgotten guests, unused privileged roles.
- Auditors look for evidence that reviews **happened** and that denials were **acted on**. Keep both (see [Audit evidence](/notes/audit-evidence)).
- NIST SP 800-53 **AC-2** expects accounts to be reviewed for compliance at a frequency the organization defines.

## Check yourself

1. Who is the best reviewer for "should Jane still be in the Billing app group?"
2. Why can SailPoint reviewers only acknowledge some roles?
3. What does auto-apply do?

## Sources

- Microsoft Learn: [What are access reviews?](https://learn.microsoft.com/en-us/entra/id-governance/access-reviews-overview)
- Microsoft Learn: [Plan an access reviews deployment](https://learn.microsoft.com/en-us/entra/id-governance/deploy-access-reviews)
- Microsoft Learn: [Complete an access review](https://learn.microsoft.com/en-us/entra/id-governance/complete-access-review)
- SailPoint: [Understanding Certifications](https://documentation.sailpoint.com/saas/help/certs/understanding_certifications.html)
- NIST: [SP 800-53 Rev. 5](https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final), control AC-2 Account Management
