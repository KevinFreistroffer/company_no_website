"use client";

import { useMemo, useState } from "react";
import type { Business, TemplateId } from "@/lib/types";

const FILTERS: { id: "all" | TemplateId; label: string }[] = [
  { id: "all", label: "All" },
  { id: "food", label: "Food & drink" },
  { id: "salon", label: "Salon" },
  { id: "auto", label: "Auto" },
  { id: "retail", label: "Retail" },
  { id: "studio", label: "Studio" },
  { id: "laundry", label: "Laundry" },
  { id: "thrift", label: "Thrift" },
  { id: "trade", label: "Trades" },
];

export function Directory({ businesses }: { businesses: Business[] }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["id"]>("all");

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return businesses.filter((business) => {
      if (filter !== "all" && business.template !== filter) {
        return false;
      }
      if (!needle) {
        return true;
      }
      return [
        business.name,
        business.city,
        business.state,
        business.categoryLabel,
        business.suggestedDomains.join(" "),
      ]
        .join(" ")
        .toLowerCase()
        .includes(needle);
    });
  }, [businesses, filter, query]);

  return (
    <div className="directory">
      <header className="directory-hero">
        <p className="eyebrow">Pitch demos</p>
        <h1>Proposed websites for local businesses without one</h1>
        <p>
          {businesses.length} sample sites from public listings. Each page is a
          proposed site you can show the owner — not their official website.
        </p>
        <label className="search">
          <span>Search</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Name, city, or domain"
          />
        </label>
        <div className="filters">
          {FILTERS.map((item) => (
            <button
              key={item.id}
              type="button"
              className={filter === item.id ? "active" : ""}
              onClick={() => setFilter(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </header>
      <ul className="directory-grid">
        {visible.map((business) => (
          <li key={business.slug}>
            <a href={`/${business.slug}`}>
              <span className="card-kicker">
                {business.city}, {business.state}
              </span>
              <strong>{business.name}</strong>
              <span>{business.categoryLabel}</span>
              <span className="card-domain">{business.suggestedDomains[0]}</span>
            </a>
          </li>
        ))}
      </ul>
      {visible.length === 0 ? <p>No matching businesses.</p> : null}
    </div>
  );
}
