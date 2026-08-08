import { useState, type ChangeEvent, type FormEvent, type ReactNode } from 'react';
import { Globe, Loader2, Mail, MapPin, Phone, Send } from 'lucide-react';
import { submitContactMessage } from '../lib/contact';
import { isSupabaseConfigured } from '../lib/supabase';

const EMAIL = 'arahman.murabac@gmail.com';
const PHONE_DISPLAY = '+252 63 474 9276';
const PHONE_TEL = '+252634749276';
const SITE = 'https://www.abdirahmaan.dev';

type ContactRow = {
  icon: ReactNode;
  label: string;
  value: string;
  color: 'primary' | 'secondary' | 'accent';
  href?: string;
};

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    try {
      await submitContactMessage(formData);
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (status === 'error' || status === 'success') {
      setStatus('idle');
      setErrorMessage('');
    }
  };

  const contactInfo: ContactRow[] = [
    {
      icon: <Mail className="h-6 w-6" />,
      label: 'Email',
      value: EMAIL,
      color: 'primary',
      href: `mailto:${EMAIL}`,
    },
    {
      icon: <Phone className="h-6 w-6" />,
      label: 'Phone',
      value: PHONE_DISPLAY,
      color: 'secondary',
      href: `tel:${PHONE_TEL}`,
    },
    {
      icon: <Globe className="h-6 w-6" />,
      label: 'Website',
      value: 'abdirahmaan.dev',
      color: 'accent',
      href: SITE,
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      label: 'Location',
      value: 'Hargeisa, Somaliland',
      color: 'primary',
    },
  ];

  const socialLinks = [{ href: SITE, label: 'Portfolio site', Icon: Globe }];

  const isSubmitting = status === 'submitting';

  return (
    <section id="contact" className="bg-gradient-to-br from-gray-50 to-white px-4 py-12 sm:px-6 sm:py-16 md:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center sm:mb-16">
          <h2 className="mb-4 text-2xl text-foreground sm:text-3xl md:text-5xl">Get In Touch</h2>
          <div className="mx-auto mb-6 h-1 w-20 bg-gradient-to-r from-primary via-secondary to-accent"></div>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Have a project in mind? Let's talk about custom systems, technical leadership, or delivery support.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <div>
            <h3 className="mb-4 text-xl text-foreground sm:mb-6 sm:text-2xl">Contact Information</h3>

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
                  <div className="min-w-0 flex-1">
                    <div className="mb-1 text-sm text-muted-foreground">{info.label}</div>
                    {info.href ? (
                      <a
                        href={info.href}
                        className="break-all text-foreground underline-offset-4 hover:text-primary hover:underline"
                        target={info.href.startsWith('http') ? '_blank' : undefined}
                        rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      >
                        {info.value}
                      </a>
                    ) : (
                      <div className="text-foreground">{info.value}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mb-8">
              <h4 className="mb-4 text-xl text-foreground">Follow & links</h4>
              <div className="flex flex-wrap gap-4">
                {socialLinks.map(({ href, label, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    className="rounded-lg bg-primary p-3 text-white transition-all hover:scale-110 hover:bg-primary/90"
                    aria-label={label}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon className="h-6 w-6" />
                  </a>
                ))}
              </div>
            </div>

            <div className="rounded-xl bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 p-6">
              <h4 className="mb-3 text-xl text-foreground">Let's collaborate</h4>
              <p className="text-muted-foreground">
                I'm open to remote-friendly engagements across software delivery, broadcast-adjacent tooling, and
                mission-driven organisations. Reach out with a short brief and I'll respond as soon as I can.
              </p>
            </div>
          </div>

          <div>
            <form onSubmit={handleSubmit} className="rounded-xl border border-border bg-white p-5 shadow-sm sm:p-8">
              {!isSupabaseConfigured && (
                <p className="mb-6 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
                  Form storage is not configured yet. You can still email me at{' '}
                  <a href={`mailto:${EMAIL}`} className="font-medium underline">
                    {EMAIL}
                  </a>
                  .
                </p>
              )}

              {status === 'success' && (
                <p
                  className="mb-6 rounded-lg border border-accent/30 bg-accent/10 px-4 py-3 text-sm text-foreground"
                  role="status"
                >
                  Thank you for your message! I'll get back to you soon.
                </p>
              )}

              {status === 'error' && errorMessage && (
                <p className="mb-6 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive" role="alert">
                  {errorMessage}
                </p>
              )}

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
                  disabled={isSubmitting}
                  className="w-full rounded-lg border border-border bg-input-background px-4 py-3 transition-all focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-60"
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
                  disabled={isSubmitting}
                  className="w-full rounded-lg border border-border bg-input-background px-4 py-3 transition-all focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-60"
                  placeholder={EMAIL}
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
                  disabled={isSubmitting}
                  rows={6}
                  className="w-full resize-none rounded-lg border border-border bg-input-background px-4 py-3 transition-all focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-60"
                  placeholder="Tell me about your project or role..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !isSupabaseConfigured}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-primary via-secondary to-accent py-3.5 text-white transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 sm:hover:scale-105"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send className="h-5 w-5" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="mt-12 border-t border-border pt-6 text-center sm:mt-20 sm:pt-8">
        <p className="text-sm text-muted-foreground sm:text-base">
          © {new Date().getFullYear()} Abdirahmaan Mire. Built with React & Tailwind CSS.
        </p>
      </div>
    </section>
  );
}
