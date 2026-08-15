import type { Offerings } from "@/lib/types";

export function OfferingsSection({ offerings }: { offerings: Offerings }) {
  return (
    <section id={offerings.sectionId} className="panel offerings">
      <div className="offerings-intro">
        <h2>{offerings.title}</h2>
        <p>{offerings.intro}</p>
      </div>
      <div className="menu-board">
        {offerings.sections.map((group) => (
          <div className="menu-section" key={group.heading}>
            <h3>{group.heading}</h3>
            <dl>
              {group.items.map((entry) => (
                <div className="menu-item" key={`${group.heading}-${entry.name}`}>
                  <dt>
                    {entry.name}
                    {entry.price ? <span className="menu-price">{entry.price}</span> : null}
                  </dt>
                  {entry.description ? <dd>{entry.description}</dd> : null}
                  {entry.notes ? <dd className="menu-notes">{entry.notes}</dd> : null}
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>
      <p className="note offerings-footnote">{offerings.footnote}</p>
    </section>
  );
}
