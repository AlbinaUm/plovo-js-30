import ToolBar from "./components/UI/ToolBar/ToolBar.tsx";
import DishForm from "./components/DishForm/DishForm.tsx";
import Dishes from "./components/Dishes/Dishes.tsx";
import Cart from "./components/Cart/Cart.tsx";
import {ToastContainer} from "react-toastify";
import {useState} from "react";

const App = () => {
    const [dishes, setDishes] = useState<IDish[]>([
        {id: '1', name: 'Plov', description: '', image: '',price: 250},
        {id: '2', name: 'Another plov', description: 'tasty', image: 'https://i.pinimg.com/1200x/ae/d4/fa/aed4fa2271e051251709590eff8c15b5.jpg',price: 250},
    ]);

    const addDish = (dish: IDish) => {
       setDishes(prevState => {
           return [...prevState, dish]
       });
    };

    const onDeleteDish = (id: string) => {
        setDishes(prevState => prevState.filter(dish => dish.id !== id));
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
                    <Dishes dishes={dishes} onDeleteDish={onDeleteDish}/>
                </div>

                <div className="col-4">
                    <Cart/>
                </div>
            </div>
        </main>
    </>
  )
};

export default App
