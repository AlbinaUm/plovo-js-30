import type {DishMutation, IDish, IDishAPI} from "../../types";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi.ts";
import reformatObjectToArrayFireBase from "../../utils/dataApiToArray.ts";
import {clearCart, updateDishesInCart} from "./cartSlice.ts";
import type {AppDispatch, RootState} from "./store.ts";
import {toast} from "react-toastify";

interface DishesState {
    items: IDish[];
    fetchLoading: boolean;
    deleteLoading: boolean | string;
}

const initialState: DishesState = {
    items: [],
    fetchLoading: false,
    deleteLoading: false
};

export const dishesSlice = createSlice({
    name: 'dishes',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAllDishes.pending, (state) => {
            state.fetchLoading = true;
        });
        builder.addCase(fetchAllDishes.fulfilled, (state, {payload: dishes}) => {
            state.fetchLoading = false;
            state.items = dishes;
        });
        builder.addCase(fetchAllDishes.rejected, (state) => {
            state.fetchLoading = false;
        });

        builder.addCase(deleteDishById.pending, (state, {meta}) => {
            state.deleteLoading = meta.arg;
        });
        builder.addCase(deleteDishById.fulfilled, (state) => {
            state.deleteLoading = false;
        });
        builder.addCase(deleteDishById.rejected, (state) => {
            state.deleteLoading = false;
        });
    }
});

export const selectAllDishes = (state: RootState) => state.dishes.items;
export const selectFetchDishesLoading = (state: RootState) => state.dishes.fetchLoading;
export const selectDeleteDishLoading = (state: RootState) => state.dishes.deleteLoading;

export const fetchAllDishes = createAsyncThunk<IDish[], string | undefined, {dispatch: AppDispatch}>(
    'dishes/fetchAllDishes',
    async (categoryId, thunkAPI) => {
        let url = '/dishes.json';

        if (categoryId) url += `?orderBy="category"&equalTo="${categoryId}"`;

        const response = await axiosApi.get<IDishAPI | null>(url);
        const dishesObject = response.data;

        if (dishesObject !== null) {
            const dishesArray = reformatObjectToArrayFireBase<DishMutation>(dishesObject);
            thunkAPI.dispatch(updateDishesInCart(dishesArray));
            return dishesArray;
        }
        return [];
    }
)

export const deleteDishById = createAsyncThunk<void, string, {dispatch: AppDispatch}>(
    'dishes/deleteDishById',
    async (id, thunkAPI) => {
        await axiosApi.delete(`/dishes/${id}.json`);
        toast.success('Dish deleted successfully');
        await thunkAPI.dispatch(fetchAllDishes());
        thunkAPI.dispatch(clearCart());
    }
);

export const dishesReducer = dishesSlice.reducer;