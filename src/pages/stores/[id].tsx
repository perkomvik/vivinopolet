import SearchBar from "../../components/searchBar";
import getStores from "../../helpers/getStores";
import path from "path";
import fs from "fs/promises"
import Store from "../../Interfaces/Store";
import Product from "../../Interfaces/Product";
import React, { useState } from "react";
import ProductCard from "../../components/productCard";
import StoreWithStock from "../../Interfaces/StoreWithStock";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import Grid from "@material-ui/core/Grid";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import ToggleButton from "@material-ui/lab/ToggleButton";
import WineTypeSelector from "../../components/wineTypeSelector";

const STEP_SIZE = 10;
const MIN_PRICE = 50;
const MAX_PRICE = 300;

const wineTypes = ["rødvin", "hvitvin"];

const useStyles = makeStyles(() =>
  createStyles({
    listItem: {
      justifyContent: "center"
    },
    slider: {
      maxWidth: "95%",
    }
  })
);

const storePage = (props: {
  stores: Store[],
  storesWithStock: StoreWithStock[],
  products: Record<string, Product[]>,
  id: number
  key: number
}) => {
  const classes = useStyles();
  const [wineType, setWineType] = useState<string>("rødvin");
  const [price, setPrice] = useState<number>(Infinity);
  const [visibleProducts, setVisibleProducts] = useState<Product[]>(props.products["rødvin"])

  const handleWineTypeChange = (newWineType: string) => {
    setWineType(newWineType);
    setVisibleProducts(props.products[newWineType]);
    setPrice(Infinity);
  };

  const handleSliderChange = (event: any, newValue: number) => {
    if (newValue > MAX_PRICE) {
      newValue = Infinity;
    }
    setPrice(newValue);
  };

  const handleSliderCommit = (event: any, newValue: number) => {
    if (newValue > MAX_PRICE) {
      newValue = Infinity;
    }

    const updatedProducts = props.products[wineType].filter(product => product.price.value < newValue)
    setVisibleProducts(updatedProducts);
  }

  const storeWithStock = props.storesWithStock.find(s => s.id == props.id)
  const productCards = visibleProducts.map(product =>
    <ListItem className={classes.listItem} key={product.code}>
      <ProductCard product={product} />
    </ListItem>
  )
  return (
    <Container>
      <SearchBar stores={props.stores} />
      <div style={{ paddingTop: "6em" }}>
        <Typography variant="h4" align="center">
          {storeWithStock.name}
        </Typography>
        <WineTypeSelector wineType={wineType} wineTypes={wineTypes} onChange={handleWineTypeChange} />
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <Typography id="discrete-slider" gutterBottom>
              Makspris
            </Typography>
          </Grid>
          <Grid item xs>
            <Slider
              value={price}
              className={classes.slider}
              aria-labelledby="discrete-slider"
              valueLabelDisplay="auto"
              valueLabelFormat={(x) => x > MAX_PRICE ? MAX_PRICE + "+" : x}
              defaultValue={Infinity}
              step={STEP_SIZE}
              min={MIN_PRICE}
              max={MAX_PRICE + 10}
              onChange={handleSliderChange}
              onChangeCommitted={handleSliderCommit}
            />
          </Grid>
        </Grid>
      </div>
      <List>
        {productCards}
      </List>

    </Container >
  )
}

const storesFilePath = path.join(process.cwd(), "data/stores.json");

function saveStoresToFile(stores) {
  return fs.writeFile(storesFilePath, JSON.stringify(stores));
}

async function readStoresFromFile(): Promise<Store[]> {
  const storesFile = await fs.readFile(storesFilePath);
  const storeObj = JSON.parse(storesFile.toString());
  return storeObj;
}

async function readProductsFromFile(): Promise<Record<string, Product>> {
  const wineTypes = ["rødvin", "hvitvin"];
  let products: Record<string, Product> = {}
  for (const wine of wineTypes) {
    const productsFilePath = path.join(process.cwd(), `data/${wine}.json`);
    const productsFile = await fs.readFile(productsFilePath);
    const productsObj = JSON.parse(productsFile.toString());

    products[wine] = { ...productsObj }
  }
  return products
}

async function readStoreStockFromFile(): Promise<StoreWithStock[]> {
  const storeStockFilePath = path.join(process.cwd(), "data/store_stock.json");
  const storeStockFile = await fs.readFile(storeStockFilePath);
  const storeStockObj = JSON.parse(storeStockFile.toString());
  return storeStockObj
}

export async function getStaticPaths() {
  const stores: Store[] = await getStores();
  await saveStoresToFile(stores);
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
  const storeWithStock = storeStock.find(s => s.id == context.params.id)
  Object.entries(storeWithStock.stock)
    .forEach(([wine_type, items]) => {
      let stock = []
      items.forEach(item => {
        if (products[wine_type][item.code]) {
          products[wine_type][item.code]["stock"] = item.stock
          stock.push(products[wine_type][item.code])
        }
      })
      stock.sort((a, b) => b.score - a.score);
      productsInStock[wine_type] = stock;
    });
  return {
    props: {
      stores: stores,
      products: productsInStock,
      storesWithStock: storeStock,
      id: context.params.id,
      key: context.params.id
    },
  };

}

export default storePage;