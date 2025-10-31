// In your types/adventure.ts file
export interface Adventure {
  id: string;
  title: string;
  location: string;
  price: string;
  image: string;
  description: string;
  slots: Array<string>;
  // ... other fields
}
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}