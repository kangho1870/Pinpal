import { useEffect, useState } from "react";
import RankingBoard from "../components/RankingBoard";
import WaitingRoom from "../components/WaitingRoom";
import styles from "../css/routes/Scoreboard.module.css";
import GradeSettingModal from "../components/modal/GradeSettingModal";

function Scoreboard() {
    const [page, setPage] = useState(0);
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
                            <WaitingRoom></WaitingRoom>
                        }
                        {page == 1 &&
                            <RankingBoard></RankingBoard>
                        }
                        
                        
                    </div>
                </div>
                <div>

                </div>
            </div>
            <div className={styles.modalArea}>
                <GradeSettingModal></GradeSettingModal>
            </div>
        </>
    )
}

export default Scoreboard;