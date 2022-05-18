import{BrowserRouter, Routes, Route} from 'react-router-dom';
import LoginForm from './components/LoginForm';
import UsersForm from './components/UsersForm';
import ProductForm from './components/ProductForm';
import StockList from './components/StockList';
import BrandMenu from './components/BrandMenu';
import AdminMenu from './components/AdminMenu';
import SaleForm from './components/SaleForm';
import SalesList from './components/SalesList';
import EventsList from './components/EventsList';
import EventForm from './components/EventForm';
import EventMenu from './components/EventMenu';
import CurrentEventMenu from './components/CurrentEventMenu';
//import Navbar from './components/Navbar';

export default function App(){
  return (
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<LoginForm/>}/>
          <Route path='/register' element={<UsersForm/>}/>
          <Route path='/menu' element={<BrandMenu/>}/>
          <Route path='/home' element={<AdminMenu/>}/>
          <Route path='/products' element={<StockList/>}/>
          <Route path='/product/new' element={<ProductForm/>}/>
          <Route path='/product/:id/edit' element={<ProductForm/>}/>
          <Route path='/sale/new' element={<SaleForm/>}/>
          <Route path='/sales' element={<SalesList/>}/>
          <Route path='/events' element={<EventsList/>}/>
          <Route path='/events/dashboard' element={<EventMenu/>}/>
          <Route path='/event/new' element={<EventForm/>}/>
          <Route path='/event/:id/edit' element={<EventForm/>}/>
          <Route path='/event/current' element={<CurrentEventMenu/>}/>
          
        </Routes>  
    </BrowserRouter>
  );
}
