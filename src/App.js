import{BrowserRouter, Routes, Route} from 'react-router-dom';
import LoginForm from './components/LoginForm';
import {Container} from '@mui/material';

export default function App(){
  return (
    <BrowserRouter>
      <Container>
      <Routes>
        <Route path='/' element={<LoginForm/>}/>
      </Routes>  
      </Container>
    </BrowserRouter>
  )
}