
import { Hospital, Doctor } from './types';

export const DOCTORS: Doctor[] = [
  {
    id: 'd1',
    name: 'Dr. Amaka Okafor',
    title: 'Chief Cardiologist',
    specialty: 'Cardiology',
    experience: 15,
    rating: 4.9,
    reviewCount: 124,
    imageUrl: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=400',
    isVerified: true
  },
  {
    id: 'd2',
    name: 'Dr. Babatunde Lawal',
    title: 'Senior Neurosurgeon',
    specialty: 'Neurology',
    experience: 22,
    rating: 5.0,
    reviewCount: 89,
    imageUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400',
    isVerified: true
  },
  {
    id: 'd3',
    name: 'Dr. Fatima Yusuf',
    title: 'Pediatric Specialist',
    specialty: 'Pediatrics',
    experience: 12,
    rating: 4.8,
    reviewCount: 156,
    imageUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400',
    isVerified: true
  }
];

export const HOSPITALS: Hospital[] = [
  {
    id: '1',
    name: 'Reddington Hospital',
    phone: '+234 1 271 5341',
    type: 'Private',
    category: 'Specialist',
    isVerified: true,
    location: {
      lat: 6.4449,
      lng: 3.4245,
      address: '12 Idowu Martins St, Victoria Island, Lagos'
    },
    rating: 4.8,
    reviewCount: 342,
    specialties: ['Cardiology', 'Emergency Care', 'Surgery'],
    facilities: ['24/7 ICU', 'Oxygen Plant', 'Advanced Radiology', 'Pediatric Wing', 'Blood Bank'],
    imageUrl: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&q=80&w=800',
    avgMetrics: {
      careQuality: 4.9,
      waitTime: 15,
      estimatedCost: 75000
    },
    doctors: [DOCTORS[0], DOCTORS[1]],
    reviews: [
      {
        id: 'r1',
        userName: 'Adebayo O.',
        date: '2024-03-15',
        comment: 'Excellent service, very fast response in the ER.',
        rating: 5,
        metrics: { careQuality: 5, waitTime: 10, estimatedCost: 80000 }
      },
      {
        id: 'r2',
        userName: 'Chidi E.',
        date: '2024-02-10',
        comment: 'The costs are high but the care quality is unparalleled in Lagos.',
        rating: 4,
        metrics: { careQuality: 5, waitTime: 20, estimatedCost: 95000 }
      }
    ]
  },
  {
    id: '2',
    name: 'Lagos University Teaching Hospital (LUTH)',
    phone: '+234 1 454 6331',
    type: 'Public',
    category: 'General',
    isVerified: true,
    location: {
      lat: 6.5186,
      lng: 3.3592,
      address: 'Ishaga Road, Idi-Araba, Surulere, Lagos'
    },
    rating: 3.9,
    reviewCount: 1205,
    specialties: ['Pediatrics', 'Obstetrics', 'General Medicine'],
    facilities: ['Medical School', 'Neonatal ICU', 'Dental School', 'Infectious Disease Center'],
    imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800',
    avgMetrics: {
      careQuality: 4.1,
      waitTime: 120,
      estimatedCost: 15000
    },
    reviews: []
  },
  {
    id: '3',
    name: 'Evercare Hospital Lekki',
    phone: '+234 813 985 0710',
    type: 'Private',
    category: 'Specialist',
    isVerified: true,
    location: {
      lat: 6.4431,
      lng: 3.4862,
      address: '1 Admiralty Way, Lekki Phase 1, Lagos'
    },
    rating: 4.7,
    reviewCount: 215,
    specialties: ['Neurology', 'Oncology', 'Emergency Care'],
    facilities: ['Cath Lab', 'MRI/CT Scan', 'Chemotherapy Suite', 'Telemedicine'],
    imageUrl: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800',
    avgMetrics: {
      careQuality: 4.8,
      waitTime: 25,
      estimatedCost: 95000
    },
    reviews: []
  },
  {
    id: '4',
    name: 'St. Nicholas Hospital',
    phone: '+234 1 270 2931',
    type: 'Private',
    category: 'Specialist',
    isVerified: true,
    location: {
      lat: 6.4519,
      lng: 3.3958,
      address: '57 Campbell Street, Lagos Island, Lagos'
    },
    rating: 4.5,
    reviewCount: 560,
    specialties: ['Nephrology', 'Surgery', 'Dialysis'],
    facilities: ['Transplant Unit', 'Dialysis Center', 'Intensive Care Unit', 'Executive Clinic'],
    imageUrl: 'https://images.unsplash.com/photo-1504439468489-c8920d796a29?auto=format&fit=crop&q=80&w=800',
    avgMetrics: {
      careQuality: 4.6,
      waitTime: 40,
      estimatedCost: 60000
    },
    reviews: []
  },
  {
    id: '5',
    name: 'National Hospital Abuja',
    phone: '+234 9 234 2667',
    type: 'Public',
    category: 'General',
    isVerified: true,
    location: {
      lat: 9.0435,
      lng: 7.4725,
      address: 'Plot 265, Independence Avenue, Central Business District, Abuja'
    },
    rating: 4.0,
    reviewCount: 890,
    specialties: ['Trauma', 'Radiology', 'General Surgery'],
    facilities: ['Radiotherapy Center', 'Trauma Center', 'Helipad', 'Oxygen Plant'],
    imageUrl: 'https://images.unsplash.com/photo-1538108197003-596dc762696e?auto=format&fit=crop&q=80&w=800',
    avgMetrics: {
      careQuality: 4.2,
      waitTime: 90,
      estimatedCost: 20000
    },
    reviews: []
  }
];
