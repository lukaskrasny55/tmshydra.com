
export enum AppView {
  HOME = 'home',
  ABOUT = 'about',
  SERVICES = 'services',
  PROJECTS = 'projects',
  TECH = 'tech',
  CONTACT = 'contact'
}

export interface BookingData {
  date: string;
  time: string;
  name: string;
  phone: string;
  email: string;
  address: string;
}

export interface CalculationResult {
  minPrice: number;
  maxPrice: number;
}
