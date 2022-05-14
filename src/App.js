import{BrowserRouter, Routes, Route} from 'react-router-dom';
import LoginForm from './components/LoginForm';
import UsersForm from './components/UsersForm';
import StockForm from './components/StockForm';
import ProductForm from './components/ProductForm';
import {Container} from '@mui/material';
import StockList from './components/StockList';
import BrandMenu from './components/BrandMenu';
import SaleForm from './components/SaleForm';
import SalesList from './components/SalesList';
import EditProduct from './components/EditProduct';

export default function App(){
  return (
    <BrowserRouter>
      <Container>
      <Routes>
        <Route path='/' element={<LoginForm/>}/>
        <Route path='/Register' element={<UsersForm/>}/>
        <Route path='/Stock' element={<StockForm/>}/>
        <Route path='/StockList' element={<StockList/>}/>
        <Route path='/Product' element={<ProductForm/>}/>
        <Route path='/BrandMenu' element={<BrandMenu/>}/>
        <Route path='/NewSale' element={<SaleForm/>}/>
        <Route path='/SalesList' element={<SalesList/>}/>
        <Route path='/EditProduct' elemnt={<EditProduct/>}/>
      </Routes>  
      </Container>
    </BrowserRouter>
  )
}