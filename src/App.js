import{BrowserRouter, Routes, Route} from 'react-router-dom';
import LoginForm from './components/LoginForm';
import UsersForm from './components/UsersForm';
import StockForm from './components/StockForm';
import ProductForm from './components/ProductForm';
import StockList from './components/StockList';
import BrandMenu from './components/BrandMenu';
import SaleForm from './components/SaleForm';
import SalesList from './components/SalesList';
import Navbar from './components/Navbar';
import {Container} from '@mui/material';

export default function App(){
  return (
    <BrowserRouter>
        <Navbar/>
      <Container>
        <Routes>
          <Route path='/' element={<LoginForm/>}/>
          <Route path='/register' element={<UsersForm/>}/>
          <Route path='/Stock' element={<StockForm/>}/>
          <Route path='/products' element={<StockList/>}/>
          <Route path='/product' element={<ProductForm/>}/>
          <Route path='/BrandMenu' element={<BrandMenu/>}/>
          <Route path='/sale/new' element={<SaleForm/>}/>
          <Route path='/sales' element={<SalesList/>}/>
          <Route path='/product/:id/edit' element={<ProductForm/>}/>
        </Routes>  
      </Container>
    </BrowserRouter>
  );
}