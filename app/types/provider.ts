export type HomeType = 'nursing-home' | 'community-living' | 'old-age-home';
export type AtHomeCareType = 'attendant' | 'nurse' | 'physiotherapist';
export type ProviderType = 'home' | 'at-home-care';

export interface BaseProvider {
  id: string;
  name: string;
  description: string;
  location: string;
  imageUrl: string;
  rating?: number;
  photos: string[];
  pricing: {
    hourly?: number;
    daily?: number;
    monthly?: number;
  };
  createdAt: string;
  updatedAt?: string;
}

export interface Home extends BaseProvider {
  type: 'home';
  homeType: HomeType;
  amenities: string[];
  capacity: number;
  rooms: {
    single: number;
    double: number;
    shared: number;
  };
}

export interface AtHomeCare extends BaseProvider {
  type: 'at-home-care';
  careType: AtHomeCareType;
  experience: number;
  qualifications: string[];
  languages: string[];
  availability: {
    days: string[];
    shifts: string[];
  };
}

export type Provider = Home | AtHomeCare;