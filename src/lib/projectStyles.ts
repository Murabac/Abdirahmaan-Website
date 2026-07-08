export function getProjectGradientClass(color: string) {
  const colors: Record<string, string> = {
    primary: 'from-primary/20 to-primary/5',
    secondary: 'from-secondary/20 to-secondary/5',
    accent: 'from-accent/20 to-accent/5',
  };
  return colors[color] || 'from-primary/20 to-primary/5';
}

export function getProjectButtonClass(color: string) {
  const colors: Record<string, string> = {
    primary: 'bg-primary hover:bg-primary/90',
    secondary: 'bg-secondary hover:bg-secondary/90',
    accent: 'bg-accent hover:bg-accent/90',
  };
  return colors[color] || 'bg-primary hover:bg-primary/90';
}
