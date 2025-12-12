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