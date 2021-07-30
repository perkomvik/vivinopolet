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
import { Container, Typography } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import Grid from "@material-ui/core/Grid";

const STEP_SIZE: number = 10;
const MIN_PRICE: number = 50;
const MAX_PRICE: number = 300;

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
  products: Product[],
  id: number
  key: number
}) => {
  const classes = useStyles();
  const [visibleProducts, setVisibleProducts] = useState<Product[]>(props.products)

  const handleSliderChange = (event: any, newValue: number | number[]) => {
    if (newValue > MAX_PRICE) {
      newValue = Infinity;
    }
    const updatedProducts = props.products.filter(product => product.price.value < newValue)
    setVisibleProducts(updatedProducts);
  };

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
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <Typography id="discrete-slider" gutterBottom>
              Makspris
            </Typography>
          </Grid>
          <Grid item xs>
            <Slider
              className={classes.slider}
              defaultValue={Infinity}
              aria-labelledby="discrete-slider"
              valueLabelDisplay="auto"
              valueLabelFormat={(x) => x > MAX_PRICE ? MAX_PRICE + "+" : x}
              step={STEP_SIZE}
              min={MIN_PRICE}
              max={MAX_PRICE + 10}
              onChangeCommitted={handleSliderChange}
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
  const productsFilePath = path.join(process.cwd(), "data/products.json");
  const productsFile = await fs.readFile(productsFilePath);
  const productsObj = JSON.parse(productsFile.toString());
  return productsObj
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
  let productsInStock: Product[] = [];
  const storeWithStock = storeStock.find(s => s.id == context.params.id)
  Object.entries(storeWithStock.stock)
    .forEach(([product_type, items]) => {
      items.forEach(item => {
        if (products[item.code]) {
          products[item.code]["stock"] = item.stock
          productsInStock.push(products[item.code])
        }
      })
    });
  productsInStock.sort((a, b) => b.score - a.score);
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