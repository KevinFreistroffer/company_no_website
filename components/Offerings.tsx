import type { OfferItem, Offerings } from "@/lib/types";

function MenuItem({ item }: { item: OfferItem }) {
  if (!item.image) {
    return (
      <div className="menu-item">
        <dt>
          {item.name}
          {item.price ? <span className="menu-price">{item.price}</span> : null}
        </dt>
        {item.description ? <dd>{item.description}</dd> : null}
        {item.notes ? <dd className="menu-notes">{item.notes}</dd> : null}
      </div>
    );
  }

  return (
    <article className="menu-card">
      <div className="menu-photo">
        <img src={item.image} alt={item.name} />
      </div>
      <div className="menu-copy">
        <div className="menu-heading">
          <h4>{item.name}</h4>
          {item.price ? <span className="menu-price">{item.price}</span> : null}
        </div>
        {item.description ? <p>{item.description}</p> : null}
        {item.notes ? <p className="menu-notes">{item.notes}</p> : null}
      </div>
    </article>
  );
}

export function OfferingsSection({ offerings }: { offerings: Offerings }) {
  const pictured = offerings.sections.some((group) =>
    group.items.some((entry) => Boolean(entry.image)),
  );

  return (
    <section
      id={offerings.sectionId}
      className={pictured ? "panel offerings offerings-pictured" : "panel offerings"}
    >
      <div className="offerings-intro">
        <h2>{offerings.title}</h2>
        <p>{offerings.intro}</p>
      </div>
      <div className="menu-board">
        {offerings.sections.map((group) => (
          <div className="menu-section" key={group.heading}>
            <h3>{group.heading}</h3>
            {pictured ? (
              <div className="menu-cards">
                {group.items.map((entry) => (
                  <MenuItem item={entry} key={`${group.heading}-${entry.name}`} />
                ))}
              </div>
            ) : (
              <dl>
                {group.items.map((entry) => (
                  <MenuItem item={entry} key={`${group.heading}-${entry.name}`} />
                ))}
              </dl>
            )}
          </div>
        ))}
      </div>
      <p className="note offerings-footnote">{offerings.footnote}</p>
    </section>
  );
}
