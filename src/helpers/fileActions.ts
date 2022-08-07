import path from "path";
import fs from "fs/promises"
import Product from "../Interfaces/Product";
import Store from "../Interfaces/Store";
import Constants from "./constants";
import StoreWithStock from "../Interfaces/StoreWithStock";

const storesFilePath = path.join(process.cwd(), "data/stores.json");
const storesWithStockFilePath = path.join(process.cwd(), "data/stores_with_stock.json");

export const saveStoresToFile = async (stores) => {
  await fs.writeFile(storesFilePath, JSON.stringify(stores));
}

export const saveStoreStockToFile = async (storesWithStock) => {
  await fs.writeFile(storesWithStockFilePath, JSON.stringify(storesWithStock));
}

export const saveProductsToFile = async (wineType: string, products: Record<string, Product>) => {
  await fs.writeFile(`data/${wineType}.json`, JSON.stringify(products));
}

export const readStoresFromFile = async (): Promise<Store[]> => {
  const storesFile = await fs.readFile(storesFilePath);
  const storeObj = JSON.parse(storesFile.toString());
  return storeObj;
}

export const readProductsFromFile = async (): Promise<Record<string, Record<string, Product>>> => {
  let products: Record<string, Record<string, Product>> = {}
  for (const wineType of Constants.wineTypes) {
    const productsFilePath = path.join(process.cwd(), `data/${wineType}.json`);
    const productsFile = await fs.readFile(productsFilePath);
    const productsObj: Record<string, Product> = JSON.parse(productsFile.toString());

    products[wineType] = { ...productsObj }
  }
  return products
}

export const readStoreStockFromFile = async (): Promise<StoreWithStock[]> => {
  const storeStockFilePath = path.join(storesWithStockFilePath);
  const storeStockFile = await fs.readFile(storeStockFilePath);
  const storeStock = JSON.parse(storeStockFile.toString());
  return storeStock;
}