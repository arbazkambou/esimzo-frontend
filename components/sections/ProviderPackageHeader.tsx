import { capitalize } from "@/lib/constants";
import React from "react";

type PropsType = {
  providerName: string;
  countryName: string;
};

export default function ProviderPackageHeader({
  providerName,
  countryName,
}: PropsType) {
  return (
    <header>
      <h1 className="text-4xl py-2 font-bold">
        {capitalize(providerName)} eSIM Data Plans for {capitalize(countryName)}
      </h1>
    </header>
  );
}
