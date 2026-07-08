import { Code2, Globe, Palette, Radio, Server, Users } from 'lucide-react';

export function About() {
  const features = [
    {
      icon: <Globe className="h-8 w-8 text-primary" />,
      title: 'Custom business systems',
      description:
        'End-to-end software for logistics, operations, and reporting — tailored to how your organisation actually works.',
    },
    {
      icon: <Radio className="h-8 w-8 text-secondary" />,
      title: 'Broadcast & media operations',
      description:
        'Live production, channel monitoring, and technical workflows with a focus on uptime, quality, and clear escalation paths.',
    },
    {
      icon: <Server className="h-8 w-8 text-accent" />,
      title: '.NET, APIs & data',
      description:
        'Backend services, API design, database management, and performance-minded engineering on the Microsoft stack and beyond.',
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: 'Project & stakeholder leadership',
      description:
        'Remote-friendly delivery with international teams: planning, prioritisation, and communication from discovery to release.',
    },
    {
      icon: <Palette className="h-8 w-8 text-secondary" />,
      title: 'Creative & product craft',
      description:
        'On-air graphics, promotional assets, and UI work where brand consistency and clarity matter as much as the code.',
    },
    {
      icon: <Code2 className="h-8 w-8 text-accent" />,
      title: 'Problem solving at scale',
      description:
        'From NGOs and healthcare initiatives to commercial platforms — pragmatic solutions that reduce manual work and risk.',
    },
  ];

  return (
    <section id="about" className="bg-white px-4 py-12 sm:px-6 sm:py-16 md:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center sm:mb-16">
          <h2 className="mb-4 text-2xl text-foreground sm:text-3xl md:text-5xl">About Me</h2>
          <div className="mx-auto mb-6 h-1 w-20 bg-gradient-to-r from-primary via-secondary to-accent"></div>
          <p className="mx-auto max-w-3xl text-base text-muted-foreground sm:text-lg">
            I'm a senior software developer and project manager with a strong background in custom business systems,
            broadcast automation, and scalable technical solutions. I'm a versatile problem-solver with a proven track
            record of leading international remote teams and delivering high-impact software across e-commerce,
            construction, logistics, media, healthcare, and the NGO sector.
          </p>
        </div>

        <div className="mt-8 grid gap-6 sm:mt-12 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="transform rounded-xl border border-border bg-gradient-to-br from-gray-50 to-white p-5 transition-all sm:p-8 sm:hover:-translate-y-2 sm:hover:shadow-lg"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="mb-3 text-xl text-foreground">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-2xl bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 p-5 sm:mt-16 sm:p-8 md:p-12">
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div>
              <h3 className="mb-4 text-2xl text-foreground md:text-3xl">At a glance</h3>
              <p className="mb-4 text-muted-foreground">
                My path combines hands-on engineering with people leadership: from on-the-ground broadcast and sales
                operations at Truecable TV to long-running freelance builds for logistics and NGOs, and today senior
                project management with US-based Xsicon — always with the same focus on reliable delivery and clear
                communication.
              </p>
              <p className="text-muted-foreground">
                Certified application developer; BSc Information Technology (Admas University, 2018). Native Somali;
                English and Arabic at C2.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="rounded-lg bg-white p-4 text-center shadow-sm sm:p-6">
                <div className="mb-1 text-2xl text-primary sm:mb-2 sm:text-3xl">9+</div>
                <div className="text-xs text-muted-foreground sm:text-sm">Years in tech & media roles</div>
              </div>
              <div className="rounded-lg bg-white p-4 text-center shadow-sm sm:p-6">
                <div className="mb-1 text-2xl text-secondary sm:mb-2 sm:text-3xl">6+</div>
                <div className="text-xs text-muted-foreground sm:text-sm">Industry verticals served</div>
              </div>
              <div className="rounded-lg bg-white p-4 text-center shadow-sm sm:p-6">
                <div className="mb-1 text-2xl text-accent sm:mb-2 sm:text-3xl">Remote</div>
                <div className="text-xs text-muted-foreground sm:text-sm">International team leadership</div>
              </div>
              <div className="rounded-lg bg-white p-4 text-center shadow-sm sm:p-6">
                <div className="mb-1 text-2xl text-primary sm:mb-2 sm:text-3xl">BSc</div>
                <div className="text-xs text-muted-foreground sm:text-sm">Information Technology</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
