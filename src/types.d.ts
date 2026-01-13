interface IDish {
    id: string;
    name: string;
    description: string;
    image: string;
    price: number;
}

interface DishMutation {
    name: string;
    description: string;
    image: string;
    price: number;
}

export interface CartDish {
    dish: IDish;
    count: number;
}

export interface Customer {
    name: string;
    address: string;
    phone: string;
}

export interface OrderDataMutation {
    customer: Customer;
    dishes: CartDish[];
}

export interface OrderData {
    id: string;
    customer: Customer;
    dishes: CartDish[];
}

export interface OrderDataAPI {
    [key: string]: OrderDataMutation;
}
// {
    // -OiIWZh7G3AmRbLsOWPx: {customer: {address: "maldybaeva", name: "Albina", phone: "32456789"}, dishes}
    // -OiIWZh7G3AmRbLsOWP2: {customer: {address: "maldybaeva 7/1", name: "Albina", phone: "32456789"}, dishes}
// }