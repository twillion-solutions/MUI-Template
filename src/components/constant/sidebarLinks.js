import DashboardIcon from '@mui/icons-material/Dashboard';
import CategoryIcon from '@mui/icons-material/Category';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PersonIcon from '@mui/icons-material/Person';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';

export const sidebarLinks = [
    { id: 1, path: '/dashboard', title: 'Dashboard', icon: <DashboardIcon /> },
    { id: 2, path: '/dashboard/product', title: 'All Products', icon: <CategoryIcon /> },
    { id: 3, path: '/dashboard/addproduct', title: 'Add Product', icon: <AddCircleIcon /> },
    { id: 4, path: '/dashboard/order', title: 'Orders', icon: <ListAltIcon /> },
    { id: 5, path: '/dashboard/foodee', title: 'Foodee', icon: <PersonIcon /> },
    { id: 6, path: '/dashboard/fooder', title: 'Fooder', icon: <PeopleIcon /> },
    { id: 7, path: '/dashboard/settings', title: 'Settings', icon: <SettingsIcon /> },
];


export const settings = [
    {id:1,tittle:'Profile',path:'/dashboard/profile'},
    {id:1,tittle:'Account',path:'/dashboard/account'},
    {id:1,tittle:'Logout',path:'/dashboard/logout'},
];