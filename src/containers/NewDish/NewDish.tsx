import DishForm from "../../components/DishForm/DishForm.tsx";
import type {IDish} from "../../types";
import axiosApi from "../../axiosApi.ts";
import {useState} from "react";
import Spinner from "../../components/UI/Spinner/Spinner.tsx";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";


const NewDish = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const addDish = async (dish: IDish) => {
        try {
            setLoading(true);
            await axiosApi.post('/dishes.json', dish);
            toast.success('Dish created successfully');
            navigate(`/dishes/${dish.category}`);
        } finally {
            setLoading(false);
        }

    };

    return (
        <div className="row mt-2">
            <div className="col-4">
                {loading ? <Spinner/> : <DishForm onSubmitDish={addDish} isLoading={loading}/>}
            </div>

        </div>
    );
};

export default NewDish;