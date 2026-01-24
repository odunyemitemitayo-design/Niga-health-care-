
export interface Location {
  lat: number;
  lng: number;
  address: string;
}

export interface ReviewMetrics {
  careQuality: number; // 1-5
  waitTime: number; // in minutes
  estimatedCost: number; // in Naira
}

export interface Review {
  id: string;
  userName: string;
  date: string;
  comment: string;
  rating: number;
  metrics: ReviewMetrics;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  title: string;
  experience: number; // years
  rating: number;
  reviewCount: number;
  imageUrl: string;
  isVerified: boolean;
}

export interface Hospital {
  id: string;
  name: string;
  phone: string;
  type: 'Public' | 'Private';
  category: 'General' | 'Specialist' | 'Emergency';
  isVerified: boolean;
  location: Location;
  rating: number;
  reviewCount: number;
  specialties: string[];
  facilities: string[];
  imageUrl: string;
  avgMetrics: ReviewMetrics;
  reviews: Review[];
  doctors?: Doctor[];
  distance?: number; // Distance in km from user
}
