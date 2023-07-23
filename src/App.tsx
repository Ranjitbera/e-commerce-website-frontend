import './App.css'
import Home from '../components/Home'
import PurchaseHistory from '../components/PurchaseHistory'
import { BrowserRouter , Routes,Route } from 'react-router-dom'


function App() {
 

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/purchase' element={<PurchaseHistory/>}/>
    </Routes>
    
    </BrowserRouter>
    
  )
}

export default App
