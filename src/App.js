import './App.css'
import {Routes,Route} from 'react-router-dom'
import Login from './pages/auth/login'
import ForgotPassword from './pages/auth/forgotPassword'
import UpdatePassword from './pages/auth/resetPassword'
import Profile from './pages/Profile/profile'
import Account from './pages/Profile/account'
import AllItems from './pages/allItems'
import Settings from './pages/settings'
import AddProduct from './pages/addProduct'
import Foodee from './pages/foodee'
import FooderData from './pages/dashboard/charts/fooder'
import Order from './pages/order'
import Register from './pages/auth/register'
import ChangePassword from './pages/Profile/changePassword'


const App = () => {
  return (
    <div className="App">
        <Routes>
          <Route path='/' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/forgot-password' element={<ForgotPassword/>}/>
          <Route path='/reset-password/' element={<UpdatePassword/>}/>

          <Route path='/dashboard' element={<FooderData/>}/>
          <Route path='/dashboard/product' element={<AllItems/>}/>
          <Route path='/dashboard/addproduct' element={<AddProduct />}></Route>
          <Route path='/dashboard/foodee' element={<Foodee/>}/>
          <Route path='/dashboard/fooder' element={<FooderData/>}/>
          <Route path='/dashboard/order' element={<Order/>}/>
          <Route path='/dashboard/settings' element={<Settings/>}/>

          <Route path='/dashboard/profile' element={<Profile/>}/>
          <Route path='/dashboard/account' element={<Account/>}/>
          <Route path='/dashboard/change-password' element={<ChangePassword/>}/>

        </Routes>
    </div>
  );
}

export default App;
