import { LucideIcon } from 'lucide-react';

export type SidebarItem = {
  title: string;
  icon: LucideIcon;
  href?: string;
  color?: string;
  child?: {
    title: string;
    href: string;
  }[];
}