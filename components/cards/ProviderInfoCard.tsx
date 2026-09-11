import { capitalize } from "@/lib/constants";
import { Provider } from "@/lib/types/info.types";
import { ChevronRight, Signal } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Props {
  provider: Provider;
  slug: string;
}

const ProviderInfoCard = ({ provider, slug }: Props) => {
  const { name, image, planCount } = provider;
  return (
    <div className="group relative flex items-center gap-4 rounded-2xl border border-border bg-muted/60 hover:bg-muted/80 p-4">
      <Image
        src={image}
        alt={name}
        width={64}
        height={64}
        className="object-contain rounded-sm"
      />

      <div className="min-w-0 flex-1">
        <p className="truncate text-base font-medium text-card-foreground">
          {name}
        </p>

        <div className="flex items-center gap-1">
          <p className="text-sm font-semibold text-muted-foreground">
            {planCount} Plans for {capitalize(slug)}
          </p>
        </div>
      </div>
      <Signal size={18} className="" />
    </div>
  );
};

export default ProviderInfoCard;
