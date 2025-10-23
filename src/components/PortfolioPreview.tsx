import {
  ClassicLayout,
  ModernLayout,
  MinimalLayout,
  CreativeLayout,
  ProfessionalLayout,
  ElegantLayout,
  TechLayout,
  CompactLayout,
  ArtisticLayout,
  TimelineLayout,
  GridLayout,
  LayoutType,
} from './portfolio-layouts';

interface PortfolioPreviewProps {
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
  layout?: LayoutType;
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

const PortfolioPreview = ({ data, photoUrl, layout = 'classic', visibilitySettings }: PortfolioPreviewProps) => {
  const layouts = {
    classic: ClassicLayout,
    modern: ModernLayout,
    minimal: MinimalLayout,
    creative: CreativeLayout,
    professional: ProfessionalLayout,
    elegant: ElegantLayout,
    tech: TechLayout,
    compact: CompactLayout,
    artistic: ArtisticLayout,
    timeline: TimelineLayout,
    grid: GridLayout,
  };

  const SelectedLayout = layouts[layout];

  return <SelectedLayout data={data} photoUrl={photoUrl} visibilitySettings={visibilitySettings} />;
};

export default PortfolioPreview;