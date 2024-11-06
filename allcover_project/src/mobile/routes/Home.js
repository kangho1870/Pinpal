import BottomCategory from "../components/BottomCategory";
import HeaderCategory from "../components/HeaderCategory";
import styles from "../css/routes/Home.module.css";
import DefaultMain from "./DefaultMain";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, ADD_CLUB_PATH, CLUB_DETAIL_PATH, HOME_PATH, MY_CLUB_PATH, ROOT_PATH } from "../../constants";
import useSignInStore from "../../stores/useSignInStore";
import MyClub from "./MyClub";
import AddClub from "./AddClub";

function Home() {

    const { signInUser } = useSignInStore();
    const [cookies] = useCookies();
    const navigator = useNavigate();
    const clubId = signInUser?.clubId || null;

    const [page, setPage] = useState(0);

    const getButtonColor = (buttonPage) => {
        return page === buttonPage ? "#000000" : "#a3a3a3";  // 선택된 버튼은 검은색, 나머지는 회색
    };

    const myClubBtnClickHandler = () => {
        if(clubId == null) {
            alert("가입한 클럽이 없습니다.")
            return;
        }
        navigator(CLUB_DETAIL_PATH(clubId));
    }
    
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
                        <AddClub></AddClub>
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
                                myClubBtnClickHandler();
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
            <div className={styles.modalContainer}>
                <div className={styles.modalBox} onClick={() => navigator(ADD_CLUB_PATH)}>
                    <div className={styles.modal}>
                        <i className="fa-solid fa-plus"></i>
                        <span className={styles.title}>클럽 개설</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home;