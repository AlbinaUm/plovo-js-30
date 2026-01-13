import axios from "axios";

const axiosApi = axios.create({
    baseURL: 'https://js-30-albina-default-rtdb.europe-west1.firebasedatabase.app'
});

export default axiosApi;