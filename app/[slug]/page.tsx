import GetCountryProvidersAndTopDestinations from "@/components/getters/GetCountryProviders";
import PlansClientPage from "@/components/plans/PlansClientPage";
import CountriesHeader from "@/components/sections/CountriesHeader";
import FAQSection from "@/components/sections/FAQSection";
import NoPackagesState from "@/components/sections/NoPackagesFound";
import {
  getCountries,
  getCountryPackagesBySlug,
} from "@/lib/services/plans/plans.services";

const faqs = [
  {
    question: "How do I buy an eSIM for this Country?",
    answer:
      "You can buy an eSIM for [Country] by selecting a plan from the list above and following the checkout process. Once purchased, you'll receive an email with instructions on how to install and activate your eSIM.",
  },
  {
    question: "Can I use my eSIM immediately after purchase?",
    answer:
      "Yes, you can use your eSIM immediately after installation. Simply follow the instructions in the email to install and activate your eSIM, and you'll be able to use it right away.",
  },
  {
    question: "How long does it take to install an eSIM?",
    answer:
      "Installing an eSIM usually takes less than 5 minutes. Simply follow the instructions in the email you receive after purchase, and you'll be able to use your eSIM in no time.",
  },
  {
    question: "Can I use my eSIM after my plan expires?",
    answer:
      "No, you cannot use your eSIM after your plan expires. Once your plan expires, you'll need to purchase a new plan to continue using your eSIM.",
  },
  {
    question: "Can I use my eSIM after my plan expires?",
    answer:
      "No, you cannot use your eSIM after your plan expires. Once your plan expires, you'll need to purchase a new plan to continue using your eSIM.",
  },
];

type PageProps = {
  params: Promise<{ slug: string }>;
};

// export async function generateStaticParams() {
//   const countries = await getCountries();
//   return countries.map((country) => ({
//     slug: country.slug,
//   }));
// }

export default async function page({ params }: PageProps) {
  const { slug } = await params;
  const packages = await getCountryPackagesBySlug(slug);

  if (!packages.success) return <NoPackagesState />;
  if (packages.data.length === 0) return <NoPackagesState />;

  return (
    <>
      <CountriesHeader slug={slug} />
      <div className="container">
        <PlansClientPage slug={slug} initialData={packages.data} />
        <GetCountryProvidersAndTopDestinations slug={slug} />
        <FAQSection faqs={faqs} />
      </div>
    </>
  );
}
