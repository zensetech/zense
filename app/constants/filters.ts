export const AVAILABILITY_OPTIONS = [
  { id: 'weekdays', value: 'weekdays', label: 'Weekdays' },
  { id: 'weekends', value: 'weekends', label: 'Weekends' },
  { id: '24x7', value: '24x7', label: '24x7' },
  { id: 'morning', value: 'morning', label: 'Morning Shift' },
  { id: 'evening', value: 'evening', label: 'Evening Shift' },
  { id: 'night', value: 'night', label: 'Night Shift' }
] as const;

export const RATING_OPTIONS = [1, 2, 3, 4, 5] as const;

export const EXPERIENCE_RANGE = {
  min: 0,
  max: 30,
  step: 1
} as const;

export const PRICE_RANGE = {
  min: 0,
  max: 1000,
  step: 50
} as const;