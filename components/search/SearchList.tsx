import { getCountries, getRegions } from "@/lib/services/plans/plans.services";
import { SearchDialog } from "./SearchDialog";

type Variant = "bar" | "icon";

export default async function SearchList({ variant = "icon" }: { variant?: Variant }) {
  const [countriesRes, regionsRes] = await Promise.all([
    getCountries(),
    getRegions(),
  ]);

  return (
    <SearchDialog
      countries={countriesRes.success ? countriesRes.data : []}
      regions={regionsRes.success ? regionsRes.data : []}
      variant={variant}
    />
  );
}
