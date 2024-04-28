import Container from "@mui/material/Container";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Slider from "@mui/material/Slider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { ParsedUrlQuery } from "querystring";
import { useState } from "react";
import ProductCard from "../../components/productCard";
import SearchBar from "../../components/searchBar";
import WineTypeSelector from "../../components/wineTypeSelector";
import { getStores, getWinesForStore } from "../../database/client";
import Store from "../../Interfaces/Store";

import Constants from "../../helpers/constants";
import Wine from "../../Interfaces/Wine";

const STEP_SIZE = 10;
const MIN_PRICE = 100;
const MAX_PRICE = 800;

interface Props {
  stores: Store[];
  products: Wine[];
  storeId: number;
}

function StorePage(props: Props) {
  const [price, setPrice] = useState<number>(Infinity);
  const [wineType, setWineType] = useState<string>(Constants.wineTypes.red);
  const [visibleProducts, setVisibleProducts] = useState<Wine[]>(
    props.products.filter((wine) => wine.type === Constants.wineTypes.red)
  );

  const storeName = props.stores.find(
    (store) => store.id === props.storeId
  ).name;

  const handleWineTypeChange = (newWineType: string) => {
    console.log(newWineType);
    setWineType(newWineType);
    setVisibleProducts(
      props.products
        .filter((wine) => wine.type === newWineType)
        .filter((wine) => wine.price <= price)
    );
  };

  const handleSliderCommit = (_: any, newValue: number) => {
    if (newValue > MAX_PRICE) {
      newValue = Infinity;
    }
    setPrice(newValue);
    setVisibleProducts(
      props.products
        .filter((wine) => wine.type == wineType)
        .filter((wine) => wine.price <= newValue)
    );
  };

  const productCards = visibleProducts.map((product) => (
    <ListItem sx={{ justifyContent: "center" }} key={product.id} disableGutters>
      <ProductCard product={product} stock={product.count} />
    </ListItem>
  ));
  return (
    <Container>
      <SearchBar stores={props.stores} currentStoreId={props.storeId} />
      <div style={{ paddingTop: "6.5em" }}>
        <Typography variant="h5" align="center">
          {storeName}
        </Typography>
        <WineTypeSelector
          wineType={wineType}
          wineTypes={[
            Constants.wineTypes.red,
            Constants.wineTypes.white,
            Constants.wineTypes.sparkling,
          ]}
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
}

export async function getStaticPaths() {
  const stores: Store[] = await getStores();
  const paths = stores.map((store) => ({
    params: {
      id: store.id.toString(),
    },
  }));
  return {
    paths: paths,
    fallback: false,
  };
}

interface Params extends ParsedUrlQuery {
  id: string;
}

export async function getStaticProps(context: {
  params: Params;
}): Promise<{ props: Props }> {
  const params = context.params;
  const storeId = parseInt(params.id);
  const wines = await getWinesForStore(storeId);
  const stores = await getStores();
  return {
    props: {
      stores: stores,
      products: wines,
      storeId: storeId,
    },
  };
}

export default StorePage;
