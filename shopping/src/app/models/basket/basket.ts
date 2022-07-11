
export interface Basket {
    id: number
    quantity: number
    productId: number
    product: {
        id: number
        name: string
        inventoryQuantity: number
        price: number
        imageUrl: string
        codeGuid: string
    }
}