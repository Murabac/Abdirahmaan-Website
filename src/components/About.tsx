import { Code2, Globe, Palette, Rocket, Server, Smartphone } from 'lucide-react';

export function About() {
  const features = [
    {
      icon: <Globe className="h-8 w-8 text-primary" />,
      title: 'Web Development',
      description:
        'Building responsive, modern web applications with cutting-edge frameworks and best practices',
    },
    {
      icon: <Smartphone className="h-8 w-8 text-secondary" />,
      title: 'Mobile Apps',
      description: 'Creating native and cross-platform mobile applications for iOS and Android devices',
    },
    {
      icon: <Server className="h-8 w-8 text-accent" />,
      title: 'Software Solutions',
      description: 'Developing scalable backend systems, APIs, and custom software tailored to your needs',
    },
    {
      icon: <Code2 className="h-8 w-8 text-primary" />,
      title: 'Clean Code',
      description: 'Writing maintainable, scalable, and well-documented code following industry standards',
    },
    {
      icon: <Palette className="h-8 w-8 text-secondary" />,
      title: 'UI/UX Design',
      description: 'Designing beautiful, intuitive interfaces with attention to detail and user experience',
    },
    {
      icon: <Rocket className="h-8 w-8 text-accent" />,
      title: 'Performance',
      description: 'Building fast, optimized applications that deliver exceptional user experiences',
    },
  ];

  return (
    <section id="about" className="bg-white px-4 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl text-foreground md:text-5xl">About Me</h2>
          <div className="mx-auto mb-6 h-1 w-20 bg-gradient-to-r from-primary via-secondary to-accent"></div>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            I'm a passionate web developer focused on creating engaging digital experiences. With expertise
            in modern web technologies, I bring ideas to life through code.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="transform rounded-xl border border-border bg-gradient-to-br from-gray-50 to-white p-8 transition-all hover:-translate-y-2 hover:shadow-lg"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="mb-3 text-xl text-foreground">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 rounded-2xl bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 p-8 md:p-12">
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div>
              <h3 className="mb-4 text-2xl text-foreground md:text-3xl">My Journey</h3>
              <p className="mb-4 text-muted-foreground">
                As a web developer, I've had the opportunity to work on diverse projects, from responsive
                websites to complex web applications. My approach combines technical expertise with creative
                problem-solving.
              </p>
              <p className="text-muted-foreground">
                I'm constantly learning and staying up-to-date with the latest web technologies to deliver
                cutting-edge solutions that exceed expectations.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg bg-white p-6 text-center shadow-sm">
                <div className="mb-2 text-3xl text-primary">50+</div>
                <div className="text-muted-foreground">Projects</div>
              </div>
              <div className="rounded-lg bg-white p-6 text-center shadow-sm">
                <div className="mb-2 text-3xl text-secondary">5+</div>
                <div className="text-muted-foreground">Years</div>
              </div>
              <div className="rounded-lg bg-white p-6 text-center shadow-sm">
                <div className="mb-2 text-3xl text-accent">30+</div>
                <div className="text-muted-foreground">Clients</div>
              </div>
              <div className="rounded-lg bg-white p-6 text-center shadow-sm">
                <div className="mb-2 text-3xl text-primary">100%</div>
                <div className="text-muted-foreground">Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
