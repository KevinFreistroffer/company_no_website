import type { Business } from "@/lib/types";

export function DemoBanner({ business }: { business: Business }) {
  const domain = business.suggestedDomains[0];
  return (
    <div className="demo-banner">
      <p>
        Sample site for <strong>{business.name}</strong> — not affiliated yet.
        {domain ? (
          <>
            {" "}
            Suggested domain: <span className="demo-domain">{domain}</span>
          </>
        ) : null}
      </p>
    </div>
  );
}
