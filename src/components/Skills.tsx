export function Skills() {
  const skillCategories = [
    {
      title: 'Engineering & delivery',
      color: 'primary',
      skills: [
        { name: '.NET / C# development', level: 92 },
        { name: 'Web development', level: 90 },
        { name: 'API design & integration', level: 90 },
        { name: 'Database management', level: 88 },
        { name: 'Software development lifecycle', level: 90 },
      ],
    },
    {
      title: 'Project leadership',
      color: 'secondary',
      skills: [
        { name: 'Project management', level: 94 },
        { name: 'Stakeholder engagement', level: 92 },
        { name: 'Team leadership', level: 90 },
        { name: 'Resource allocation', level: 88 },
        { name: 'Problem solving', level: 93 },
      ],
    },
    {
      title: 'Craft & quality',
      color: 'accent',
      skills: [
        { name: 'Programming & code optimisation', level: 90 },
        { name: 'Creative design (media & UI)', level: 85 },
        { name: 'Certified application developer', level: 88 },
      ],
    },
  ];

  const getColorClass = (color: string) => {
    const colors: Record<string, string> = {
      primary: 'bg-primary',
      secondary: 'bg-secondary',
      accent: 'bg-accent',
    };
    return colors[color] || 'bg-primary';
  };

  return (
    <section id="skills" className="bg-gradient-to-br from-gray-50 to-white px-4 py-12 sm:px-6 sm:py-16 md:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center sm:mb-16">
          <h2 className="mb-4 text-2xl text-foreground sm:text-3xl md:text-5xl">Skills & expertise</h2>
          <div className="mx-auto mb-6 h-1 w-20 bg-gradient-to-r from-primary via-secondary to-accent"></div>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Core strengths from my CV — engineering, delivery leadership, and product-minded execution.
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((category, categoryIndex) => (
            <div
              key={categoryIndex}
              className="rounded-xl border border-border bg-white p-5 shadow-sm transition-shadow sm:p-8 sm:hover:shadow-lg"
            >
              <h3 className="mb-4 text-xl text-foreground sm:mb-6 sm:text-2xl">{category.title}</h3>
              <div className="space-y-5">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex}>
                    <div className="mb-2 flex justify-between gap-2">
                      <span className="min-w-0 text-sm text-foreground sm:text-base">{skill.name}</span>
                      <span className="shrink-0 text-muted-foreground">{skill.level}%</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-gray-200">
                      <div
                        className={`h-full rounded-full transition-all duration-1000 ease-out ${getColorClass(category.color)}`}
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="mb-6 text-muted-foreground">Stack & domains I work in most often</p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              '.NET',
              'C#',
              'REST APIs',
              'SQL Server',
              'Azure',
              'Broadcast tech',
              'Agile / PM',
              'Logistics software',
              'Media production',
              'Git',
            ].map((tech, index) => (
              <span
                key={index}
                className="rounded-full border border-border bg-gradient-to-r from-primary/10 to-secondary/10 px-4 py-2 text-foreground transition-shadow hover:shadow-md"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
