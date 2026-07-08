export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
};

export type AdminUser = {
  id: string;
  email: string;
  display_name: string | null;
  role: string;
  created_at: string;
};

export type ProjectColor = 'primary' | 'secondary' | 'accent';

export type Project = {
  id: string;
  title: string;
  description: string;
  image_url: string;
  tags: string[];
  category: string;
  color: ProjectColor;
  github_url: string;
  demo_url: string;
  featured: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type ProjectInput = Omit<Project, 'id' | 'created_at' | 'updated_at'>;
