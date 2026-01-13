export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  thumbnail: string;
  enrolledCount: number;
  rating: number;
  modules: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  avatar: string;
}

export interface Enrollment {
  courseId: string;
  progress: number;
  enrolledAt: string;
}

export const mockCourses: Course[] = [
  {
    id: '1',
    title: 'Introduction to Web Development',
    description: 'Learn the fundamentals of HTML, CSS, and JavaScript to build modern websites from scratch. Perfect for absolute beginners.',
    instructor: 'Sarah Johnson',
    duration: '8 weeks',
    level: 'Beginner',
    category: 'Development',
    thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=250&fit=crop',
    enrolledCount: 1234,
    rating: 4.8,
    modules: 12,
  },
  {
    id: '2',
    title: 'Advanced React Patterns',
    description: 'Master advanced React concepts including hooks, context, performance optimization, and architectural patterns.',
    instructor: 'Michael Chen',
    duration: '6 weeks',
    level: 'Advanced',
    category: 'Development',
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop',
    enrolledCount: 856,
    rating: 4.9,
    modules: 10,
  },
  {
    id: '3',
    title: 'UI/UX Design Fundamentals',
    description: 'Discover the principles of user-centered design and create beautiful, intuitive interfaces that users love.',
    instructor: 'Emily Rodriguez',
    duration: '10 weeks',
    level: 'Beginner',
    category: 'Design',
    thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop',
    enrolledCount: 2156,
    rating: 4.7,
    modules: 15,
  },
  {
    id: '4',
    title: 'Data Science with Python',
    description: 'Explore data analysis, visualization, and machine learning using Python and popular libraries like Pandas and Scikit-learn.',
    instructor: 'David Park',
    duration: '12 weeks',
    level: 'Intermediate',
    category: 'Data Science',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop',
    enrolledCount: 1567,
    rating: 4.6,
    modules: 18,
  },
  {
    id: '5',
    title: 'Digital Marketing Mastery',
    description: 'Learn SEO, social media marketing, content strategy, and analytics to grow any business online.',
    instructor: 'Lisa Thompson',
    duration: '8 weeks',
    level: 'Intermediate',
    category: 'Marketing',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop',
    enrolledCount: 923,
    rating: 4.5,
    modules: 14,
  },
  {
    id: '6',
    title: 'Cloud Architecture Essentials',
    description: 'Master AWS, Azure, and cloud infrastructure design patterns for scalable, resilient applications.',
    instructor: 'James Wilson',
    duration: '10 weeks',
    level: 'Advanced',
    category: 'Development',
    thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=250&fit=crop',
    enrolledCount: 678,
    rating: 4.8,
    modules: 16,
  },
];

export const mockUsers: User[] = [
  {
    id: 'user1',
    name: 'Alex Turner',
    email: 'alex@example.com',
    role: 'user',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
  },
  {
    id: 'admin1',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
  },
];

export const mockEnrollments: Enrollment[] = [
  { courseId: '1', progress: 75, enrolledAt: '2024-01-15' },
  { courseId: '3', progress: 30, enrolledAt: '2024-02-01' },
  { courseId: '4', progress: 10, enrolledAt: '2024-02-10' },
];
