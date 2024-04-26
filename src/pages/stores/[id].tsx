import Container from "@mui/material/Container";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Slider from "@mui/material/Slider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import fs from "fs/promises";
import path from "path";
import { useState } from "react";
import Product from "../../Interfaces/Product";
import Store from "../../Interfaces/Store";
import StoreWithStock from "../../Interfaces/StoreWithStock";
import ProductCard from "../../components/productCard";
import SearchBar from "../../components/searchBar";
import WineTypeSelector from "../../components/wineTypeSelector";
import {
  getProducts,
  getStores,
  getStoresWithStock,
} from "../../helpers/cloudStorageClient";
import Constants from "../../helpers/constants";

const STEP_SIZE = 10;
const MIN_PRICE = 100;
const MAX_PRICE = 800;

const StorePage = (props: {
  stores: Store[];
  storesWithStock: StoreWithStock[];
  products: Record<string, Product[]>;
  id: number;
  key: number;
}) => {
  const [wineType, setWineType] = useState<string>("rødvin");
  const [price, setPrice] = useState<number>(Infinity);
  const [visibleProducts, setVisibleProducts] = useState<Product[]>(
    props.products["rødvin"]
  );

  const handleWineTypeChange = (newWineType: string) => {
    setWineType(newWineType);

    const updatedProducts =
      props.products[newWineType]?.filter(
        (product) => product.price.value < price
      ) ?? [];
    setVisibleProducts(updatedProducts);
  };

  const handleSliderCommit = (event: any, newValue: number) => {
    if (newValue > MAX_PRICE) {
      newValue = Infinity;
    }
    setPrice(newValue);

    const updatedProducts = props.products[wineType].filter(
      (product) => product.price.value < newValue
    );
    setVisibleProducts(updatedProducts);
  };

  const storeWithStock = props.storesWithStock.find((s) => s.id == props.id);
  const productCards = visibleProducts.map((product) => (
    <ListItem
      sx={{ justifyContent: "center" }}
      key={product.code}
      disableGutters
    >
      <ProductCard product={product} />
    </ListItem>
  ));

  return (
    <Container>
      <SearchBar stores={props.stores} currentStoreId={props.id} />
      <div style={{ paddingTop: "6.5em" }}>
        <Typography variant="h5" align="center">
          {storeWithStock.name}
        </Typography>
        <WineTypeSelector
          wineType={wineType}
          wineTypes={Constants.wineTypes}
          onChange={handleWineTypeChange}
        />
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
          sx={{
            paddingTop: "2.2em",
            paddingRight: "2em",
            width: "100%",
            maxWidth: "600px",
            margin: "0 auto",
          }}
        >
          <Typography fontSize="16px" id="discrete-slider">
            Makspris
          </Typography>
          <Slider
            aria-labelledby="discrete-slider"
            valueLabelDisplay="on"
            valueLabelFormat={(x) =>
              x > MAX_PRICE ? "kr " + MAX_PRICE + "+" : "kr " + x
            }
            defaultValue={Infinity}
            step={STEP_SIZE}
            min={MIN_PRICE}
            max={MAX_PRICE + 10}
            onChangeCommitted={handleSliderCommit}
          />
        </Stack>
      </div>
      <List>{productCards}</List>
    </Container>
  );
};

const storesFilePath = path.join(process.cwd(), "data/stores.json");
const storesWithStockFilePath = path.join(
  process.cwd(),
  "data/stores_with_stock.json"
);

const saveStoresToFile = async (stores) => {
  await fs.writeFile(storesFilePath, JSON.stringify(stores));
};

const saveStoreStockToFile = async (storesWithStock) => {
  await fs.writeFile(storesWithStockFilePath, JSON.stringify(storesWithStock));
};

const saveProductsToFile = async (
  wineType: string,
  products: Record<string, Product>
) => {
  await fs.writeFile(`data/${wineType}.json`, JSON.stringify(products));
};

const readStoresFromFile = async (): Promise<Store[]> => {
  const storesFile = await fs.readFile(storesFilePath);
  const storeObj = JSON.parse(storesFile.toString());
  return storeObj;
};

const readProductsFromFile = async (): Promise<
  Record<string, Record<string, Product>>
> => {
  let products: Record<string, Record<string, Product>> = {};
  for (const wineType of Constants.wineTypes) {
    const productsFilePath = path.join(process.cwd(), `data/${wineType}.json`);
    const productsFile = await fs.readFile(productsFilePath);
    const productsObj: Record<string, Product> = JSON.parse(
      productsFile.toString()
    );

    products[wineType] = { ...productsObj };
  }
  return products;
};

const readStoreStockFromFile = async (): Promise<StoreWithStock[]> => {
  const storeStockFilePath = path.join(storesWithStockFilePath);
  const storeStockFile = await fs.readFile(storeStockFilePath);
  const storeStock = JSON.parse(storeStockFile.toString());
  return storeStock;
};

export async function getStaticPaths() {
  const stores: Store[] = await getStores();
  const storesWithStock: StoreWithStock[] = await getStoresWithStock();
  await saveStoresToFile(stores);
  await saveStoreStockToFile(storesWithStock);
  for (const wineType of Constants.wineTypes) {
    const products = await getProducts(wineType);
    await saveProductsToFile(wineType, products);
  }

  const paths = stores.map((store) => ({
    params: {
      id: store.id,
    },
  }));
  return {
    paths: paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const stores = await readStoresFromFile();
  const products = await readProductsFromFile();
  const storeStock = await readStoreStockFromFile();
  let productsInStock: Record<string, Product[]> = {};
  const storeWithStock = storeStock.find((s) => s.id == context.params.id);
  Object.entries(storeWithStock.stock).forEach(([wine_type, items]) => {
    let stock = [];
    items.forEach((item) => {
      if (products[wine_type][item.code]) {
        products[wine_type][item.code]["stock"] = item.stock;
        stock.push(products[wine_type][item.code]);
      }
    });
    stock.sort((a, b) => b.score - a.score);
    productsInStock[wine_type] = stock;
  });
  return {
    props: {
      stores: stores,
      products: productsInStock,
      storesWithStock: storeStock,
      id: context.params.id,
      key: context.params.id,
    },
  };
}

export default StorePage;
