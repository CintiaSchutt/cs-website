---
title: Scripting identity tasks (PowerShell or Python)
summary: Microsoft Graph PowerShell and MSAL for Python, with small, safe examples for everyday identity tasks.
---

## In one sentence

Identity scripting means automating repetitive admin tasks, such as reports, bulk changes and checks, with **Microsoft Graph PowerShell** or **Python with MSAL**, so they're faster, repeatable and logged.

## PowerShell: Microsoft Graph PowerShell SDK

The old **Azure AD**, **Azure AD Preview** and **MSOnline** modules are deprecated. Microsoft says to use **Microsoft Graph PowerShell** instead.

```powershell
Install-Module Microsoft.Graph -Scope CurrentUser

# Sign in interactively, asking only for the permissions this task needs
Connect-MgGraph -Scopes "User.Read.All"

# Disabled users, as a report
Get-MgUser -Filter "accountEnabled eq false" -All -Property DisplayName,UserPrincipalName |
  Select-Object DisplayName, UserPrincipalName |
  Export-Csv disabled-users.csv -NoTypeInformation

# Not sure which cmdlet calls an API? Ask.
Find-MgGraphCommand -Uri "/users/{id}" -Method GET

Disconnect-MgGraph
```

For on-premises Active Directory, the **ActiveDirectory** module has cmdlets such as `Get-ADUser` and `Disable-ADAccount` (see [Active Directory basics](/notes/active-directory)).

## Python: MSAL plus plain HTTP

**MSAL** (Microsoft Authentication Library) gets the token. Any HTTP client then calls Graph.

```python
import os, msal, requests

app = msal.ConfidentialClientApplication(
    client_id=os.environ["CLIENT_ID"],
    authority=f"https://login.microsoftonline.com/{os.environ['TENANT_ID']}",
    client_credential=os.environ["CLIENT_SECRET"],  # prefer a certificate in real use
)
token = app.acquire_token_for_client(scopes=["https://graph.microsoft.com/.default"])

url = "https://graph.microsoft.com/v1.0/users?$select=displayName,userPrincipalName"
while url:
    page = requests.get(url, headers={"Authorization": f"Bearer {token['access_token']}"}).json()
    for user in page["value"]:
        print(user["userPrincipalName"])
    url = page.get("@odata.nextLink")  # follow paging
```

## Which one?

| | PowerShell | Python |
| --- | --- | --- |
| Strength | Microsoft admin world, ready-made cmdlets | General-purpose, great for data and integrations |
| Typical use | Admin tasks, AD + Entra together | Pipelines, reporting, connecting non-Microsoft systems |

## Habits for safe scripts

- **Read-only first**: build the report, check it, then add the change.
- **Dry-run mode**: print what *would* change before changing it.
- **Least privilege**: request only the scopes the task needs.
- **No secrets in code**: use environment variables or a vault, and prefer certificates or managed identities.
- **Log** every change: who, what, when, before and after.

## Try it yourself

Write a read-only script that lists users who haven't signed in for 90 days. (Hint: look at the `signInActivity` property on the user resource and the permission it needs.)

## Flashcards

```flashcards
Q: Which PowerShell modules are deprecated?
A: **Azure AD**, **Azure AD Preview** and **MSOnline**.

Q: What replaces them?
A: **Microsoft Graph PowerShell**.

Q: How do you sign in asking only for the permissions a task needs?
A: `Connect-MgGraph -Scopes "User.Read.All"`, with the scopes the task needs.

Q: Which cmdlet helps you find the command for an API?
A: `Find-MgGraphCommand`.

Q: What does MSAL do in the Python example?
A: It gets the token. Any HTTP client then calls Graph.

Q: Which MSAL method gets an app-only token?
A: `acquire_token_for_client`.

Q: Name four habits for safe scripts.
A: Read-only first, a dry-run mode, least privilege, no secrets in code, and logging every change.

Q: Which on-premises module disables an AD account, and with which cmdlet?
A: The **ActiveDirectory** module, with `Disable-ADAccount`.
```

## Sources

- Microsoft Learn: [Microsoft Graph PowerShell overview](https://learn.microsoft.com/en-us/powershell/microsoftgraph/overview)
- Microsoft Learn: [Get started with Microsoft Graph PowerShell](https://learn.microsoft.com/en-us/powershell/microsoftgraph/get-started)
- Microsoft Learn: [Upgrade from Azure AD PowerShell to Microsoft Graph PowerShell](https://learn.microsoft.com/en-us/powershell/microsoftgraph/migration-steps)
- Microsoft Learn: [Find Microsoft Graph PowerShell commands](https://learn.microsoft.com/en-us/powershell/microsoftgraph/find-mg-graph-command)
- Microsoft Learn: [Get-MgUser](https://learn.microsoft.com/en-us/powershell/module/microsoft.graph.users/get-mguser)
- Microsoft Learn: [MSAL for Python](https://learn.microsoft.com/en-us/entra/msal/python/)
- Microsoft Learn: [OAuth 2.0 client credentials flow](https://learn.microsoft.com/en-us/entra/identity-platform/v2-oauth2-client-creds-grant-flow)
- Microsoft Learn: [ActiveDirectory module](https://learn.microsoft.com/en-us/powershell/module/activedirectory/)
