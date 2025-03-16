import { unstable_cache } from "next/cache";

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

async function fetchUsers(): Promise<User[]> {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");

  if (!res.ok) {
    throw new Error("Failed to fetch users");
  }

  return res.json();
}

export const getUsers = unstable_cache(async () => {
  return await fetchUsers();
});

export const getFeaturedUsers = unstable_cache(async (count: number = 6) => {
  const allUsers = await getUsers();
  return allUsers.slice(0, count);
});
