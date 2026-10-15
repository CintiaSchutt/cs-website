/**
 * The study roadmap behind the Notes section: areas in study order, each with
 * its topics. A topic with a matching file in src/content/notes/<slug>.md is a
 * link; one without shows as "Planned".
 *
 * To add a topic, add a line to its area. To publish it, create the Markdown
 * file (see docs/README.md, "Writing a study note").
 */

export interface RoadmapTopic {
  slug: string;
  title: string;
  /** Set for vendor-specific topics; left out for concepts that work on any platform. */
  vendor?: string;
}

export interface RoadmapArea {
  id: string;
  name: string;
  /** One short sentence. */
  description: string;
  topics: RoadmapTopic[];
}

export const roadmap: RoadmapArea[] = [
  {
    id: 'foundations',
    name: 'IAM foundations',
    description: 'The core ideas every other topic builds on.',
    topics: [
      { slug: 'what-is-iam', title: 'What is IAM?' },
      { slug: 'authn-vs-authz', title: 'Authentication vs authorization' },
      { slug: 'digital-identities', title: 'Digital identities: people, devices and workloads' },
      { slug: 'identity-lifecycle', title: 'The identity lifecycle' },
      { slug: 'least-privilege', title: 'Least privilege and zero trust' },
      { slug: 'rbac-abac', title: 'RBAC and ABAC' },
      { slug: 'federation', title: 'Federation and trust' },
      { slug: 'iam-architecture', title: 'How the pieces fit: basic IAM architecture' },
    ],
  },
  {
    id: 'authentication',
    name: 'Authentication and access',
    description: 'How people sign in, and how apps trust that sign-in.',
    topics: [
      { slug: 'oauth2', title: 'OAuth 2.0' },
      { slug: 'oidc', title: 'OpenID Connect' },
      { slug: 'tokens-and-claims', title: 'Tokens, claims and JWTs' },
      { slug: 'saml', title: 'SAML 2.0' },
      { slug: 'sso', title: 'Single sign-on (SSO)' },
      { slug: 'mfa', title: 'Multi-factor authentication (MFA)' },
      { slug: 'passkeys', title: 'Passkeys and WebAuthn' },
      { slug: 'scim', title: 'SCIM provisioning' },
      { slug: 'app-registration', title: 'Application registration and consent', vendor: 'Microsoft' },
      { slug: 'conditional-access', title: 'Conditional Access', vendor: 'Microsoft' },
      { slug: 'troubleshooting-sign-in', title: 'Troubleshooting sign-in failures' },
    ],
  },
  {
    id: 'administration',
    name: 'Identity administration',
    description: 'Day-to-day work with users, groups, roles and directories.',
    topics: [
      { slug: 'users-groups-roles', title: 'Users, groups and roles' },
      { slug: 'active-directory', title: 'Active Directory basics', vendor: 'Microsoft' },
      { slug: 'entra-id', title: 'Microsoft Entra ID basics', vendor: 'Microsoft' },
      { slug: 'hybrid-identity', title: 'Hybrid identity', vendor: 'Microsoft' },
      { slug: 'okta', title: 'Okta for workforce identity', vendor: 'Okta' },
      { slug: 'provisioning', title: 'Provisioning and deprovisioning' },
    ],
  },
  {
    id: 'governance',
    name: 'Identity governance (IGA)',
    description: 'Proving the right people have the right access, and only for as long as needed.',
    topics: [
      { slug: 'what-is-iga', title: 'What is identity governance?' },
      { slug: 'joiner-mover-leaver', title: 'Joiner, mover, leaver' },
      { slug: 'access-requests', title: 'Access requests and approvals' },
      { slug: 'access-reviews', title: 'Access reviews' },
      { slug: 'role-design', title: 'Role design' },
      { slug: 'segregation-of-duties', title: 'Segregation of duties' },
      { slug: 'audit-evidence', title: 'Audit evidence for access' },
      { slug: 'iga-platforms', title: 'SailPoint or Saviynt: core concepts', vendor: 'Vendor' },
    ],
  },
  {
    id: 'privileged-access',
    name: 'Privileged access (PAM)',
    description: 'Protecting the accounts that can change everything.',
    topics: [
      { slug: 'what-is-pam', title: 'What is privileged access management?' },
      { slug: 'privileged-accounts', title: 'Privileged accounts' },
      { slug: 'vaulting', title: 'Vaulting and credential rotation' },
      { slug: 'session-management', title: 'Privileged session management' },
      { slug: 'just-in-time-access', title: 'Just-in-time access' },
      { slug: 'pam-platforms', title: 'CyberArk or BeyondTrust: core concepts', vendor: 'Vendor' },
    ],
  },
  {
    id: 'automation',
    name: 'Automation and integration',
    description: 'Scripts, APIs and logs that keep identity work repeatable.',
    topics: [
      { slug: 'identity-apis', title: 'Identity APIs' },
      { slug: 'microsoft-graph', title: 'Microsoft Graph for identity tasks', vendor: 'Microsoft' },
      { slug: 'scripting', title: 'Scripting identity tasks (PowerShell or Python)' },
      { slug: 'lifecycle-automation', title: 'Automating the lifecycle' },
      { slug: 'logs', title: 'Reading sign-in and audit logs' },
    ],
  },
];
