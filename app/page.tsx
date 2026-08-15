import { Directory } from "@/components/Directory";
import { loadBusinesses } from "@/lib/catalog";

export const dynamic = "force-static";

export default function Home() {
  const businesses = loadBusinesses();
  return <Directory businesses={businesses} />;
}
