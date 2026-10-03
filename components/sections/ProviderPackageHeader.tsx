import { withDefiniteArticle } from "@/lib/display-name";

type PropsType = {
  providerName: string;
  countryName: string;
};

export default function ProviderPackageHeader({
  providerName,
  countryName,
}: PropsType) {
  const destination = withDefiniteArticle(countryName);

  return (
    <header className="flex min-w-0 flex-col gap-1.5">
      <h1 className="wrap-break-word text-h3 text-brand-navy sm:text-h2">
        <span className="text-primary">{providerName}</span> eSIM Data Plans for{" "}
        <span className="mt-0.5 block text-primary sm:mt-0 sm:inline">
          {destination}
        </span>
      </h1>
      <p className="max-w-2xl text-pretty text-body-sm text-text-secondary sm:text-body">
        Compare this provider&apos;s country, regional, and global plans — then
        buy direct with referral tracking.
      </p>
    </header>
  );
}
