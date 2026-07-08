import { Briefcase, Building2, Radio, Rocket } from 'lucide-react';

const roles = [
  {
    icon: Rocket,
    org: 'Xsicon',
    location: 'United States (remote / international)',
    title: 'Senior Project Manager',
    period: 'Jan 2024 — Present',
    color: 'primary' as const,
    bullets: [
      'Direct end-to-end project lifecycles with strict quality and international business requirements.',
      'Align stakeholders and engineering teams to keep delivery predictable and on schedule.',
      'Apply structured PM practices to improve productivity and resource efficiency.',
    ],
  },
  {
    icon: Briefcase,
    org: 'Self-employed — freelance & consulting',
    location: 'Hargeisa, Somaliland',
    title: 'Software consultant & builder',
    period: 'Mar 2019 — Present',
    color: 'secondary' as const,
    bullets: [
      'Dispatch agency (import/export): custom system for international goods with fewer manual errors and clearer tracking.',
      'Liby Foundation & ACHealth (Somalia / Somaliland): technical advisor on logistics and digital support for water and maternal-care programmes; operations tooling for research and mental-health training.',
    ],
  },
  {
    icon: Radio,
    org: 'Truecable TV',
    location: 'Hargeisa, Somaliland',
    title: 'Multi-role leadership — sales, media production & operations',
    period: 'Feb 2017 — Nov 2025',
    color: 'accent' as const,
    bullets: [
      'Channel monitoring: led the monitoring team, broadcast quality, incident response, and reporting for multi-channel uptime.',
      'Media production: live stream producing, switching, audio, graphics, and post-production for broadcast.',
      'Sales: led the sales department, pipeline, forecasting, and subscriber relationships.',
    ],
  },
];

export function Experience() {
  return (
    <section id="experience" className="bg-white px-4 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl text-foreground md:text-5xl">Experience</h2>
          <div className="mx-auto mb-6 h-1 w-20 bg-gradient-to-r from-primary via-secondary to-accent" />
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Highlights from my CV — project leadership, custom systems, and broadcast operations across multiple sectors.
          </p>
        </div>

        <div className="mx-auto max-w-3xl space-y-8">
          {roles.map((role) => {
            const Icon = role.icon;
            return (
              <article
                key={role.org}
                className={`relative overflow-hidden rounded-xl border border-border p-6 shadow-sm md:p-8 ${
                  role.color === 'primary'
                    ? 'bg-gradient-to-br from-primary/5 to-white'
                    : role.color === 'secondary'
                      ? 'bg-gradient-to-br from-secondary/5 to-white'
                      : 'bg-gradient-to-br from-accent/5 to-white'
                }`}
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-primary shadow-sm ring-1 ring-border">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <Building2 className="hidden h-4 w-4 shrink-0 text-muted-foreground sm:block" />
                        <h3 className="text-xl text-foreground">{role.org}</h3>
                      </div>
                      <span className="shrink-0 text-sm font-medium text-primary">{role.period}</span>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{role.location}</p>
                    <p className="mt-2 font-medium text-secondary">{role.title}</p>
                    <ul className="mt-4 list-inside list-disc space-y-2 text-muted-foreground">
                      {role.bullets.map((b) => (
                        <li key={b} className="pl-1 marker:text-primary">
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mx-auto mt-16 max-w-3xl rounded-2xl border border-border bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 p-8">
          <h3 className="mb-6 text-center text-xl text-foreground">Education & languages</h3>
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <p className="font-medium text-foreground">Admas University — Hargeisa</p>
              <p className="text-muted-foreground">Bachelor of Science, Information Technology · 2018</p>
              <p className="mt-4 font-medium text-foreground">Nuradin Secondary School — Hargeisa</p>
              <p className="text-muted-foreground">High school diploma · 2015</p>
            </div>
            <div>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <span className="font-medium text-foreground">Somali</span> — Native
                </li>
                <li>
                  <span className="font-medium text-foreground">English</span> — Proficient (C2)
                </li>
                <li>
                  <span className="font-medium text-foreground">Arabic</span> — Proficient (C2)
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
