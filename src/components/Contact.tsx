import { useState, type ChangeEvent, type FormEvent } from 'react';
import { Github, Linkedin, Mail, MapPin, Phone, Send, Twitter } from 'lucide-react';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    window.alert("Thank you for your message! I'll get back to you soon.");
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6" />,
      label: 'Email',
      value: 'hello@abdirahmanmire.com',
      color: 'primary',
    },
    {
      icon: <Phone className="h-6 w-6" />,
      label: 'Phone',
      value: '+1 (555) 123-4567',
      color: 'secondary',
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      label: 'Location',
      value: 'Available worldwide (remote)',
      color: 'accent',
    },
  ];

  const socialLinks = [
    { icon: <Github className="h-6 w-6" />, label: 'GitHub', color: 'primary' },
    { icon: <Linkedin className="h-6 w-6" />, label: 'LinkedIn', color: 'secondary' },
    { icon: <Twitter className="h-6 w-6" />, label: 'Twitter', color: 'accent' },
  ];

  return (
    <section id="contact" className="bg-gradient-to-br from-gray-50 to-white px-4 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl text-foreground md:text-5xl">Get In Touch</h2>
          <div className="mx-auto mb-6 h-1 w-20 bg-gradient-to-r from-primary via-secondary to-accent"></div>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Have a project in mind? Let's work together to create something amazing
          </p>
        </div>

        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <h3 className="mb-6 text-2xl text-foreground">Contact Information</h3>

            <div className="mb-8 space-y-6">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div
                    className={`rounded-lg p-3 ${
                      info.color === 'primary'
                        ? 'bg-primary/10 text-primary'
                        : info.color === 'secondary'
                          ? 'bg-secondary/10 text-secondary'
                          : 'bg-accent/10 text-accent'
                    }`}
                  >
                    {info.icon}
                  </div>
                  <div>
                    <div className="mb-1 text-muted-foreground">{info.label}</div>
                    <div className="text-foreground">{info.value}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mb-8">
              <h4 className="mb-4 text-xl text-foreground">Follow Me</h4>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <button
                    key={index}
                    type="button"
                    className={`transform rounded-lg p-3 transition-all hover:scale-110 ${
                      social.color === 'primary'
                        ? 'bg-primary text-white hover:bg-primary/90'
                        : social.color === 'secondary'
                          ? 'bg-secondary text-white hover:bg-secondary/90'
                          : 'bg-accent text-white hover:bg-accent/90'
                    }`}
                    aria-label={social.label}
                  >
                    {social.icon}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-xl bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 p-6">
              <h4 className="mb-3 text-xl text-foreground">Let's Collaborate</h4>
              <p className="text-muted-foreground">
                I'm always interested in hearing about new projects and opportunities. Whether you have a
                question or just want to say hi, feel free to reach out!
              </p>
            </div>
          </div>

          <div>
            <form onSubmit={handleSubmit} className="rounded-xl border border-border bg-white p-8 shadow-sm">
              <div className="mb-6">
                <label htmlFor="name" className="mb-2 block text-foreground">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-border bg-input-background px-4 py-3 transition-all focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Your name"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="email" className="mb-2 block text-foreground">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-border bg-input-background px-4 py-3 transition-all focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="you@example.com"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="message" className="mb-2 block text-foreground">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full resize-none rounded-lg border border-border bg-input-background px-4 py-3 transition-all focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Tell me about your project..."
                />
              </div>

              <button
                type="submit"
                className="flex w-full transform items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-primary via-secondary to-accent py-3 text-white transition-all hover:scale-105 hover:opacity-90"
              >
                Send Message
                <Send className="h-5 w-5" />
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="mt-20 border-t border-border pt-8 text-center">
        <p className="text-muted-foreground">
          © {new Date().getFullYear()} Abdirahman Mire. Built with React & Tailwind CSS.
        </p>
      </div>
    </section>
  );
}
