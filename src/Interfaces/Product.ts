interface Price {
  value: number,
  formattedValue: string,
  readableValue: string
}

interface Image {
  imageType: string,
  format: string,
  url: string
}

interface Volume {
  value: number,
  formattedValue: string
}

interface MainCategory {
  name: string,
}

interface MainCountry {
  name: string,
}

interface Product {
  code: string,
  name: string,
  url: string,
  score: number,
  n_ratings: number,
  vivino_url: string,
  images: Image[],
  volume: Volume
  price: Price,
  main_category: MainCategory,
  main_country: MainCountry,
  stock: number,
}

export default Product;