export { default as ClassicLayout } from './ClassicLayout';
export { default as ModernLayout } from './ModernLayout';
export { default as MinimalLayout } from './MinimalLayout';
export { default as CreativeLayout } from './CreativeLayout';
export { default as ProfessionalLayout } from './ProfessionalLayout';
export { default as ElegantLayout } from './ElegantLayout';
export { default as TechLayout } from './TechLayout';
export { default as CompactLayout } from './CompactLayout';
export { default as ArtisticLayout } from './ArtisticLayout';
export { default as TimelineLayout } from './TimelineLayout';
export { default as GridLayout } from './GridLayout';

export type LayoutType = 
  | 'classic'
  | 'modern'
  | 'minimal'
  | 'creative'
  | 'professional'
  | 'elegant'
  | 'tech'
  | 'compact'
  | 'artistic'
  | 'timeline'
  | 'grid';

export interface LayoutProps {
  data: {
    fullName: string;
    title: string;
    bio: string;
    skills: string;
    education?: string;
    projects?: string;
    contactEmail: string;
    contactPhone: string;
    dateOfBirth?: string;
    linkedinUrl?: string;
    address?: string;
    careerObjective?: string;
    achievements?: string;
  };
  photoUrl: string;
  visibilitySettings?: {
    profilePhoto?: boolean;
    fullName?: boolean;
    title?: boolean;
    bio?: boolean;
    skills?: boolean;
    education?: boolean;
    projects?: boolean;
    contactEmail?: boolean;
    contactPhone?: boolean;
    dateOfBirth?: boolean;
    linkedinUrl?: boolean;
    address?: boolean;
    careerObjective?: boolean;
    achievements?: boolean;
  };
}

export const layoutOptions = [
  { value: 'classic', label: 'Classic', description: 'Traditional centered layout' },
  { value: 'modern', label: 'Modern', description: 'Two-column sidebar design' },
  { value: 'minimal', label: 'Minimal', description: 'Clean and simple' },
  { value: 'creative', label: 'Creative', description: 'Bold with gradients' },
  { value: 'professional', label: 'Professional', description: 'Corporate style' },
  { value: 'elegant', label: 'Elegant', description: 'Sophisticated serif fonts' },
  { value: 'tech', label: 'Tech', description: 'Developer-focused code style' },
  { value: 'compact', label: 'Compact', description: 'Dense information layout' },
  { value: 'artistic', label: 'Artistic', description: 'Asymmetric and creative' },
  { value: 'timeline', label: 'Timeline', description: 'Vertical timeline style' },
  { value: 'grid', label: 'Grid', description: 'Card-based grid layout' },
] as const;
