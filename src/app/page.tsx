import { Hero } from "@/components/hero";
import { SiteNav } from "@/components/site-nav";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <SiteNav />
      <Hero />
    </div>
  );
}
