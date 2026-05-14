export function Skills() {
  const skillCategories = [
    {
      title: 'Frontend',
      color: 'primary',
      skills: [
        { name: 'React', level: 95 },
        { name: 'TypeScript', level: 90 },
        { name: 'Tailwind CSS', level: 92 },
        { name: 'Next.js', level: 88 },
        { name: 'HTML/CSS', level: 98 },
      ],
    },
    {
      title: 'Mobile Development',
      color: 'secondary',
      skills: [
        { name: 'React Native', level: 88 },
        { name: 'Flutter', level: 85 },
        { name: 'iOS (Swift)', level: 80 },
        { name: 'Android (Kotlin)', level: 82 },
        { name: 'Expo', level: 90 },
      ],
    },
    {
      title: 'Backend & Software',
      color: 'accent',
      skills: [
        { name: 'Node.js', level: 90 },
        { name: 'Python', level: 85 },
        { name: 'Java', level: 82 },
        { name: 'C#/.NET', level: 80 },
        { name: 'REST APIs', level: 93 },
      ],
    },
    {
      title: 'Database & Cloud',
      color: 'primary',
      skills: [
        { name: 'MongoDB', level: 88 },
        { name: 'PostgreSQL', level: 85 },
        { name: 'Firebase', level: 90 },
        { name: 'AWS', level: 82 },
        { name: 'Docker', level: 80 },
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
    <section id="skills" className="bg-gradient-to-br from-gray-50 to-white px-4 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl text-foreground md:text-5xl">Skills & Expertise</h2>
          <div className="mx-auto mb-6 h-1 w-20 bg-gradient-to-r from-primary via-secondary to-accent"></div>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            A comprehensive skill set built through years of hands-on experience and continuous learning
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {skillCategories.map((category, categoryIndex) => (
            <div
              key={categoryIndex}
              className="rounded-xl border border-border bg-white p-8 shadow-sm transition-shadow hover:shadow-lg"
            >
              <h3 className="mb-6 text-2xl text-foreground">{category.title}</h3>
              <div className="space-y-5">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex}>
                    <div className="mb-2 flex justify-between">
                      <span className="text-foreground">{skill.name}</span>
                      <span className="text-muted-foreground">{skill.level}%</span>
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
          <p className="mb-6 text-muted-foreground">Always learning and exploring new technologies</p>
          <div className="flex flex-wrap justify-center gap-3">
            {['React', 'TypeScript', 'Node.js', 'Tailwind', 'Next.js', 'MongoDB', 'Git', 'Figma', 'Docker'].map(
              (tech, index) => (
                <span
                  key={index}
                  className="rounded-full border border-border bg-gradient-to-r from-primary/10 to-secondary/10 px-4 py-2 text-foreground transition-shadow hover:shadow-md"
                >
                  {tech}
                </span>
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
