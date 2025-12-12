import ToolBar from "./components/UI/ToolBar/ToolBar.tsx";
import DishForm from "./components/DishForm/DishForm.tsx";
import Dishes from "./components/Dishes/Dishes.tsx";
import Cart from "./components/Cart/Cart.tsx";
import {ToastContainer} from "react-toastify";
import {useState} from "react";
import type {CartDish, IDish} from "./types";

const App = () => {
    const [cart, setCart] = useState<CartDish[]>([]);
    const [dishes, setDishes] = useState<IDish[]>([
        {id: '1', name: 'Plov', description: '', image: '',price: 250},
        {id: '2', name: 'Another plov', description: 'tasty', image: 'https://i.pinimg.com/1200x/ae/d4/fa/aed4fa2271e051251709590eff8c15b5.jpg',price: 250},
    ]);

    const clearCart = () => setCart([]);

    const addDishToCart = (dish: IDish) => {
        console.log(dish);
        const findDish = cart.find((cartItem) => dish.id === cartItem.dish.id);

        if (findDish) {
            // +1
            setCart(prevState => prevState.map(cartDish => {
                if (cartDish.dish.id === dish.id) {
                    return {...cartDish, count: cartDish.count + 1}
                }
                return cartDish;
            }));
        } else {
            setCart(prevState => [...prevState, {count: 1, dish}]);
            // push -> cart
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
        // полное удаление вашего блюда из корзины
        // setCart(prevState => prevState.filter(cartDish => cartDish.dish.id !== id));

        // частичное удаление по -1 из количества (count === 0 - полностью удалять)
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
            <ToolBar />
        </header>
        <main className="container mt-5">
            <div className="row justify-content-between">
                <div className="col-4">
                    <DishForm addDish={addDish}/>
                </div>

                <div className="col-4">
                    <Dishes
                        dishes={dishes}
                        onDeleteDish={onDeleteDish}
                        addDishToCart={addDishToCart}
                    />
                </div>

                <div className="col-4">
                    <Cart
                        cartDishes={cart}
                        onClearCart={clearCart}
                        onDeleteDish={onDeleteDishFromCart}
                    />
                </div>
            </div>
        </main>
    </>
  )
};

export default App
