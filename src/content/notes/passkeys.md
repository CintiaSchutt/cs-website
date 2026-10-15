---
title: Passkeys and WebAuthn
summary: Phishing-resistant sign-in with public-key cryptography instead of passwords.
updated: 2026-10-15
---

> Sample note for the prototype. Replace it with your own summary.

## In one sentence

A passkey is a key pair: the private key stays on the user's device, the website only stores the public key, and sign-in is proved by signing a challenge.

## Why it resists phishing

The browser binds each passkey to the website's domain. A fake site on another domain cannot ask for a signature for the real one.

## Registration

1. The server sends a random challenge.
2. The device creates a new key pair for this site, after a fingerprint, face or PIN check.
3. The server stores the public key and a credential ID.

## Sign-in

1. The server sends a new challenge.
2. The device signs it with the private key.
3. The server checks the signature with the stored public key.

## Open questions to study

- Account recovery when every device is lost.
- Synced passkeys versus device-bound keys.
