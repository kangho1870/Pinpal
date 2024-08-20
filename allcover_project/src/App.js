import { useEffect } from 'react';
import './App.css';
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';
import Main from './mobile/routes/Main';
import { useMediaQuery } from 'react-responsive';
import { Outlet, Route, Routes } from 'react-router-dom';
import Home from './mobile/routes/Home';
import DefaultMain from './mobile/routes/DefaultMain';
import MyClub from './mobile/routes/MyClub';
import Scoreboard from './mobile/routes/Scoreboard';


function App() {
  const mobile = useMediaQuery({ maxWidth: 600 })

  function setScreenSize() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }
  useEffect(() => {
    setScreenSize();
  });
  return (
    <div className="App">
      {mobile ? 
        <Routes>
          <Route path='/' element={<Main></Main>}></Route>
          <Route path='/home' element={<Home></Home>}>
            <Route path='main' element={<DefaultMain></DefaultMain>}></Route>
          </Route>
          <Route path='/myclub' element={<MyClub></MyClub>}></Route>
          <Route path='/scoreboard' element={<Scoreboard></Scoreboard>}></Route>
        </Routes> :
        <Routes>
        
        </Routes>
      }
    </div>
  )
}

export default App;
