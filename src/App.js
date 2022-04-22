import{BrowserRouter, Routes, Route} from 'react-router-dom';
import LoginForm from './components/LoginForm';
import UsersForm from './components/UsersForm';
import StockForm from './components/StockForm';
import {Container} from '@mui/material';

export default function App(){
  return (
    <BrowserRouter>
      <Container>
      <Routes>
        <Route path='/' element={<LoginForm/>}/>
        <Route path='/Register' element={<UsersForm/>}/>
        <Route path='/Stock' element={<StockForm/>}/>
      </Routes>  
      </Container>
    </BrowserRouter>
  )
}