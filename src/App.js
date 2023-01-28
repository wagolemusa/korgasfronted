import './App.css';
import Navbar from './componets/Navbar';
// import { Routes, Route, Router } from "react-router-dom"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './componets/Login';
import Register from './componets/Register';
import Home from './componets/Home';
import ForgetPassord from './componets/Forgetpassword';
import RegisterSuccessfully from './componets/RegisterSuccessfully';

// subAddmin Routes
import User from './subaddmin/User';
import FutureCustomer from './subaddmin/FutureCustomer';
import SubAddminDashboard from './subaddmin/SubAddminDashboard';
import Kgs from './subaddmin/Kgs';
import Treller from './subaddmin/Treller';
import Tank from './subaddmin/Tank';
import GetKgs from './subaddmin/GetKgs';
import Customer from './subaddmin/Customers';
import Employee from './subaddmin/Employee';
import Category from './subaddmin/shops/Category';
import Shops from './subaddmin/shops/Shop';
import Stock from './subaddmin/shops/Stock'
import Product from './subaddmin/Product';
import Productcateogry from './subaddmin/Productcategory'


// customer Routes
import CustomerDashoard from './Customers/CustomerDashbord';


function App() {
  return (
    <div className="App">
      <Router>

        <Navbar />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgetpassword" element={<ForgetPassord />} />
          <Route path="/registerSuccessfully" element={<RegisterSuccessfully />} />

          {/* Sub-Admin-Routes */}
          <Route path='/user' element={<User />} />
          <Route path='/kgs' element={ <Kgs />} />
          <Route path='/subadmin' element={<SubAddminDashboard /> } />
          <Route path='/treller' element={<Treller />} />
          <Route path='future' element={<FutureCustomer /> } />
          <Route path='tank' element={<Tank /> } />
          <Route path='getkgs' element={<GetKgs />} />
          <Route path='client' element={<Customer/>} />
          <Route path='employee' element={<Employee />} />
          <Route path ='category' element={<Category />} />
          <Route path='/shop' element={<Shops />} />
          <Route path='/stock' element={<Stock />} />
          <Route path='/product' element={<Product />} />
          <Route path='/Productcategory' element={<Productcateogry />} />


          {/* Customer Routes */}
          <Route path='/customer' element={<CustomerDashoard />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
