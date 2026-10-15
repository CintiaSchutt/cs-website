import { ButtonLink } from '../components/ButtonLink';
import { PageHeader } from '../components/PageHeader';

export function NotFound() {
  return (
    <div className="container page">
      <PageHeader
        title="That page doesn’t exist."
        lede="The link may be out of date, or the address may have a typo."
      />
      <p>
        <ButtonLink to="/">Back to the home page</ButtonLink>
      </p>
    </div>
  );
}
