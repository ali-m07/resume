import React from 'react';
import { useTranslation } from 'react-i18next';
import Section from './components/Section';

function BulletList({ points }) {
  return (
    <ul className="mt-2 space-y-1.5 text-[13.5px] leading-relaxed text-slate-700">
      {points.map((point, idx) => (
        <li key={idx} className="flex gap-2 cv-avoid-break">
          <span className="mt-2 inline-block h-1.5 w-1.5 flex-none rounded-full bg-accent" />
          <span dangerouslySetInnerHTML={{ __html: point }} />
        </li>
      ))}
    </ul>
  );
}

function RoleEntry({ pos }) {
  return (
    <div className="cv-avoid-break">
      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
        <p className="font-medium text-ink text-[15px]">{pos.title}</p>
        <p className="font-mono text-xs text-muted">{pos.period}</p>
      </div>
      <BulletList points={pos.points} />
    </div>
  );
}

/**
 * Unified company header: company name (large), sector description, then location/dates.
 * Used for every company so they all render with the same structure.
 */
function CompanyBlock({ name, note, meta, children, first }) {
  return (
    <div className={`cv-avoid-break ${first ? '' : 'border-t border-line pt-4'}`}>
      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
        <div>
          <h3 className="font-display text-lg font-semibold text-ink">{name}</h3>
          {note && <p className="text-xs text-muted">{note}</p>}
        </div>
      </div>
      {meta && <p className="text-xs text-muted mt-0.5">{meta}</p>}
      {children}
    </div>
  );
}

export default function ExperienceSection() {
  const { t } = useTranslation();

  const snappPositions = t('experience.snapp.positions', { returnObjects: true }) || [];
  const snapp = {
    name: t('experience.snapp.company'),
    note: t('experience.snapp.companyNote'),
    loc: t('experience.snapp.location'),
  };

  const others = ['bodyspinner', 'arsh', 'karencrowd'].map((key) => {
    const data = t(`experience.${key}`, { returnObjects: true });
    // location is "City, Country | Dates" -> split into place (meta) + dates (role period)
    let place = '';
    let dates = '';
    if (data.location && data.location.includes('|')) {
      const [p, d] = data.location.split('|', 1);
      place = p.trim();
      dates = data.location.slice(data.location.indexOf('|') + 1).trim();
    } else {
      dates = data.location || '';
    }
    return { key, data, place, dates };
  });

  return (
    <Section id="experience" title={t('experience.title')}>
      <div className="space-y-6">
        {/* Snapp! — multi-position company block */}
        <CompanyBlock name={snapp.name} note={snapp.note} meta={snapp.loc} first>
          <div className="mt-3 space-y-4 border-s-2 border-line ps-4">
            {snappPositions.map((pos, i) => (
              <RoleEntry key={i} pos={pos} />
            ))}
          </div>
        </CompanyBlock>

        {/* Other companies — single-role blocks, same header structure as Snapp */}
        {others.map(({ key, data, place, dates }) => (
          <CompanyBlock key={key} name={data.company} note={data.companyNote} meta={place}>
            <div className="mt-3 space-y-4 border-s-2 border-line ps-4">
              <RoleEntry pos={{ title: data.title, period: dates, points: data.points }} />
            </div>
          </CompanyBlock>
        ))}
      </div>
    </Section>
  );
}
