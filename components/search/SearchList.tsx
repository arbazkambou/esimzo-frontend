import { SearchTrigger } from "./SearchTrigger";

type Variant = "bar" | "icon";

export default function SearchList({ variant = "icon" }: { variant?: Variant }) {
  return <SearchTrigger variant={variant} />;
}
