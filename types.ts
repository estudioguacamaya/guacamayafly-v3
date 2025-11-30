export interface Hotel {
  id: number;
  name: string;
  price: number;
  rating: number;
  reviews: number;
  location: string;
  address?: string;
  img: string;
  image?: string;
  description?: string;
  mapImage?: string;
  galleryImages?: string[];
  distance?: number;
  sponsored?: boolean;
  faq?: Array<{ q: string; a: string }>;
  reviewsData?: Array<{ rating: number; title: string; text: string; author: string; date: string }>;
  priceOld?: string;
  priceNew?: string;
  perNight?: string;
  discount?: string;
  vip?: boolean;
}

export interface Flight {
  airline: string;
  stops: string;
  from: string;
  to: string;
  fromIata: string;
  toIata: string;
  time1: string;
  time2: string;
  price: string;
}

export interface Airport {
  name: string;
  city: string;
  country: string;
  iata: string;
  searchTerms: string;
}

export interface BookingDetails {
  hotelId: number;
  hotelName: string;
  hotelImage: string;
  hotelLocation: string;
  price: number;
  checkin: string;
  checkout: string;
  adults: number;
  children: number;
}
