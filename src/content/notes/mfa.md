---
title: Multi-factor authentication (MFA)
summary: Two or more different kinds of proof at sign-in, and why some kinds resist phishing far better than others.
updated: 2026-11-10
---

## In one sentence

**Multi-factor authentication (MFA)** requires two or more *different* authentication factors, so one stolen factor (usually a password) is not enough to sign in.

## The three factors

| Factor | Examples |
| --- | --- |
| Something you **know** | Password, PIN |
| Something you **have** | Phone with an authenticator app, security key, smart card |
| Something you **are** | Fingerprint, face |

Two passwords are still **one** factor. A passkey on a phone unlocked with a fingerprint combines *have* and *are*.

## Assurance levels (NIST SP 800-63B-4)

| Level | What it requires |
| --- | --- |
| **AAL1** | Single-factor or multi-factor. MFA options should be offered |
| **AAL2** | Two distinct factors. A **phishing-resistant** option must be offered |
| **AAL3** | A phishing-resistant cryptographic authenticator with a **non-exportable** key |

## Not all MFA is equal

**Phishing-resistant** methods bind the sign-in to the real website, so a fake site can't relay it. CISA names FIDO2/WebAuthn and PKI-based (smart card) authentication as phishing-resistant.

| Method | Phishing-resistant? | Notes |
| --- | --- | --- |
| Passkeys / FIDO2 security keys | Yes | See [Passkeys and WebAuthn](/notes/passkeys) |
| Certificate / smart card (PKI) | Yes | Common in government and large companies |
| Authenticator push | No | Use **number matching** against "MFA fatigue" spam |
| One-time codes (app or token) | No | Can be typed into a fake site |
| SMS or voice codes | No | NIST lists the phone network (PSTN) as a *restricted* authenticator |
| Email codes | No | NIST says email **SHALL NOT** be used for out-of-band authentication |

## MFA in Microsoft Entra

- Methods include Microsoft Authenticator, passkeys (FIDO2), Windows Hello for Business, certificate-based authentication, OATH tokens, SMS and voice.
- **Authentication strengths** let a [Conditional Access](/notes/conditional-access) policy say *which* methods count. Built-in strengths: *Multifactor authentication*, *Passwordless MFA* and *Phishing-resistant MFA*.
- Authenticator push notifications use number matching: the user types the number shown on the sign-in screen.

## Passwords still matter (NIST SP 800-63B-4)

- At least **15 characters** when a password is the only factor. At least **8** when it is part of MFA.
- **No** composition rules (like "one symbol, one number").
- **No** forced periodic changes. Change only when there's evidence of compromise.
- Check new passwords against a **blocklist** of common, expected or breached values.

## Security angle

- Attackers target the weakest enrolled method, so remove weak ones when stronger ones are in place.
- MFA registration and account recovery are attack paths too: protect them like sign-in.
- For admins, require phishing-resistant MFA.

## Check yourself

1. Is a password plus a security question MFA? Why not?
2. What makes a method phishing-resistant?
3. What does number matching defend against?

## Sources

- NIST: [SP 800-63B-4, Authentication and Authenticator Management](https://pages.nist.gov/800-63-4/sp800-63b.html)
- NIST CSRC Glossary: [multi-factor authentication](https://csrc.nist.gov/glossary/term/multi_factor_authentication)
- CISA: [Implementing Phishing-Resistant MFA (fact sheet, PDF)](https://www.cisa.gov/sites/default/files/publications/fact-sheet-implementing-phishing-resistant-mfa-508c.pdf)
- CISA: [Implementing Number Matching in MFA Applications (fact sheet, PDF)](https://www.cisa.gov/sites/default/files/publications/fact-sheet-implement-number-matching-in-mfa-applications-508c.pdf)
- Microsoft Learn: [How Microsoft Entra multifactor authentication works](https://learn.microsoft.com/en-us/entra/identity/authentication/concept-mfa-howitworks)
- Microsoft Learn: [Authentication methods in Microsoft Entra ID](https://learn.microsoft.com/en-us/entra/identity/authentication/concept-authentication-methods)
- Microsoft Learn: [Conditional Access authentication strengths](https://learn.microsoft.com/en-us/entra/identity/authentication/concept-authentication-strengths)
- Microsoft Learn: [Number matching in MFA notifications](https://learn.microsoft.com/en-us/entra/identity/authentication/how-to-mfa-number-match)
