import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BusinessSite } from "@/components/BusinessSite";
import { getBusiness, loadBusinesses } from "@/lib/catalog";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-static";

export function generateStaticParams() {
  return loadBusinesses().map((business) => ({ slug: business.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const business = getBusiness(slug);
  if (!business) {
    return { title: "Business not found" };
  }
  return {
    title: `${business.name} | Proposed website`,
    description: business.tagline,
  };
}

export default async function BusinessPage({ params }: PageProps) {
  const { slug } = await params;
  const business = getBusiness(slug);
  if (!business) {
    notFound();
  }
  return <BusinessSite business={business} />;
}
