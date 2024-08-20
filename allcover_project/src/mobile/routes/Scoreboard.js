import { useEffect, useState } from "react";
import RankingBoard from "../components/RankingBoard";
import WaitingRoom from "../components/WaitingRoom";
import styles from "../css/routes/Scoreboard.module.css";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

function Scoreboard() {
    const [searchParams] = useSearchParams();
    const gameId = searchParams.get('gameId');
    const clubId = searchParams.get('clubId');
    const memberId = searchParams.get('memberId');
    const [members, setMembers] = useState([]);
    const [page, setPage] = useState(0);

    useEffect(() => {
        axios.get(`/scoreboard?gameId=${gameId}&clubId=${clubId}&memberId=${memberId}`)
            .then(response => {
                console.log(response.data.data)
                setMembers(response.data.data)
            })
            .catch(error => {
                console.log("error!!", error)
            })
            console.log(page)
    }, [gameId, clubId, memberId])
    console.log(members)

    return (
        <>
            <div className={styles.container}>
                <div className={styles.topBox}>
                    <div>
                        <i class="fa-solid fa-reply"></i>
                    </div>
                    <div>
                        <p>제 3회 정기모임</p>
                    </div>
                    <div>
                        <i class="fa-solid fa-circle-exclamation"></i>
                    </div>
                </div>
                <div className={styles.main}>
                    <div>
                        <div>
                            <button className={styles.navBtn}>대기실</button>
                            <button className={styles.navBtn}>점수표</button>
                            <button className={styles.navBtn}>시상</button>
                            <button className={styles.navBtn}>자세히</button>
                        </div>
                    </div>
                    <div className={styles.contentsBox}>
                        {page == 0 && 
                            <WaitingRoom members={members} memberId={memberId}></WaitingRoom>
                        }
                        {page == 1 &&
                            <RankingBoard></RankingBoard>
                        }
                        
                        
                    </div>
                </div>
                <div>

                </div>
            </div>
        </>
    )
}

export default Scoreboard;