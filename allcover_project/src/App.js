import { useEffect } from 'react';
import './App.css';
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';
import Main from './mobile/routes/Main';
import { useMediaQuery } from 'react-responsive';
import { Route, Routes } from 'react-router-dom';
import Home from './mobile/routes/Home';

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
            
          </Route>
          <Route>
            
          </Route>
        </Routes> :
        <Routes>
        
        </Routes>
      }
    </div>
  )
}

export default App;
