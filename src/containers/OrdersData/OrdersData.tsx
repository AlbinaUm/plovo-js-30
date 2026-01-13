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
                console.log(ordersArray);
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
                    {orders.map(order => (
                        <p key={order.id}>
                            {order.customer.name}
                        </p>
                    ))}
                </>
            }
        </div>
    );
};

export default OrdersData;