---
title: Privileged session management
summary: Routing admin sessions through a controlled point that injects credentials, records activity and can end the session.
---

## In one sentence

**Privileged session management** puts a control point between an admin and the target system, so the session can be started without revealing credentials, **monitored**, **recorded** and **stopped** if needed.

## How it works

```text
Admin ──► PAM portal ──► Session proxy ──► Target server / database / device
            (who? approved?)   │  injects the credential from the vault
                               │  records keystrokes, commands or video
                               └─ stores the recording for audit
```

1. The admin signs in to the PAM portal (with MFA) and picks a target.
2. The portal checks policy: is this person allowed, and is approval needed?
3. The **session proxy** fetches the credential from the vault and connects to the target.
4. The admin works through the proxy and **never sees the password**.
5. The session is recorded and the recording is stored for review.

## In CyberArk

CyberArk's documentation describes the **Privileged Session Manager (PSM)** as a central control point for starting privileged sessions. Users log on to remote machines or open applications through a **proxy machine**, and sessions are recorded.

## In BeyondTrust

BeyondTrust describes **Password Safe** as combining privileged password management and **session management** to discover, manage and audit privileged credential activity.

## Related Microsoft controls

- **Privileged access workstations**: the admin's own device is part of the session's security (see [Privileged accounts](/notes/privileged-accounts)).
- **Conditional Access session controls** such as sign-in frequency shorten how long an admin session lasts.

## What the standards say

NIST SP 800-53 includes **AC-12 Session Termination** (end sessions automatically after defined conditions) and **AU-14 Session Audit** (capture and log session content).

## Security angle

- Recordings are only useful if someone reviews them, at least for high-risk systems or when an alert fires.
- Recordings may capture sensitive data, such as health or personal information on screen. Protect and retain them carefully.
- Direct access that bypasses the proxy (a forgotten RDP rule, a local account) defeats the control. Block it at the network level.

## Check yourself

1. Why is it valuable that the admin never sees the password?
2. What two NIST controls relate to sessions?
3. What undermines a session proxy?

## Sources

- CyberArk Docs: [Privileged Session Manager](https://docs.cyberark.com/pam-self-hosted/latest/en/content/pasimp/privileged-session%20manager-introduction.htm)
- CyberArk Docs: [Privileged Access Manager - Self-Hosted architecture](https://docs.cyberark.com/pam-self-hosted/latest/en/content/pasimp/privileged-account-security-solution-architecture.htm)
- BeyondTrust Docs: [Password Safe - Getting Started](https://docs.beyondtrust.com/bips/docs/ps-getting-started)
- Microsoft Learn: [Privileged access devices](https://learn.microsoft.com/en-us/security/privileged-access-workstations/privileged-access-devices)
- Microsoft Learn: [Conditional Access session controls](https://learn.microsoft.com/en-us/entra/identity/conditional-access/concept-conditional-access-session)
- NIST: [SP 800-53 Rev. 5](https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final), controls AC-12 and AU-14
