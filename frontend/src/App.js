import './App.css';
import Login from './Components/Login';
import Product from './Components/Product';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/Home'
import About from './Components/About';
import Favorite from './Components/Favorite';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap-icons/font/bootstrap-icons.css';
import MyTraderRegister from './Components/MyTraderRegister';
import MyUserRegister from './Components/MyUserRegister';
import Message from './Components/Message';
import Forum from './Components/Forum';
import CGV from './Components/CGV';
import CGU from './Components/CGU';
import Contact from './Components/Contact';
import ProfilTrader from './Components/ProfilTrader';
import MentionsLegales from './Components/MentionsLegales';

 
 
 
 
 
function App() {
 
  const [userId, setUserId] = useState(null);
 
  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);
 
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path='/About' element={<About/>}/>
        <Route path='/Login' element={<Login/>}/>
        {/* <Route path='/LoginTrader' element={<LoginTrader/>}/> */}
        <Route path="/Register" element= {<MyUserRegister/>}/>
        
        <Route path='/registerTrader' element={<MyTraderRegister/>}/>
        <Route path="/Product" element= {<Product/>}/>
        <Route path="/Favorite" element={<Favorite/>}/>
        <Route path="/Message" element={<Message/>}/>
        <Route path="/Forum" element={<Forum/>}/>
        <Route path="/CGV" element={<CGV />} />
        <Route path="/CGU" element={<CGU />} />
        <Route path="/Contact" element={<Contact/>} /> 
        <Route path='/MentionsLegales' element={<MentionsLegales/>}/>
        <Route path='/ProfilTrader' element={<ProfilTrader/>} />
 
      </Routes>
    </Router>
  );
}
 
export default App;