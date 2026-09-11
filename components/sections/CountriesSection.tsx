import { getPopularCountries } from "@/lib/services/plans/plans.services";
import CountryCard from "../cards/CountryCard";

export default async function CountriesSection() {
  const popularCountries = await getPopularCountries();
  const countries = popularCountries.success ? popularCountries.data : [];

  return (
    <section id="destinations" className="py-10">
      <div className="container">
        {/* Section header */}
        <div className="mb-6 flex flex-col items-center text-center">
          <span className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-ring/30 bg-secondary/10 px-4 py-1.5 text-base font-bold uppercase tracking-wider text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Popular Destinations
          </span>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {countries.slice(0, 14).map((country) => (
            <CountryCard key={country.id} country={country} />
          ))}
        </div>
      </div>
    </section>
  );
}
