import './App.css';
import Home from './components/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import Directions from './components/Directions';
import logo from './assets/react.svg';


function App() {
  return (
    <>
      <div className='header'>
        <img style={{ marginLeft: '10rem', marginRight: '1rem' , height:'3.5rem'}} src={logo} />
        <h1 style={{ marginLeft: '3rem', fontFamily: 'cursive' }}>MedStart</h1>
      </div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/directions' element={<Directions />} />
      </Routes>
    </>
  )
}

export default App
