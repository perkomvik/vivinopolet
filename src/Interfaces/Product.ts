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

interface Product {
  code: string,
  name: string,
  url: string,
  score: number,
  vivino_url: string,
  images: Image[],
  volume: Volume
  price: Price,
}

export default Product;