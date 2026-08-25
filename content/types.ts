export interface LinkItem {
  label: string;
  href: string;
}

export interface TimelineEntry {
  period: string;
  desc: string;
}

export interface Profile {
  photo: string;
  name: string;
  title: string;
  oneLiner: string;
  email: string;
  links: LinkItem[];
  education: TimelineEntry[];
  experience: TimelineEntry[];
  projects: TimelineEntry[];
  training: TimelineEntry[];
  certifications: string[];
}
