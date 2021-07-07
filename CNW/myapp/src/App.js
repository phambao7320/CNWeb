import React from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'; 
import Home from './components/Home';
import Navbar from './components/partial/Navbar';
import About from './components/About';
import Product from './components/Product/Product' ;
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import NewsDetail from './components/Detail/NewsDetail';

import Login from './components/backend/Login';
import Passwordreset from './components/backend/Passwordreset';

import Customers from './components/backend/Customers/Customers';
import Users from './components/backend/Users/Users';
import Employees from './components/backend/Employees/Employees';
import Products from './components/backend/Products/Products';

import CreateCustomer from './components/backend/Customers/CreateCustomer';
import CreateUser from './components/backend/Users/CreateUser';
import CreateEmployee from './components/backend/Employees/CreateEmployee' ;
import CreateProduct from './components/backend/Products/CreateProduct';

import EditCustomer from './components/backend/Customers/EditCustomer';
import EditUser from './components/backend/Users/EditUser';
import EditEmployee from './components/backend/Employees/EditEmployee';
import EditProduct from './components/backend/Products/EditProduct'

function App() {
  return (
    <div>
      
      <Router>
        <Navbar/>
          <Switch>
           <Route exact path="/product2/:id" component={NewsDetail} />
            <Route exact path='/'component={Home}/>
            <Route path='/about' component={About}/>
            <Route path='/product' component={Product}/>
            <Route path='/listproduct' component={Gallery}/>
            <Route path='/contact' component={Contact}/>

            <Route path= '/qlproducts'><Products/></Route>
            <Route path= '/qlcreateproduct'><CreateProduct/></Route>
            <Route path= '/qleditproduct'><EditProduct/></Route>

            <Route path= '/qlemployees'><Employees/></Route>
            <Route path= '/qlcreateemployee'><CreateEmployee/></Route>
            <Route path= '/qleditemployee'><EditEmployee/></Route>

            <Route path= '/qlcustomers'><Customers/></Route>
            <Route path= '/qlcreatecustomer'><CreateCustomer/></Route>
            <Route path= '/qleditcustomer'><EditCustomer/></Route>

            <Route path= '/qlusers'><Users/></Route>
            <Route path= '/qlcreateuser'><CreateUser/></Route>
            <Route path= '/qledituser'><EditUser/></Route>

            <Route path='/login'><Login/></Route>
            <Route path='/resetpass' component={Passwordreset}/>
          
          
          </Switch>
        
      </Router>

   
      
    </div>
  );
}

export default App;
