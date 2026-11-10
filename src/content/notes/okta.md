---
title: Okta for workforce identity
summary: Okta's core building blocks (org, Universal Directory, apps, policies and lifecycle management) mapped to concepts I already know.
updated: 2026-11-10
---

## In one sentence

**Okta** is a cloud identity provider. For workforce identity, it gives an organization a directory, single sign-on to apps, sign-in policies and MFA, and automated provisioning to other systems.

## The building blocks

| Okta concept | What it is | Closest Entra concept |
| --- | --- | --- |
| **Org** | The container for your users, groups, apps, policies and security settings | Tenant |
| **Universal Directory** | The user store behind all Okta services | Entra ID directory |
| **App integration** | An app connected for SSO and/or provisioning | Enterprise application |
| **Authenticators** | Methods such as password, Okta Verify, passkeys | Authentication methods |
| **Policies** | Rules for sign-in and access | Conditional Access |
| **Lifecycle Management** | Automated provisioning and deprovisioning | Entra app provisioning |

## Universal Directory

Okta describes Universal Directory as the data layer behind all its services. It can hold users created in Okta, imported from a CSV file, or mirrored from **Active Directory**, LDAP or other identity providers. When a profile is **sourced** from AD or an app, it can't be edited in Okta: the source is the authority.

## Policies

- **Global session policy**: controls sign-in to Okta itself and how long the Okta session lasts.
- **Authentication policies** (app sign-in policies): the extra requirements before a specific app opens, such as "require a phishing-resistant authenticator".
- **Authenticator enrollment** and **password** policies: which methods users can enroll, and password rules.

Policies can use conditions like group membership, device, network location and user attributes.

## Lifecycle Management

Okta describes provisioning as **Create, Read, Update and Deprovision**, with deprovision in place of delete:

- Assigning a user (directly or through a group) to an app can create their account in that app.
- Removing the assignment **deactivates** the app account and removes access.
- Okta uses **SCIM** to talk to apps (see [SCIM provisioning](/notes/scim)).

## Logs

The **System Log** records Okta events such as sign-ins, policy decisions and admin changes. It can be searched in the admin console or queried through the API.

## Why learn both Okta and Entra

Job postings for IAM roles often name one or the other. The concepts are the same (directory, SSO, policy, MFA, provisioning, logs), so learning one makes the other much faster. This table is my bridge.

## Security angle

- Protect Okta admin roles with phishing-resistant authenticators, like any IdP admin.
- Test deprovisioning, not just provisioning: a removed assignment should really deactivate the app account.
- Watch the System Log for policy changes and new admin assignments.

## Check yourself

1. What does it mean for a profile to be "sourced" from AD?
2. Which Okta policy controls the Okta session length?
3. What happens to an app account when its assignment is removed?

## Sources

- Okta Developer: [Universal Directory](https://developer.okta.com/docs/concepts/universal-directory/)
- Okta Developer: [Okta organizations](https://developer.okta.com/docs/concepts/okta-organizations/)
- Okta Developer: [Policies](https://developer.okta.com/docs/concepts/policies/)
- Okta Help: [Provisioning](https://help.okta.com/en-us/content/topics/provisioning/lcm/con-okta-prov.htm)
- Okta Help: [Lifecycle of a provisioned user](https://help.okta.com/en-us/content/topics/provisioning/lcm/lcm-provisioning-workflow.htm)
- Okta Help: [Get started with app integrations](https://help.okta.com/oie/en-us/content/topics/apps/apps-overview-get-started.htm)
- Okta Help: [Supported Active Directory integration features](https://help.okta.com/en-us/content/topics/directory/ad-feature-support.htm)
- Okta Developer: [System Log query](https://developer.okta.com/docs/reference/system-log-query/)
