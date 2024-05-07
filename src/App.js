import './App.css';
import ForgotPassword from './components/auth/forgotPassword';
import Login from './components/auth/login';
import UpdatePassword from './components/auth/updatePassword';
import FooderData from './components/dashboard/charts/fooder';
import {Routes,Route} from 'react-router-dom'
import Settings from './components/dashboard/Pages/settings';
import Foodee from './components/dashboard/Pages/foodee';
import AllItems from './components/dashboard/Pages/allItems';
import Dashboard from './components/dashboard/dashboard';
import AddProduct from './components/dashboard/Pages/addProduct';
import Order from './components/dashboard/Pages/order';
import Profile from './components/dashboard/Profile/profile';
import Account from './components/dashboard/Profile/account';

const App = () => {
  return (
    <div className="App">
        <Routes>
          <Route path='/login' element={<Login/>}/>
          <Route path='/forgot-password' element={<ForgotPassword/>}/>
          <Route path='/update-password' element={<UpdatePassword/>}/>

          <Route path='/dashboard' element={<FooderData/>}/>
          <Route path='/dashboard/product' element={<AllItems/>}/>
          <Route path='/dashboard/addproduct' element={<AddProduct />}></Route>
          <Route path='/dashboard/foodee' element={<Foodee/>}/>
          <Route path='/dashboard/fooder' element={<FooderData/>}/>
          <Route path='/dashboard/order' element={<Order/>}/>
          <Route path='/dashboard/settings' element={<Settings/>}/>

          <Route path='/dashboard/profile' element={<Profile/>}/>
          <Route path='/dashboard/account' element={<Account/>}/>
        </Routes>
    </div>
  );
}

export default App;
