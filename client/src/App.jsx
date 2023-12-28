import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Homepage from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';
import Patient from './pages/Patient';

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element = {<Homepage/>}/>
      <Route path='/login' element = {<Login/>}/>
      <Route path='/register' element = {<Register/>}/>
      <Route path='/patient' element = {<Patient/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App;
