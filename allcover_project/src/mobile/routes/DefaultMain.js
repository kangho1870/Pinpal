import { span } from "framer-motion/client";
import styles from "../css/routes/DefaultMain.module.css";
import { useEffect, useRef, useState } from "react";
import AddClub from "./AddClub";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, CLUB_DETAIL_PATH } from "../../constants";
import { getClubList } from "../../apis";
import { useCookies } from "react-cookie";


function DefaultMain({ setLoading }) {
    const [clubList, setClubList] = useState([]);
    const [addClubModal, setAddClubModal] = useState(true);
    const [hasMore, setHasMore] = useState(true);
    const [cookies] = useCookies();
    const token = cookies[ACCESS_TOKEN];
    const navigator = useNavigate();
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    
    const elementRef = useRef(null); 

    const goToClub = (clubId) => {
        navigator(`/club/${clubId}`);
    };

    const onIntersection = (entries) => {
        const firstEntry = entries[0];
        
        if (firstEntry.isIntersecting && hasMore) {
            setLoading(true);
            setIsLoading(true);
            getClubListRequest();
        }
    };

    useEffect(() => {
        const observer = new IntersectionObserver(onIntersection);
    
     //elementRef가 현재 존재하면 observer로 해당 요소를 관찰.
        if (elementRef.current) {
          observer.observe(elementRef.current);
        }
    
     // 컴포넌트가 언마운트되거나 더 이상 관찰할 필요가 없을 때(observer를 해제할 때)반환.
        return () => {
          if (elementRef.current) {
            observer.unobserve(elementRef.current);
          }
        };
    }, [hasMore]);

    const getClubListResponse = (responseBody) => {

        const message = 
        !responseBody ? '서버에 문제가 있습니다.' :
        responseBody.code === 'AF' ? '잘못된 접근입니다.' :
        responseBody.code === 'DBE' ? '서버에 문제가 있습니다.' :
        responseBody.code === 'SJC' ? '취소 처리되었습니다.' : 
        responseBody.code === 'SU' ? '데이터를 성공적으로 불러왔습니다.' : '';

        const isSuccessed = responseBody.code === 'SU' || 'SJC';

        if (!isSuccessed) {
            alert(message);
            return; 
        }
        const { clubList } = responseBody;

        if(clubList == null || clubList.length < 5) {
            setHasMore(false);
        }

        setClubList((prevClubList) => [...prevClubList, ...clubList]);
        setPage((prevPage) => prevPage + 1);
        setIsLoading(false);
        setLoading(false);
        console.log(clubList)
    }

    const getClubListRequest = () => {
        getClubList(page, token).then(getClubListResponse);
    }
    return (
        <div className={styles.section}>
            <div className={styles.bannerArea}>
                <div className={styles.bannerBox}>
                    배너
                </div>
            </div>
            <div className={styles.categoryArea}>
                <ul className={styles.categoryMainBox}>
                    <li className={styles.categoryBox}>
                        <span className={styles.categoryImgSpan}>
                            <img src={require("../../imges/home-img/board.png")} className={styles.categoryImg}></img>
                        </span>
                        <span>커뮤니티</span>
                    </li>
                    <li className={styles.categoryBox}>
                        <span className={styles.categoryImgSpan}>
                            <img src={require("../../imges/home-img/board.png")} className={styles.categoryImg}></img>
                        </span>
                        <span>커뮤니티</span>
                    </li>
                    <li className={styles.categoryBox}>
                        <span className={styles.categoryImgSpan}>
                            <img src={require("../../imges/home-img/board.png")} className={styles.categoryImg}></img>
                        </span>
                        <span>커뮤니티</span>
                    </li>
                    <li className={styles.categoryBox}>
                        <span className={styles.categoryImgSpan}>
                            <img src={require("../../imges/home-img/board.png")} className={styles.categoryImg}></img>
                        </span>
                        <span>커뮤니티</span>
                    </li>
                    <li className={styles.categoryBox}>
                        <span className={styles.categoryImgSpan}>
                            <img src={require("../../imges/home-img/board.png")} className={styles.categoryImg}></img>
                        </span>
                        <span>커뮤니티</span>
                    </li>
                    <li className={styles.categoryBox}>
                        <span className={styles.categoryImgSpan}>
                            <img src={require("../../imges/home-img/board.png")} className={styles.categoryImg}></img>
                        </span>
                        <span>커뮤니티</span>
                    </li>
                    <li className={styles.categoryBox}>
                        <span className={styles.categoryImgSpan}>
                            <img src={require("../../imges/home-img/board.png")} className={styles.categoryImg}></img>
                        </span>
                        <span>커뮤니티</span>
                    </li>
                    <li className={styles.categoryBox}>
                        <span className={styles.categoryImgSpan}>
                            <img src={require("../../imges/home-img/board.png")} className={styles.categoryImg}></img>
                        </span>
                        <span>커뮤니티</span>
                    </li>
                </ul>
            </div>
            <div className={styles.line}></div>
            <div className={styles.contentArea}>
                <p>신규 클럽</p>
                {clubList && clubList.length > 0 ? (
                    clubList.map((club, i) => (
                        <div className={styles.contentBox} key={i}>
                            <div className={styles.clubContainer} onClick={() => goToClub(club.clubId)}>
                                <img className={styles.clubLogo} src={require("../../imges/headerCategory-img/logo.png")} alt="club logo" />
                                <div className={styles.clubDescription}>
                                    <p>{club.clubName}</p>
                                    <span className={styles.clubDescriptionFont} dangerouslySetInnerHTML={{ __html: club.clubDescription }}></span>
                                    <div className={styles.clubPlace}>
                                        <div className={styles.clubPlaceBox}>부산/진구</div>
                                        <span className={styles.clubDescriptionFont}>멤버 : {club.clubCount}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    ""
                )}
                {hasMore && (
                    <div ref={elementRef} style={{ textAlign: 'center' }}></div>
                )}
            </div>
        </div>
    )
}

export default DefaultMain;