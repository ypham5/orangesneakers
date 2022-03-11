import {Routes, Route} from "react-router-dom"

import {LoginPage, DashBoardPage, PageNotFound} from './pages'
import {AllProductsPanel, OrdersPanel, AddProductsPanel, CustomersPanel} from 'components/panels' 
function App() {
 
  return (
       <>
         <Routes>
           <Route path="/"  element={<LoginPage/>}/>
           <Route path="dashboard"  element={<DashBoardPage/>}>
              <Route index element={<AllProductsPanel title="All Products" />}/>
              <Route path="orders" element={<OrdersPanel title="Orders" />}/>
              <Route path="add" element={<AddProductsPanel title="Add New Product" />}/>
              <Route path="customers" element={<CustomersPanel title="Customers" />}/>
           </Route>
           <Route path="*"  element={<PageNotFound/>}/>
         </Routes>
       </>
  );
}

export default App;

 
 