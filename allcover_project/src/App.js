import { useEffect, useState } from 'react';
import './App.css';
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';
import Main from './mobile/routes/Main';
import { useMediaQuery } from 'react-responsive';
import { Outlet, Route, Routes, useNavigate, useSearchParams } from 'react-router-dom';
import Home from './mobile/routes/Home';
import DefaultMain from './mobile/routes/DefaultMain';
import MyClub from './mobile/routes/MyClub';
import Scoreboard from './mobile/routes/Scoreboard';
import Auth from './mobile/routes/Auth';
import { useCookies } from 'react-cookie';
import { ACCESS_TOKEN, AUTH_ABSOLUTE_PATH, HOME_PATH, ROOT_PATH, SCOREBOARD_PATH } from './constants';
import { getSignInRequest } from './apis';
import useSignInStore from './stores/useSignInStore';

function Index() {

  // state: 쿠키 상태 //
  const [cookies] = useCookies();

  // function: 네비게이터 함수 //
  const navigator = useNavigate();

  // effect: 마운트 시 경로 이동 effect //
  useEffect(() => {
    if(cookies[ACCESS_TOKEN]) navigator(HOME_PATH);
    else navigator(ROOT_PATH);
  }, []);

  // render: root path 컴포넌트 렌더링 //
  return (
      <></>
  );
}

// component: Sns Success 컴포넌트 //
function SnsSuccess() {

  // state: Query Parameter 상태 //
  const [queryParam] = useSearchParams();
  const accessToken = queryParam.get('access_token');
  const expiration = queryParam.get('expiration');

  const [cookies, setCookie] = useCookies();

  const navigator = useNavigate();

  // effect: Sns Success 컴포넌트 로드시 accessToken과 expiration을 확인하여 로그인 처리 함수 //
  useEffect(() => {
      if (accessToken && expiration) {
          const expires = new Date(Date.now() + (Number(expiration) * 1000));
          setCookie(ACCESS_TOKEN, accessToken, { path: ROOT_PATH, expires });
          console.log(accessToken)
          navigator(HOME_PATH);
      }
      else navigator(ROOT_PATH);
  }, []);

  // render: Sns Success 컴포넌트 렌더링 //
  return <></>;
}

function App() {

  const { signInUser, login } = useSignInStore();

  const [cookies, setCookie, removeCookie] = useCookies();

  const [dataLoading, setDataLoading] = useState(false);

  const navigator = useNavigate();

  const getSignInResponse = (responseBody) => {

    const message = 
        !responseBody ? '로그인 유저 정보를 불러오는데 문제가 발생했습니다.' :
        responseBody.code === 'NI' ? '로그인 유저 정보가 존재하지 않습니다.' :
        responseBody.code === 'AF' ? '잘못된 접근입니다.' : 
        responseBody.code === 'DBE' ? '로그인 유저 정보를 불러오는데 문제가 발생했습니다.' : '';

    const isSuccessed = responseBody !== null && responseBody.code === 'SU';

    if (!isSuccessed) {
        alert(message);
        removeCookie(ACCESS_TOKEN, { path: ROOT_PATH });
        login(null);
        navigator(ROOT_PATH);
        return;
    }

    const { memberId, id, clubId } = responseBody;
    login({ memberId, id, clubId });
  };

  useEffect(() => {
    const accessToken = cookies[ACCESS_TOKEN];
    if (accessToken) {
      getSignInRequest(accessToken).then(getSignInResponse);
    } else {
      login(null);
    }
  }, [cookies[ACCESS_TOKEN]]);


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
      <>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/home' element={<Home />} />
          <Route path='/myclub' element={<MyClub />} />
          <Route path={SCOREBOARD_PATH} element={<Scoreboard />} />
          <Route path='/auth' element={<Auth />} />
          <Route path='/sns-success' element={<SnsSuccess />} />
        </Routes>
      </> :
        <Routes>
        
        </Routes>
      }
    </div>
  )
}

export default App;
