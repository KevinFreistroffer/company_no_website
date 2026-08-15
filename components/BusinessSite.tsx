import type { CSSProperties } from "react";
import { DemoBanner } from "@/components/DemoBanner";
import { OfferingsSection } from "@/components/Offerings";
import {
  customerAbout,
  defaultCustomerAbout,
  mapsEmbedUrl,
  splitHighlights,
} from "@/lib/copy";
import { formatPhone, telHref } from "@/lib/domains";
import { dayLabel, formatDayHours, orderedHours } from "@/lib/hours";
import { industryChrome } from "@/lib/industry";
import type { Business } from "@/lib/types";

function CallLink({ business, className }: { business: Business; className?: string }) {
  if (!business.phone) {
    return null;
  }
  return (
    <a className={className} href={telHref(business.phone)}>
      Call {formatPhone(business.phone)}
    </a>
  );
}

function fullAddress(business: Business): string {
  if (business.address.toLowerCase().includes(business.city.toLowerCase())) {
    return business.address;
  }
  return `${business.address}, ${business.city}, ${business.state}`;
}

export function BusinessSite({ business }: { business: Business }) {
  const hours = business.hours ? orderedHours(business.hours) : null;
  const dark = business.template === "studio";
  const chrome = industryChrome(business.template, business.name, business.category);
  const about = customerAbout(
    business.about,
    defaultCustomerAbout(business),
  );
  const { story, confirm } = splitHighlights(business.highlights);
  const embedUrl = mapsEmbedUrl(business);
  const menuHref = `#${business.offerings.sectionId}`;

  return (
    <div
      className="site-root"
      data-template={business.template}
      data-font={business.theme.font}
      data-theme={dark ? "dark" : "light"}
      data-hours={hours ? "known" : "unknown"}
      style={
        {
          "--biz-primary": business.theme.primary,
          "--biz-accent": business.theme.accent,
          "--biz-bg": business.theme.background,
          "--biz-fg": business.theme.foreground,
          "--biz-muted": business.theme.muted,
        } as CSSProperties
      }
    >
      <DemoBanner business={business} />
      <header className="site-nav">
        <div className="site-wrap nav-inner">
          <span className="site-mark">{business.name}</span>
          <nav>
            <a href="#about">About</a>
            <a href={menuHref}>{business.offerings.navLabel}</a>
            <a href="#visit">{chrome.visitTitle}</a>
            <CallLink business={business} className="nav-call" />
          </nav>
        </div>
      </header>

      <section className="hero">
        <div
          className="hero-image"
          style={{ backgroundImage: `url(${business.theme.heroImage})` }}
        />
        <div className="hero-copy site-wrap">
          <p className="eyebrow">
            {business.categoryLabel} · {business.city}, {business.state}
          </p>
          <h1>{business.name}</h1>
          <p className="tagline">{business.tagline}</p>
          <div className="hero-actions">
            <a className="btn-primary" href={menuHref}>
              {chrome.heroCta}
            </a>
            <CallLink business={business} className="btn-secondary" />
            <a className="btn-secondary" href={business.mapsUrl} target="_blank" rel="noreferrer">
              Get directions
            </a>
          </div>
        </div>
      </section>

      <main className="site-wrap">
        <section id="about" className="panel about">
          <div>
            <h2>About</h2>
            <p>{about}</p>
            {business.paymentNotes && !/not confirmed|unverified|aggregator/i.test(business.paymentNotes) ? (
              <p className="note">{business.paymentNotes}</p>
            ) : null}
            {business.established ? (
              <p className="note">Established {business.established}</p>
            ) : null}
          </div>
          {story.length > 0 ? (
            <ul className="highlights">
              {story.map((entry) => (
                <li key={entry}>{entry}</li>
              ))}
            </ul>
          ) : null}
        </section>

        <OfferingsSection offerings={business.offerings} />

        {business.services.length > 0 ? (
          <section className="panel amenities">
            <h2>{chrome.amenitiesTitle}</h2>
            <ul className="amenity-chips">
              {business.services.map((service) => (
                <li key={service}>{service}</li>
              ))}
            </ul>
          </section>
        ) : null}

        <section id="visit" className="panel visit">
          <div className="visit-card">
            <h2>{chrome.visitTitle}</h2>
            <p>{chrome.visitBlurb}</p>
            <p className="address">{fullAddress(business)}</p>
            <div className="visit-actions">
              <CallLink business={business} className="btn-primary" />
              {!hours ? <span className="hours-chip">Call for hours</span> : null}
            </div>
            <a className="text-link" href={business.mapsUrl} target="_blank" rel="noreferrer">
              Open in Google Maps
            </a>
            <iframe
              className="visit-map"
              title={`Map of ${business.name}`}
              src={embedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          {hours ? (
            <div className="hours-card">
              <h2>Hours</h2>
              <table className="hours">
                <tbody>
                  {hours.map((entry) => (
                    <tr key={entry.day}>
                      <th>{dayLabel(entry.day)}</th>
                      <td>{formatDayHours(entry)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="note">Call to confirm before you go.</p>
            </div>
          ) : null}
        </section>

        {confirm.length > 0 ? (
          <aside className="panel confirm">
            <h2>Details to confirm</h2>
            <p className="note">
              Public listings disagree on a few points. Worth checking by phone:
            </p>
            <ul>
              {confirm.map((entry) => (
                <li key={entry}>{entry}</li>
              ))}
            </ul>
          </aside>
        ) : null}

        <section className="panel domain">
          <h2>A website of your own</h2>
          <p>
            This is a sample of what {business.name} could share online — including
            a {business.offerings.navLabel.toLowerCase()} you can rewrite with your
            own wording.
            Recommended domains:
          </p>
          <ul className="domain-list">
            {business.suggestedDomains.map((domain) => (
              <li key={domain}>{domain}</li>
            ))}
          </ul>
        </section>
      </main>

      <footer className="site-footer">
        <div className="site-wrap">
          <p>
            {business.name} · {business.city}, {business.state}
          </p>
          <p className="note">
            Demo built from public listings. Not affiliated until the business
            adopts it.
          </p>
        </div>
      </footer>
    </div>
  );
}
