import DishForm from "../../components/DishForm/DishForm.tsx";
import type {DishMutation, IDish} from "../../types";
import axiosApi from "../../axiosApi.ts";
import {useCallback, useEffect, useState} from "react";
import Spinner from "../../components/UI/Spinner/Spinner.tsx";
import {toast} from "react-toastify";
import {useNavigate, useParams} from "react-router-dom";


const EditDish = () => {
    const [dish, setDish] = useState<DishMutation | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    const params = useParams<{id: string}>();

    const fetchOneDish = useCallback(async (id: string) => {
        try {
            setLoading(true);
            const response = await axiosApi.get<DishMutation | null>(`/dishes/${id}.json`);
            setDish(response.data || null);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (params.id) {
            void fetchOneDish(params.id);
        }
    }, [params.id, fetchOneDish]);

    const editDish = async (dish: IDish) => {
        if (params.id) {
            try {
                setLoading(true);
                await axiosApi.put(`/dishes/${params.id}.json`, dish);
                toast.success('Dish edit successfully');
                navigate(`/dishes/${dish.category}`);
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div className="row mt-2">
            <div className="col-4">
                {loading ? <Spinner/> : <DishForm onSubmitDish={editDish} isLoading={loading} defaultDish={dish} isEdit={true}/>}
            </div>

        </div>
    );
};

export default EditDish;