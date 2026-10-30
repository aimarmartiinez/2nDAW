// API Types for PadelHub

export interface User {
  id: number;
  name: string;
  email: string;
  surname: string;
  username: string;
  phone?: string;
  role: 'user' | 'admin';
  club_id?: number;
  email_verified_at?: string;
  created_at: string;
  updated_at: string;
}

export interface Club {
  id: number;
  name: string;
  address: string;
  city: string;
  postcode: string;
  phone: string;
  opening_time: string;
  closing_time: string;
  email: string;
  state: 'active' | 'inactive';
  created_at: string;
  updated_at: string;
  courts?: Court[];
  images?: string[];
  location?: string; // Added for mock
  has_indoor?: boolean; // Added for mock
  courts_count?: number; // Added for mock
}

export interface Court {
  id: number;
  club_id: number;
  name: string;
  type: string;
  capacity: number;
  price_per_hour: number;
  state: 'available' | 'maintenance' | 'booked';
  created_at: string;
  updated_at: string;
  club?: Club;
  is_indoor?: boolean; // Added for mock
  price?: number; // Added for mock
}

export interface Booking {
  id: number;
  user_id: number;
  court_id: number;
  date: string;
  start_time: string;
  end_time: string;
  total_price: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  created_at: string;
  updated_at: string;
  user?: User;
  court?: Court;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  surname: string;
  username: string;
  email: string;
  password: string;
  password_confirmation: string;
  phone?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface ClubsResponse {
  data: Club[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export interface AvailableCourtsRequest {
  club_id: number;
  date: string;
  start_time: string;
  duration: number;
}

export interface AvailableHoursRequest {
  court_id: number;
  date: string;
}

export interface CreateBookingRequest {
  court_id: number;
  date: string;
  start_time: string;
  end_time: string;
}

export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
}
