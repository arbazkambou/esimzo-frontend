import { Plan } from "@/lib/types/plans.types";

type PropType = {
  packages: Plan;
};

export default function ProviderPlans({ packages }: PropType) {
  return <div className="container mt-8">{packages.name}</div>;
}
