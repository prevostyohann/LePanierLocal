import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import About from './Components/About';
import Login from './Components/Login';
import Favorite from './Components/Favorite';
import MyTraderRegister from './Components/MyTraderRegister';
import MyUserRegister from './Components/MyUserRegister';
import Message from './Components/Message';
import Forum from './Components/Forum';
import CGV from './Components/CGV';
import CGU from './Components/CGU';
import Contact from './Components/Contact';
import ProfilTrader from './Components/ProfilTrader';
import MentionsLegales from './Components/MentionsLegales';
import DetailsTrader from './Components/DetailsTrader';
import TraderProduct from './Components/TraderProduct';
import CardTrader from './Components/CardTrader';
import './App.css';


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
                <Route path="/" element={<Home />} />
                <Route path="/About" element={<About />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/Register" element={<MyUserRegister />} />
                <Route path="/registerTrader" element={<MyTraderRegister />} />
                <Route path="/Favorite" element={<Favorite />} />
                <Route path="/Message" element={<Message />} />
                <Route path="/Forum" element={<Forum />} />
                <Route path="/TraderProduct" element={<TraderProduct />} />
                <Route path="/ProfilTrader" element={<ProfilTrader />} />
                <Route path="/trader/:id" element={<DetailsTrader />} />
                <Route path="/CGV" element={<CGV />} />
                <Route path="/CGU" element={<CGU />} />
                <Route path="/Contact" element={<Contact />} />
                <Route path="/MentionsLegales" element={<MentionsLegales />} />
                <Route path="/card-trader" element={<CardTrader />} />
               
            </Routes>
        </Router>
        
    );
}

export default App;