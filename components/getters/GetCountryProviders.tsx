import {
  getAdditionalCountryInfo,
  getAdditionalGlobalInfo,
  getAdditionalRegionInfo,
} from "@/lib/services/additional-info/info.services";
import CountryCard from "../cards/CountryCard";
import { capitalize } from "@/lib/constants";
import ProviderInfoCard from "../cards/ProviderInfoCard";

async function GetCountryProvidersAndTopDestinations({
  slug,
  name,
  scope = "country",
}: {
  slug: string;
  name?: string;
  scope?: "country" | "region" | "global";
}) {
  const result =
    scope === "global"
      ? await getAdditionalGlobalInfo()
      : scope === "region"
        ? await getAdditionalRegionInfo(slug)
        : await getAdditionalCountryInfo(slug);
  if (!result.success) return null;

  const label = name ?? capitalize(slug);
  const { providers, topDestinations } = result.data;
  return (
    <section>
      <h2 className="text-2xl md:text-3xl my-2 font-bold text-center">
        Top Providers available in {label}
      </h2>
      <p className="text-center pb-4 pt-2 md:text-lg text-text-secondary">
        A quick overview of travel eSIM options for {label}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-4 lg:max-w-full mb-8 mx-auto gap-4">
        {providers.map((provider) => (
          <ProviderInfoCard
            key={provider.id}
            slug={slug}
            placeName={label}
            provider={provider}
          />
        ))}
      </div>
      <h2 className="text-2xl md:text-3xl my-2 font-bold text-center">
        Top Destinations Nearby
      </h2>
      <p className="text-center pb-4 pt-2 md:text-lg text-text-secondary">
        Explore eSIM plans for other popular destinations near {label}
      </p>
      <div className="mb-8 grid grid-cols-2 gap-4 py-4 md:grid-cols-3 xl:grid-cols-4">
        {topDestinations.slice(0, 4).map((country, index) => (
          <div
            key={country.id}
            className={
              index === 2
                ? "hidden md:block"
                : index === 3
                  ? "hidden xl:block"
                  : undefined
            }
          >
            <CountryCard country={country} />
          </div>
        ))}
      </div>
    </section>
  );
}

export default GetCountryProvidersAndTopDestinations;
