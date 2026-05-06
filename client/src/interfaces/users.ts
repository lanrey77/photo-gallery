export interface Image {
  id: string;
  url: string;
}

export interface User {
  id: string;
  name: string;
  location: "Suffolk" | "Norfolk" | "Epping";
  images: Image[];
}