import { Category, Post } from "@/types/collection";
import { Directus } from "@directus/sdk";
import { Locale } from "./get-dictionary";

export const client = new Directus(process.env.NEXT_PUBLIC_API_URL as string, {
  auth: { staticToken: process.env.ADMIN_TOKEN as string },
});

// do authenticated requests

export const getData = async (collection: string, query: object) => {
  try {
    const fetchedData = await client.items(collection).readByQuery(query);

    return fetchedData;
  } catch (error) {
    console.log(error);
    throw new Error(`Error Fetching ${collection}`);
  }
};
