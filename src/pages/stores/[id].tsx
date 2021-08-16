import SearchBar from "../../components/searchBar";
import { getProducts, getStores, getStoresWithStock } from "../../helpers/cloudStorageClient";
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
import WineTypeSelector from "../../components/wineTypeSelector";
import Constants from "../../helpers/constants";
import Tooltip from "@material-ui/core/Tooltip";

const STEP_SIZE = 10;
const MIN_PRICE = 50;
const MAX_PRICE = 300;

const useStyles = makeStyles(() =>
  createStyles({
    listItem: {
      justifyContent: "center"
    },
    slider: {
      maxWidth: "95%",
    },
    sliderContainer: {
      maxWidth: "400px",
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

    const updatedProducts = props.products[newWineType].filter(product => product.price.value < price)
    setVisibleProducts(updatedProducts);
  };

  const handleSliderCommit = (event: any, newValue: number) => {
    if (newValue > MAX_PRICE) {
      newValue = Infinity;
    }
    setPrice(newValue);

    const updatedProducts = props.products[wineType].filter(product => product.price.value < newValue)
    setVisibleProducts(updatedProducts);
  }

  const storeWithStock = props.storesWithStock.find(s => s.id == props.id)
  const productCards = visibleProducts.map(product =>
    <ListItem className={classes.listItem} key={product.code} disableGutters>
      <ProductCard product={product} />
    </ListItem>
  )

  const ValueLabelComponent = (props) => {
    const { children, open, value } = props;

    return (
      <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
        {children}
      </Tooltip>
    );
  }

  return (
    <Container>
      <SearchBar stores={props.stores} />
      <div style={{ paddingTop: "7em" }}>
        <Grid container justifyContent="space-between" wrap="nowrap">
          <Grid item>
            <Typography variant="h5">
              {storeWithStock.name}
            </Typography>
          </Grid>
          <Grid item>
            <WineTypeSelector wineType={wineType} wineTypes={Constants.wineTypes} onChange={handleWineTypeChange} />
          </Grid>
        </Grid >

        <Grid container spacing={2} justifyContent="center" style={{ marginTop: "2em" }}>
          <Grid item>
            <Typography variant="h6" id="discrete-slider" gutterBottom>
              Makspris
            </Typography>
          </Grid>
          <Grid item xs className={classes.sliderContainer}>
            <Slider
              className={classes.slider}
              aria-labelledby="discrete-slider"
              ValueLabelComponent={ValueLabelComponent}
              valueLabelDisplay="on"
              valueLabelFormat={(x) => x > MAX_PRICE ? "kr " + MAX_PRICE + "+" : "kr " + x}
              defaultValue={Infinity}
              step={STEP_SIZE}
              min={MIN_PRICE}
              max={MAX_PRICE + 10}
              onChangeCommitted={handleSliderCommit}
            />
          </Grid>
        </Grid>
      </div >
      <List>
        {productCards}
      </List>

    </Container >
  )
}

const storesFilePath = path.join(process.cwd(), "data/stores.json");
const storesWithStockFilePath = path.join(process.cwd(), "data/stores_with_stock.json");

const saveStoresToFile = async (stores) => {
  await fs.writeFile(storesFilePath, JSON.stringify(stores));
}

const saveStoreStockToFile = async (storesWithStock) => {
  await fs.writeFile(storesWithStockFilePath, JSON.stringify(storesWithStock));
}

const saveProductsToFile = async (wineType: string, products: Record<string, Product>) => {
  await fs.writeFile(`data/${wineType}.json`, JSON.stringify(products));
}

const readStoresFromFile = async (): Promise<Store[]> => {
  const storesFile = await fs.readFile(storesFilePath);
  const storeObj = JSON.parse(storesFile.toString());
  return storeObj;
}

const readProductsFromFile = async (): Promise<Record<string, Record<string, Product>>> => {
  let products: Record<string, Record<string, Product>> = {}
  for (const wineType of Constants.wineTypes) {
    const productsFilePath = path.join(process.cwd(), `data/${wineType}.json`);
    const productsFile = await fs.readFile(productsFilePath);
    const productsObj: Record<string, Product> = JSON.parse(productsFile.toString());

    products[wineType] = { ...productsObj }
  }
  return products
}

const readStoreStockFromFile = async (): Promise<StoreWithStock[]> => {
  const storeStockFilePath = path.join(storesWithStockFilePath);
  const storeStockFile = await fs.readFile(storeStockFilePath);
  const storeStock = JSON.parse(storeStockFile.toString());
  return storeStock;
}

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