import {Routes, Route} from "react-router-dom"

import {LoginPage, DashBoardPage, PageNotFound} from './pages'
import {HomePanel, OrdersPanel, ProductsPanel, CustomersPanel} from 'components/panels' 
function App() {
 
  return (
       <>
         <Routes>
           <Route path="/"  element={<LoginPage/>}/>
           <Route path="dashboard"  element={<DashBoardPage/>}>
              <Route index element={<HomePanel title="Overview" />}/>
              <Route path="orders" element={<OrdersPanel title="Orders" />}/>
              <Route path="products" element={<ProductsPanel title="Product Listings" />}/>
              <Route path="customers" element={<CustomersPanel title="Customers" />}/>
           </Route>
           <Route path="*"  element={<PageNotFound/>}/>
         </Routes>
       </>
  );
}

export default App;

 
 