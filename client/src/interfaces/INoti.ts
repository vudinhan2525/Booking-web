export interface INoti {
  id: number;
  content: string;
  createdAt: string;
  toAirport: string;
  header: string;
  link: string;
  image: string | null;
  isGlobal: boolean;
  isRead: boolean;
  userId: number | null;
}
