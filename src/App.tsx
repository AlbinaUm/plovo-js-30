import {ToastContainer} from "react-toastify";
import ToolBar from "./components/UI/ToolBar/ToolBar.tsx";
import Home from "./containers/Home/Home.tsx";
import {useState} from "react";
import type {CartDish, IDish} from "./types";
import NewDish from "./containers/NewDish/NewDish.tsx";
import {Routes, Route} from "react-router-dom";
import Checkout from "./containers/Checkout/Checkout.tsx";
import Order from "./containers/Order/Order.tsx";
import OrdersData from "./containers/OrdersData/OrdersData.tsx";

const App = () => {
    const [cart, setCart] = useState<CartDish[]>([]);
    const [dishes, setDishes] = useState<IDish[]>([
        {id: '1', name: 'Plov', description: '', image: '',price: 250},
        {id: '2', name: 'Another plov', description: 'tasty', image: 'https://i.pinimg.com/1200x/ae/d4/fa/aed4fa2271e051251709590eff8c15b5.jpg',price: 250},
    ]);

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

    const addDish = (dish: IDish) => {
        setDishes(prevState => {
            return [...prevState, dish]
        });
    };

    const onDeleteDish = (id: string) => {
        setDishes(prevState => prevState.filter(dish => dish.id !== id));
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


    return (
       <>
           <ToastContainer />
           <header>
               <ToolBar/>
           </header>
           <main className="container mt-5">
              <Routes>
                  <Route path='/' element={(
                      <Home
                          cart={cart}
                          dishes={dishes}
                          addDishToCart={addDishToCart}
                          clearCart={clearCart}
                          onDeleteDish={onDeleteDish}
                          onDeleteDishFromCart={onDeleteDishFromCart}
                      />
                  )}/>


                  <Route path='/new-dish' element={(
                      <NewDish addDish={addDish}/>
                  )}/>

                  <Route path='/checkout' element={(<Checkout cartDishes={cart}/>)}>
                      <Route path='continue' element={(<Order cartDishes={cart} clearCart={clearCart}/>)}/>
                  </Route>

                  <Route path='/admin/order-data' element={(<OrdersData />)}/>


                  {/*<Route path='/checkout/continue' element={(<p>checkout/continue</p>)}/>*/}
                  <Route path='*' element={(<h2 className="text-center">Page not found</h2>)}/>
              </Routes>
           </main>
       </>
   )
};

export default App
