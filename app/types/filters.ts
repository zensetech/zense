export interface FilterOption {
  value: string;
  label: string;
}

export interface PriceRange {
  min: number;
  max: number;
}

export const CARE_TYPES: FilterOption[] = [
  { value: 'nursing-home', label: 'Nursing Home' },
  { value: 'community-living', label: 'Community Living' },
  { value: 'old-age-home', label: 'Old Age Home' },
  { value: 'attendant', label: 'Attendant' },
  { value: 'nurse', label: 'Nurse' },
  { value: 'physiotherapist', label: 'Physiotherapist' }
];

export const SPECIALIZATIONS: FilterOption[] = [
  { value: 'dementia', label: 'Dementia Care' },
  { value: 'alzheimers', label: 'Alzheimer\'s Care' },
  { value: 'palliative', label: 'Palliative Care' },
  { value: 'rehabilitation', label: 'Rehabilitation' },
  { value: 'post-surgery', label: 'Post-Surgery Care' },
  { value: 'diabetes', label: 'Diabetes Management' }
];

export const LANGUAGES: FilterOption[] = [
  { value: 'english', label: 'English' },
  { value: 'spanish', label: 'Spanish' },
  { value: 'mandarin', label: 'Mandarin' },
  { value: 'hindi', label: 'Hindi' },
  { value: 'french', label: 'French' }
];

export const AMENITIES: FilterOption[] = [
  { value: 'medical-center', label: 'Medical Center' },
  { value: 'physical-therapy', label: 'Physical Therapy' },
  { value: 'garden', label: 'Garden/Outdoor Space' },
  { value: 'pool', label: 'Swimming Pool' },
  { value: 'gym', label: 'Fitness Center' },
  { value: 'activities', label: 'Activity Center' }
];