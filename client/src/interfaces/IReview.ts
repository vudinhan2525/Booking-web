export interface IReview {
  id: number;
  rating: number;
  summary: string;
  dateRate: string;

  hotelId: number;
  userId: number;
  imageUrls: string[];
  user: {
    id: number;
    firstName: string;
    lastName: string;
    isActive: boolean;
  };
}
