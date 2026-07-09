import React from 'react';
import { useTranslation } from 'react-i18next';
import RtlHtml from './components/RtlHtml';
import RtlText from './components/RtlText';
import Section from './components/Section';

function BulletList({ points }) {
  return (
    <ul className="mt-2 space-y-1.5 text-[13.5px] leading-relaxed cv-text cv-prose">
      {points.map((point, idx) => (
        <li key={idx} className="cv-bullet-item flex gap-2 cv-atomic-block">
          <span className="mt-2 inline-block h-1.5 w-1.5 flex-none rounded-full bg-accent cv-bullet-dot" />
          <RtlHtml html={point} className="cv-prose-inline min-w-0 flex-1" />
        </li>
      ))}
    </ul>
  );
}

function RoleEntry({ pos }) {
  return (
    <div className="cv-role-entry space-y-2">
      <div className="cv-keep-with-next">
        <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
          <RtlText tag="h4" text={pos.title} className="cv-role-title font-medium text-ink text-[15px] m-0" />
          <RtlText tag="p" text={pos.period} className="font-mono text-xs text-muted m-0 cv-date" />
        </div>
      </div>
      <BulletList points={pos.points} />
    </div>
  );
}

/**
 * Company header: name + sector note + location.
 * The header block (name + note + meta) is kept together with the FIRST role
 * entry via cv-keep-with-next, so the company name is never orphaned at the
 * bottom of a page. Subsequent roles can break freely across pages.
 */
function CompanyBlock({ name, note, meta, children, first }) {
  return (
    <div className={`cv-company-block ${first ? '' : 'border-t border-line pt-4'}`}>
      {/* Header + first child are grouped: cv-keep-with-next prevents a break
          between this heading block and the content immediately below it. */}
      <div className="cv-keep-with-next">
        <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
          <div>
            <RtlText tag="h3" text={name} className="cv-company-name font-display text-lg font-semibold text-ink" />
            {note && <RtlHtml tag="p" html={note} className="text-xs text-muted cv-prose-inline" />}
          </div>
        </div>
        {meta && <RtlHtml tag="p" html={meta} className="text-xs text-muted mt-0.5 cv-prose-inline" />}
      </div>
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
    let place = '';
    let dates = '';
    if (data.location && data.location.includes('|')) {
      const idx = data.location.indexOf('|');
      place = data.location.slice(0, idx).trim();
      dates = data.location.slice(idx + 1).trim();
    } else {
      dates = data.location || '';
    }
    return { key, data, place, dates };
  });

  return (
    <Section id="experience" title={t('experience.title')}>
      <div className="space-y-6">
        {/* Snapp! — multi-position company. The wrapper is breakable; each
            RoleEntry is atomic. Roles 1+2 can stay on page 1, role 3 flows
            to page 2 organically. */}
        <CompanyBlock name={snapp.name} note={snapp.note} meta={snapp.loc} first>
          <div className="mt-3 space-y-4 border-s-2 border-line ps-4">
            {snappPositions.map((pos, i) => (
              <RoleEntry key={i} pos={pos} />
            ))}
          </div>
        </CompanyBlock>

        {/* Other companies — single-role blocks, same header structure. */}
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
