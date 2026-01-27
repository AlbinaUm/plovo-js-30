import {ToastContainer} from "react-toastify";
import Home from "./containers/Home/Home.tsx";
import NewDish from "./containers/NewDish/NewDish.tsx";
import {Route, Routes} from "react-router-dom";
import Checkout from "./containers/Checkout/Checkout.tsx";
import Order from "./containers/Order/Order.tsx";
import OrdersData from "./containers/OrdersData/OrdersData.tsx";
import EditDish from "./containers/EditDish/EditDish.tsx";
import Layout from "./components/UI/Layout.tsx";

const App = () => {
    return (
       <>
           <ToastContainer />
           <Layout>
               <Routes>
                   <Route path='/dishes/:idCategory' element={(<Home/>)}/>
                   <Route path='/' element={(<Home/>)}/>
                   <Route path='/new-dish' element={(<NewDish/>)}/>

                   <Route path='/dishes/:id/edit' element={(<EditDish/>)}/>

                   <Route path='/checkout' element={(<Checkout/>)}>
                       <Route path='continue' element={(<Order/>)}/>
                   </Route>

                   <Route path='/admin/order-data' element={(<OrdersData />)}/>
                   <Route path='*' element={(<h2 className="text-center">Page not found</h2>)}/>
               </Routes>
           </Layout>
       </>
   )
};

export default App
