import { User } from "../types/user.js";

const names: string[] = [
  "John Doe",
  "Jane Smith",
  "Michael Johnson",
  "Emily Davis",
  "David Wilson",
  "Sophia Brown",
  "Daniel Taylor",
  "Olivia Anderson",
  "James Thomas",
  "Isabella Moore"
];

const locations: string[] = [
  "Suffolk",
  "Norfolk",
  "Epping"
];

export const users: User[] = names.map((name, index) => {
  const id = (index + 1).toString();

  return {
    id,
    name,
    location: locations[index % locations.length],
    images: Array.from({ length: 5 + (index % 3) }, (_, imgIndex) => ({
      id: `${id}-${imgIndex + 1}`,
      url: `https://picsum.photos/id/${100 + index * 10 + imgIndex}/400`
    }))
  };
});