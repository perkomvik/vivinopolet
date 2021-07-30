interface ItemStock {
  code: string,
  stock: number
}

interface StoreWithStock {
  id: number,
  name: string,
  stock: Record<string, ItemStock[]>
}

export default StoreWithStock;