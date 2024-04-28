import { createClient } from "@supabase/supabase-js";
import Store from "../Interfaces/Store";
import Wine from "../Interfaces/Wine";
import { Database } from "./types";

function createStaticPropsClient() {
  const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  return supabase;
}

export async function getStores(): Promise<Store[]> {
  const client = createStaticPropsClient();
  const { data } = await client.from("stores").select("id, name").order("name");
  return data;
}

export async function getWinesForStore(storeId: any): Promise<Wine[]> {
  const client = createStaticPropsClient();
  const ratingLimit = 3.7;
  const { data } = await client
    .from("stocks")
    .select("...wines!inner(*), count")
    .eq("store_id", storeId)
    .gte("wines.rating", ratingLimit)
    .order("wines(rating)", { ascending: false });
  return data;
}

export async function getStockForStore(
  storeId: any
): Promise<Map<number, number>> {
  const client = createStaticPropsClient();
  const { data } = await client
    .from("stocks")
    .select("wine_id, count")
    .eq("store_id", storeId);
  const stock: Map<number, number> = new Map();

  return stock;
}
