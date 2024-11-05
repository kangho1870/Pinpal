import BottomCategory from "../components/BottomCategory";
import HeaderCategory from "../components/HeaderCategory";
import styles from "../css/routes/Home.module.css";
import DefaultMain from "./DefaultMain";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, HOME_PATH, MY_CLUB_PATH, ROOT_PATH } from "../../constants";
import useSignInStore from "../../stores/useSignInStore";
import MyClub from "./MyClub";

function Home() {

    const signInUser = useSignInStore();
    const [cookies] = useCookies();
    const navigator = useNavigate();

    const [page, setPage] = useState(0);

    const getButtonColor = (buttonPage) => {
        return page === buttonPage ? "#000000" : "#a3a3a3";  // 선택된 버튼은 검은색, 나머지는 회색
    };
    
    useEffect(() => {
        if(cookies[ACCESS_TOKEN] == null) {
            alert("로그인이 필요한 서비스입니다.")
            navigator(ROOT_PATH);
        }
    }, [])

    return (
        <>
            <div className={styles.container}>
                <div className={styles.header}>
                    {page == 0 &&
                        <HeaderCategory ></HeaderCategory>
                    }
                </div>
                <div className={styles.contentsBox}>
                    {page == 0 && 
                        <DefaultMain></DefaultMain>
                    }
                    {page == 1 &&
                        ""
                    }
                    {page == 2 &&
                        <MyClub></MyClub>
                    }
                    {page == 3 &&
                        ""
                    }
                </div>
                <div className={styles.bottom}>
                    {page !== 2 && 
                        <div className={styles.bottomCategory}>
                            <div className={styles.categoryBox} onClick={() => {
                                setPage(0);
                            }}>
                                <i className="fa-solid fa-house" style={{color: getButtonColor(0)}}></i>
                                <span style={{color: getButtonColor(0)}}>홈</span>
                            </div>
                            <div className={styles.categoryBox} onClick={() => {
                                setPage(1);                        }}>
                                <i className="fa-solid fa-bowling-ball" style={{color: getButtonColor(1)}}></i>
                                <span style={{color: getButtonColor(1)}}>검색</span>
                            </div>
                            <div className={styles.categoryBox} onClick={() => {
                                setPage(2);
                            }}>
                                <i className="fa-solid fa-users" style={{color: getButtonColor(2)}}></i>
                                <span style={{color: getButtonColor(2)}}>내모임</span>
                            </div>
                            <div className={styles.categoryBox} onClick={() => {
                                setPage(3);
                            }}>
                                <i className="fa-solid fa-user" style={{color: getButtonColor(3)}}></i>
                                <span style={{color: getButtonColor(3)}}>마이페이지</span>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}

export default Home;