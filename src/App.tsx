import { ToastContainer} from "react-toastify";
import Home from "./containers/Home/Home.tsx";
import {useCallback, useState} from "react";
import type {CartDish, IDish} from "./types";
import NewDish from "./containers/NewDish/NewDish.tsx";
import {Route, Routes} from "react-router-dom";
import Checkout from "./containers/Checkout/Checkout.tsx";
import Order from "./containers/Order/Order.tsx";
import OrdersData from "./containers/OrdersData/OrdersData.tsx";
import EditDish from "./containers/EditDish/EditDish.tsx";
import Layout from "./components/UI/Layout.tsx";

const App = () => {
    const [cart, setCart] = useState<CartDish[]>([]);

    const clearCart = () => setCart([]);

    const addDishToCart = (dish: IDish) => {
        const findDish = cart.find((cartItem) => dish.id === cartItem.dish.id);

        if (findDish) {
            setCart(prevState => prevState.map(cartDish => {
                if (cartDish.dish.id === dish.id) {
                    return {...cartDish, count: cartDish.count + 1}
                }
                return cartDish;
            }));
        } else {
            setCart(prevState => [...prevState, {count: 1, dish}]);
        }

    };

    const onDeleteDishFromCart = (id: string) => {
        const findDish = cart.find((cartItem) => id === cartItem.dish.id);

        if (findDish && findDish.count > 1) {
            setCart(prevState => prevState.map(cartDish => {
                if (cartDish.dish.id === id) {
                    return {...cartDish, count: cartDish.count - 1}
                }
                return cartDish;
            }));
        } else if (findDish && findDish.count <= 1) {
            setCart(prevState => prevState.filter(cartDish => cartDish.dish.id !== id));
        }
    };

    const updateCart = useCallback((dishes: IDish[]) => {
        setCart(prevState => {
           const newCartDishes: CartDish[] = [];

           prevState.forEach(cartDish => {
               const existingDish = dishes.find(dish => cartDish.dish.id === dish.id);

               if (!existingDish) {
                   newCartDishes.push({...cartDish});
               } else {
                   newCartDishes.push({
                       ...cartDish,
                       dish: existingDish,
                   });
               }
           });
            return newCartDishes;
        });
    }, []);

    return (
       <>
           <ToastContainer />
           <Layout>
               <Routes>
                   <Route path='/dishes/:idCategory' element={(
                       <Home
                           cart={cart}
                           addDishToCart={addDishToCart}
                           clearCart={clearCart}
                           onDeleteDishFromCart={onDeleteDishFromCart}
                           updateCart={updateCart}
                       />
                   )}/>

                   <Route path='/' element={(
                       <Home
                           cart={cart}
                           addDishToCart={addDishToCart}
                           clearCart={clearCart}
                           onDeleteDishFromCart={onDeleteDishFromCart}
                           updateCart={updateCart}
                       />
                   )}/>

                   <Route path='/new-dish' element={(
                       <NewDish/>
                   )}/>

                   <Route path='/dishes/:id/edit' element={(
                       <EditDish/>
                   )}/>

                   <Route path='/checkout' element={(<Checkout cartDishes={cart}/>)}>
                       <Route path='continue' element={(<Order cartDishes={cart} clearCart={clearCart}/>)}/>
                   </Route>

                   <Route path='/admin/order-data' element={(<OrdersData />)}/>

                   <Route path='*' element={(<h2 className="text-center">Page not found</h2>)}/>
               </Routes>
           </Layout>
       </>
   )
};

export default App
