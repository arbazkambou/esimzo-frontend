import { getAdditionalCountryInfo } from "@/lib/services/additional-info/info.services";
import CountryCard from "../cards/CountryCard";
import { capitalize } from "@/lib/constants";
import ProviderInfoCard from "../cards/ProviderInfoCard";

async function GetCountryProvidersAndTopDestinations({
  slug,
}: {
  slug: string;
}) {
  const result = await getAdditionalCountryInfo(slug);
  if (!result.success) return null;

  const { providers, topDestinations } = result.data;
  return (
    <section>
      <h2 className="text-2xl md:text-3xl my-2 font-bold text-center">
        Top Providers available in {capitalize(slug)}
      </h2>
      <p className="text-center pb-4 pt-2 md:text-lg text-muted-foreground">
        A quick overview of travel eSIM options for {capitalize(slug)}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-4 lg:max-w-full mb-8 mx-auto gap-4">
        {providers.map((provider) => (
          <ProviderInfoCard key={provider.id} slug={slug} provider={provider} />
        ))}
      </div>
      <h2 className="text-2xl md:text-3xl my-2 font-bold text-center">
        Top Destinations Nearby
      </h2>
      <p className="text-center pb-4 pt-2 md:text-lg text-muted-foreground">
        Explore eSIM plans for other popular destinations near{" "}
        {capitalize(slug)}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 py-4 lg:max-w-full mb-8 gap-4">
        {topDestinations.map((country) => (
          <CountryCard key={country.id} country={country} />
        ))}
      </div>
    </section>
  );
}

export default GetCountryProvidersAndTopDestinations;
