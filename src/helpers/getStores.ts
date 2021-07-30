import axios from "axios";
import Store from "../Interfaces/Store";
import fs from "fs/promises";
import path from "path";

const getStores = async (local = true) => {
  if (local) {
    const storesFilePath = path.join(process.cwd(), "data/stores.json");
    const storesFile = await fs.readFile(storesFilePath);
    const storeObj = JSON.parse(storesFile.toString());
    return storeObj;
  }
  const vinmonopoletStoreUrl: string = "https://apis.vinmonopolet.no/stores/v0/details";
  let vinmonopoletStores;
  await axios.get(vinmonopoletStoreUrl, { headers: { "Ocp-Apim-Subscription-Key": process.env.vinmonopoletKey } })
    .then(response => {
      vinmonopoletStores = response.
        data
    });
  let stores: Store[] = vinmonopoletStores.map(store => (
    {
      id: store.storeId,
      name: store.storeName
    }
  ));
  stores = stores.sort((a, b) => new Intl.Collator('no').compare(a.name, b.name));

  return stores
}

export default getStores;
