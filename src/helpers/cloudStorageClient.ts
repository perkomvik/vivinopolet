import Store from "../Interfaces/Store";
import fs from "fs/promises";
import path from "path";
import StoreWithStock from "../Interfaces/StoreWithStock";
import { Storage } from "@google-cloud/storage";
import Product from "../Interfaces/Product";

export const getStores = async (local = false): Promise<Store[]> => {
  if (local) {
    const storesFilePath = path.join(process.cwd(), "data/stores.json");
    const storesFile = await fs.readFile(storesFilePath);
    const storeObj = JSON.parse(storesFile.toString());
    return storeObj;
  }
  const storage = new Storage();
  const file = await storage.bucket("vivinopolet-data").file("stores.json").download();
  let stores: Store[] = JSON.parse(file.toString());
  stores = stores.sort((a, b) => new Intl.Collator('no').compare(a.name, b.name));
  return stores;
}

export const getStoresWithStock = async (): Promise<StoreWithStock[]> => {
  const storage = new Storage();
  const file = await storage.bucket("vivinopolet-data").file("stores_with_stock.json").download();
  const storesWithStock: StoreWithStock[] = JSON.parse(file.toString());
  return storesWithStock;
}

export const getProducts = async (wineType: string): Promise<Record<string, Product>> => {
  const storage = new Storage();
  const file = await storage.bucket("vivinopolet-data").file(wineType + ".json").download();
  const products: Record<string, Product> = JSON.parse(file.toString());
  return products;
}

