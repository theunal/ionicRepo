

export interface Order {
    payment: {
        id: number
        date: string
        cartNumber: string
        cartOwner: string
        expirationDate: string
        cvv: string
    },
    orders: [
        {
            id: number
            productId: number
            paymentId: number
            productName: string
            quantity: number
            price: number
        }
    ],
    total: number
} 