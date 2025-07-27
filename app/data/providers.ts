import { Provider } from '@/app/types/provider';

export const mockProviders: Provider[] = [
  {
    id: '1',
    type: 'home',
    name: 'Sunshine Care Home',
    description: 'Professional nursing home with 24/7 medical supervision and specialized care services.',
    location: 'San Francisco, CA',
    homeType: 'nursing-home',
    amenities: ['Medical Center', 'Physical Therapy', 'Garden', 'Recreation Room'],
    capacity: 100,
    rooms: {
      single: 30,
      double: 25,
      shared: 10
    },
    imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80',
    photos: [
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80',
    ],
    rating: 4.8,
    pricing: {
      monthly: 6000
    },
    createdAt: '2024-03-15T08:00:00.000Z'
  },
  {
    id: '2',
    type: 'home',
    name: 'Golden Years Community',
    description: 'Vibrant community living space for active seniors.',
    location: 'Los Angeles, CA',
    homeType: 'community-living',
    amenities: ['Pool', 'Fitness Center', 'Community Kitchen', 'Library'],
    capacity: 150,
    rooms: {
      single: 50,
      double: 40,
      shared: 10
    },
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80',
    photos: [
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80',
    ],
    rating: 4.6,
    pricing: {
      monthly: 4500
    },
    createdAt: '2024-03-14T10:30:00.000Z'
  },
  {
    id: '3',
    type: 'at-home-care',
    name: 'Sarah Johnson',
    description: 'Experienced registered nurse specializing in elderly care.',
    location: 'San Diego, CA',
    careType: 'nurse',
    experience: 10,
    qualifications: ['RN', 'BSN', 'Geriatric Care Certification'],
    languages: ['English', 'Spanish'],
    availability: {
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      shifts: ['Morning', 'Afternoon']
    },
    imageUrl: 'https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&q=80',
    photos: [
      'https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&q=80',
    ],
    rating: 4.9,
    pricing: {
      hourly: 55
    },
    createdAt: '2024-03-13T14:15:00.000Z'
  },
  {
    id: '4',
    type: 'at-home-care',
    name: 'John Smith',
    description: 'Certified physiotherapist with expertise in elderly rehabilitation.',
    location: 'San Francisco, CA',
    careType: 'physiotherapist',
    experience: 8,
    qualifications: ['DPT', 'Geriatric Physical Therapy Certification'],
    languages: ['English'],
    availability: {
      days: ['Monday', 'Wednesday', 'Friday'],
      shifts: ['Morning', 'Afternoon', 'Evening']
    },
    imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80',
    photos: [
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80',
    ],
    rating: 4.7,
    pricing: {
      hourly: 75
    },
    createdAt: '2024-03-12T09:00:00.000Z'
  }
];