import React from "react";
import { withDefiniteArticle } from "@/lib/display-name";

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
        {providerName} eSIM Data Plans for {withDefiniteArticle(countryName)}
      </h1>
    </header>
  );
}
