import type { Membership } from '../content/types';
import { ExternalLink } from './ExternalLink';

/** "Member of …" with the organization's logo when one is configured (see content/site.ts). */
export function MembershipLink({ membership }: { membership: Membership }) {
  return (
    <span className="membership">
      {membership.logo ? (
        <img className="membership__logo" src={membership.logo} alt="WiCyS member badge" width="96" height="96" />
      ) : null}
      <span>
        Member of <ExternalLink href={membership.href}>{membership.name}</ExternalLink>
      </span>
    </span>
  );
}
