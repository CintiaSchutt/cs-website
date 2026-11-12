---
title: Least privilege and zero trust
summary: Give each identity only the access it needs, and never trust a request just because of where it comes from.
---

## In one sentence

**Least privilege** means each user or process gets only the access it needs for its task. **Zero trust** means no request is trusted automatically because of its network location: each one is checked.

## Least privilege

NIST defines least privilege as a design principle: each entity gets the minimum system resources and authorizations it needs to do its job. In SP 800-53 it is control **AC-6**.

Least privilege covers more than *what* access someone has:

- **What**: the narrowest permission that works (read instead of write, one app instead of all).
- **Where**: the smallest scope (one resource group instead of the whole subscription).
- **When**: only while needed (see [Just-in-time access](/notes/just-in-time-access)).

```text
Too broad:  Global Administrator, permanently
Better:     User Administrator, scoped to one administrative unit,
            activated for 4 hours when needed
```

## Zero trust

NIST SP 800-207 describes zero trust as a set of principles that move defences away from fixed network perimeters and focus on users, assets and resources. A few of its tenets:

- Access to each resource is granted **per session**.
- Access is decided by **dynamic policy**: the identity, the device, behaviour and other signals.
- All communication is secured **no matter where it comes from**, even inside the corporate network.

It also names the logical parts that make the decision:

| Component | Role |
| --- | --- |
| **Policy engine (PE)** | Decides whether to allow access |
| **Policy administrator (PA)** | Carries out the decision (for example, issues the session) |
| **Policy enforcement point (PEP)** | Sits in front of the resource and enforces it |

Microsoft sums up zero trust in three principles: **verify explicitly**, **use least privilege access** and **assume breach**. In Microsoft Entra, [Conditional Access](/notes/conditional-access) acts as a zero trust policy engine.

## CISA Zero Trust Maturity Model

CISA's model (version 2.0) organizes the work into five pillars: **Identity**, **Devices**, **Networks**, **Applications and Workloads**, and **Data**. Three capabilities cut across all of them: visibility and analytics, automation and orchestration, and governance. Each pillar moves through four stages: Traditional, Initial, Advanced and Optimal.

## Security angle

- Least privilege limits the **blast radius**, meaning how much damage a stolen account can do.
- Standing admin access is a favourite target. Time-bound access reduces the window.
- Least privilege also applies to app permissions: request the smallest OAuth scopes that work.

## Flashcards

```flashcards
Q: What is least privilege?
A: Each user or process gets only the access it needs for its task. In NIST SP 800-53 it is control **AC-6**.

Q: Name the three dimensions of least privilege in this note.
A: **What** (the narrowest permission), **where** (the smallest scope) and **when** (only while needed).

Q: What is zero trust, in one sentence?
A: No request is trusted automatically because of its network location: each one is checked.

Q: Name two NIST SP 800-207 zero trust tenets.
A: For example: access is granted **per session**, access is decided by **dynamic policy**, and all communication is secured **no matter where it comes from**.

Q: What do the policy engine, policy administrator and policy enforcement point do?
A: The **PE** decides, the **PA** carries out the decision, and the **PEP** sits in front of the resource and enforces it.

Q: What are Microsoft's three zero trust principles?
A: **Verify explicitly**, **use least privilege access** and **assume breach**.

Q: Name the five pillars of CISA's Zero Trust Maturity Model.
A: **Identity**, **Devices**, **Networks**, **Applications and Workloads**, and **Data**.

Q: Name CISA's four maturity stages.
A: **Traditional**, **Initial**, **Advanced** and **Optimal**.

Q: What is "blast radius"?
A: How much damage a stolen account can do. Least privilege limits it.
```

## Sources

- NIST CSRC Glossary: [least privilege](https://csrc.nist.gov/glossary/term/least_privilege)
- NIST: [SP 800-53 Rev. 5](https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final), control AC-6 Least Privilege
- NIST: [SP 800-207, Zero Trust Architecture](https://csrc.nist.gov/pubs/sp/800/207/final)
- CISA: [Zero Trust Maturity Model](https://www.cisa.gov/zero-trust-maturity-model)
- Microsoft Learn: [What is Zero Trust?](https://learn.microsoft.com/en-us/security/zero-trust/zero-trust-overview)
- Microsoft Learn: [Secure identity with Zero Trust](https://learn.microsoft.com/en-us/security/zero-trust/deploy/identity)
