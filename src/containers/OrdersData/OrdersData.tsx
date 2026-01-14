import {useCallback, useEffect, useState} from "react";
import axiosApi from "../../axiosApi.ts";
import Spinner from "../../components/UI/Spinner/Spinner.tsx";
import type {OrderData, OrderDataAPI} from "../../types";

const OrdersData = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [orders, setOrders] = useState<OrderData[]>([]);

    const fetchOrders = useCallback(async () => {
        try {
            setLoading(true);
            const response = await axiosApi.get<OrderDataAPI | null>('/orders.json');
            const ordersObject = response.data;

            if (ordersObject) {
                const ids = Object.keys(ordersObject);

                const ordersArray = ids.map(idOrder => {
                    return {
                        ...ordersObject[idOrder],
                        id: idOrder,
                    };
                });

                setOrders(ordersArray);
            }

        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        void fetchOrders();
    }, [fetchOrders]);

    return (
        <div>
            {loading && <Spinner/>}
            {orders.length > 0  &&
                <>
                    {orders.map(order => {
                        const dishes = order.dishes;
                        const totalPrice = dishes.reduce((acc, dish) => {
                            acc += dish.count * dish.dish.price;
                            return acc;
                        }, 0);

                        return (
                            <div className="card mb-4 p-2" key={order.id}>
                                <h5>Order</h5>
                                <ul>
                                    {dishes.map(dish => (
                                        <li key={dish.dish.name}>
                                            {dish.dish.name} x{dish.count} = {dish.count * dish.dish.price} KGS
                                        </li>
                                    ))}
                                </ul>
                                <p><strong>Customer:</strong>{order.customer.name}</p>
                                <p><strong>Total: </strong>{totalPrice} KGS</p>
                            </div>
                        );
                    })}
                </>
            }
        </div>
    );
};

export default OrdersData;