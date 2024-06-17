import './App.css'
import {Routes,Route} from 'react-router-dom'
import Login from './pages/auth/login'
import ForgotPassword from './pages/auth/forgotPassword'
import UpdatePassword from './pages/auth/resetPassword'
import Profile from './pages/Profile/profile'
import AllItems from './pages/allItems'
import Settings from './pages/settings'
import AddProduct from './pages/addProduct'
import Foodee from './pages/foodee'
import FooderData from './pages/dashboard/charts/fooder'
import Order from './pages/order'
import Register from './pages/auth/register'
import ChangePassword from './pages/Profile/changePassword'
import ProtectedRoute from './components/privateRoute'
import PublicRoute from './components/publicRoute'

const App = () => {
  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<PublicRoute component={Register} />} />
          <Route path="/login" element={<PublicRoute component={Login} />} />
          <Route path="/forgot-password" element={<PublicRoute component={ForgotPassword} />} />
          <Route path="/reset-password" element={<PublicRoute component={UpdatePassword} />} />

          <Route path="/dashboard" element={<ProtectedRoute component={FooderData} />} />
          <Route path="/dashboard/product" element={<ProtectedRoute component={AllItems} />} />
          <Route path="/dashboard/addproduct" element={<ProtectedRoute component={AddProduct} />} />
          <Route path="/dashboard/foodee" element={<ProtectedRoute component={Foodee} />} />
          <Route path="/dashboard/fooder" element={<ProtectedRoute component={FooderData} />} />
          <Route path="/dashboard/order" element={<ProtectedRoute component={Order} />} />
          <Route path="/dashboard/settings" element={<ProtectedRoute component={Settings} />} />

          <Route path="/dashboard/profile" element={<ProtectedRoute component={Profile} />} />
          <Route path="/dashboard/change-password" element={<ProtectedRoute component={ChangePassword} />} />
        </Routes>
    </div>
  );
}

export default App;
