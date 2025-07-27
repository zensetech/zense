export interface Author {
  name: string;
  image: string;
  bio: string; // Add bio field
}

export interface BlogPost {
  id: string; // Add id
  slug: string; // Add slug
  title: string;
  content: string;
  excerpt: string;
  coverImage: string;
  categories: string[]; // Add categories array for compatibility with existing data
  category: string; // Add category for compatibility with existing data
  author: Author; // Use Author interface
  date: string; // Add date field
  readingTime: number; // Add readingTime
  commentCount: number; // Add commentCount
  status: 'Published' | 'Draft' | 'unpublished'; // Added status field, including unpublished
  views?: number; // Add optional views field
}
