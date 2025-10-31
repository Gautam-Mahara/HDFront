export interface Slot {
  date: string;
  time: string;
  availableSeats: number;
  displayTime: string;
}

export interface Adventure {
  id: string;
  title: string;
  location: string;
  price: number;
  image: string;
  description: string;
  slots: Slot[]; // ✅ Correctly typed
  // ... other fields
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}
