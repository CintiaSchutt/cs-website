---
title: Passkeys and WebAuthn
summary: Phishing-resistant sign-in with public-key cryptography instead of passwords, and how the browser makes it work.
updated: 2026-11-10
---

## In one sentence

A **passkey** is a FIDO credential: a key pair where the **private key stays with the user's authenticator** and the website stores only the **public key**. Sign-in works by signing a fresh challenge. **WebAuthn** is the W3C browser API that makes this possible.

## The pieces

| Term | Meaning |
| --- | --- |
| **Relying party (RP)** | The website or app. Identified by its **RP ID**, a domain such as `example.com` |
| **Authenticator** | What holds the private key: a phone, a laptop's platform authenticator or a security key |
| **User verification (UV)** | The authenticator checked the user (fingerprint, face, PIN) |
| **User presence (UP)** | Someone was physically there (a touch or a tap) |
| **Attestation** | Optional proof of what kind of authenticator created the key |

## Registration

```js
// Browser: the server supplies the challenge and user info.
const credential = await navigator.credentials.create({
  publicKey: {
    challenge,                                  // random bytes from the server
    rp: { id: 'example.com', name: 'Example' },
    user: { id: userIdBytes, name: 'cintia@example.com', displayName: 'Cintia' },
    pubKeyCredParams: [{ type: 'public-key', alg: -7 }],  // -7 = ES256
    authenticatorSelection: { residentKey: 'required', userVerification: 'required' },
  },
});
// Send credential to the server. It verifies it and stores the public key + credential ID.
```

## Sign-in

```js
const assertion = await navigator.credentials.get({
  publicKey: { challenge, rpId: 'example.com', userVerification: 'required' },
});
// The server checks the challenge, the origin, the RP ID hash, the flags
// and the signature, using the stored public key.
```

## Why it resists phishing

The browser only lets a credential be used on the RP ID it was created for. A look-alike site on another domain cannot ask for a signature for the real site, and there's no code for the user to type into a fake page. NIST SP 800-63B-4 and CISA both treat WebAuthn as phishing-resistant.

## Synced vs device-bound

| | Synced passkey | Device-bound passkey |
| --- | --- | --- |
| Where the key lives | Copied across the user's devices by a passkey provider | Stays on one device or security key |
| Recovery | Easier: a new device gets the passkey | Harder: needs another enrolled method |
| NIST SP 800-63B-4 | Exportable key, so **not allowed at AAL3** | Can meet AAL3 |

## In Microsoft Entra

Entra supports passkeys (FIDO2) as an authentication method, including security keys and passkeys in Microsoft Authenticator. They count toward the *Phishing-resistant MFA* authentication strength.

## Security angle

- **Account recovery** is the weak spot: if recovery falls back to email or SMS, attackers will use that path instead.
- The server must check the challenge is fresh and the origin matches. A maintained library does this.
- Passkeys reduce phishing risk, but a device that's already compromised can still be abused.

## Try it yourself

Open the browser's developer tools on a site that supports passkeys and watch the `navigator.credentials.create` call when you register. Spot the `rp.id` and the `challenge`.

## Check yourself

1. What does the server store: the private key or the public key?
2. Which browser rule makes passkeys phishing-resistant?
3. Why can't synced passkeys meet NIST AAL3?

## Sources

- W3C: [Web Authentication Level 3](https://www.w3.org/TR/webauthn-3/) (W3C Recommendation)
- passkeys.dev: [What are passkeys?](https://passkeys.dev/docs/intro/what-are-passkeys/) (maintained by the FIDO Alliance and W3C community)
- NIST: [SP 800-63B-4](https://pages.nist.gov/800-63-4/sp800-63b.html), section on phishing resistance and Appendix B, Syncable Authenticators
- CISA: [Implementing Phishing-Resistant MFA (fact sheet, PDF)](https://www.cisa.gov/sites/default/files/publications/fact-sheet-implementing-phishing-resistant-mfa-508c.pdf)
- Microsoft Learn: [Passkeys (FIDO2) in Microsoft Entra ID](https://learn.microsoft.com/en-us/entra/identity/authentication/concept-authentication-passkeys-fido2)
