import { useEffect, useState } from "react";
import RankingBoard from "../components/RankingBoard";
import WaitingRoom from "../components/WaitingRoom";
import styles from "../css/routes/Scoreboard.module.css";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import GradeSettingModal from "../components/modal/GradeSettingModal";
import TeamSettingModal from "../components/modal/TeamSettingModal";
import ConfirmModal from "../components/modal/ConfirmModal";
import SideGameJoinUsers from "../components/modal/SideGameJoinUsers";
import SideRankingModal from "../components/modal/SideRankingModal";
import ScoreInputModal from "../components/modal/ScoreInputModal";
import GameResult from "../components/GameResult";
import TeamScoreboard from "../components/TeamScoreboard";
import useStore from "../../stores/useSignInStore";

function Scoreboard() {
    const { signInUser } = useStore();

    const [searchParams] = useSearchParams();
    const gameId = searchParams.get('gameId');
    const clubId = searchParams.get('clubId');
    const memberId = signInUser.id;
    const [members, setMembers] = useState([]);
    const [gradeModal, setGradeModal] = useState(false);
    const [teamModal, setTeamModal] = useState(false);
    const [confirmModal, setConfirmModal] = useState(false);
    const [sideJoinUserModal, setSideJoinUserModal] = useState(false);
    const [sideRankingModal, setSideRankingModal] = useState(false);
    const [scoreInputModal, setScoreInputModal] = useState(false);
    const [navTitle] = useState(['대기실', '점수표', '팀전', '시상']);

    const [page, setPage] = useState(0);

    const loadMembers = () => {
        axios.get(`/scoreboard?gameId=${gameId}&clubId=${clubId}&memberId=${memberId}`)
            .then(response => {
                const data = response.data.data;
                console.log(data)
                setMembers(data);
            })
            .catch(error => {
                console.log("error!!", error);
            });
    };

    const gradeSetModalToggle = () => {
        setGradeModal(!gradeModal);
    }

    const teamSetModalToggle = () => {
        setTeamModal(!teamModal);
    }

    const confirmSetModalToggle = () => {
        setConfirmModal(!confirmModal)
    }

    const sideJoinSetModalToggle = () => {
        setSideJoinUserModal(!sideJoinUserModal)
    }

    const navBtnClickHandler = (index) => {
        setPage(index);
    }

    const sideRankingModalToggle = () => {
        setSideRankingModal(!sideRankingModal)
    }

    const scoreInputModalToggle = () => {
        setScoreInputModal(!scoreInputModal)
    }

    useEffect(() => {
        loadMembers();
    }, [gameId, clubId, memberId])

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
                    <div className={styles.navBox}>
                        <div>
                            {navTitle.map((btn, index) => (
                                <>
                                    <button className={`${styles.navBtn} ${page === index ? styles.selectedBtn : ""}`} onClick={() => navBtnClickHandler(index)}>{btn}</button>
                                </>
                            ))}
                        </div>
                    </div>
                    <div className={styles.contentsBox}>
                        {page == 0 && 
                            <WaitingRoom 
                                members={members} 
                                gameId={gameId} 
                                clubId={clubId} 
                                memberId={memberId} 
                                reloadMembers={loadMembers}
                                gradeSetModalToggle={gradeSetModalToggle}
                                teamSetModalToggle={teamSetModalToggle}
                                confirmSetModalToggle={confirmSetModalToggle}
                                sideJoinSetModalToggle={sideJoinSetModalToggle}
                            />
                        }
                        {page == 1 &&
                            <RankingBoard members={members} reloadMembers={loadMembers} sideRankingModalToggle={sideRankingModalToggle} scoreInputModalToggle={scoreInputModalToggle}></RankingBoard>
                        }
                        {page == 2 &&
                            <TeamScoreboard members={members}></TeamScoreboard>
                        }

                        {page == 3 &&
                            <GameResult members={members}></GameResult>
                        }
                    </div>
                </div>
                <div>

                </div>
                {gradeModal && 
                    <div className={styles.modalArea}>
                        <GradeSettingModal members={members} gameId={gameId} gradeSetModalToggle={gradeSetModalToggle} reloadMembers={loadMembers}></GradeSettingModal>
                    </div>
                }
                {teamModal && 
                    <div className={styles.modalArea}>
                        <TeamSettingModal members={members} gameId={gameId} teamSetModalToggle={teamSetModalToggle} reloadMembers={loadMembers}></TeamSettingModal>
                    </div>
                }
                {confirmModal &&
                    <div className={styles.modalArea}>
                        <ConfirmModal confirmSetModalToggle={confirmSetModalToggle} reloadMembers={loadMembers}></ConfirmModal>
                    </div>
                }
                {sideJoinUserModal &&
                    <div className={styles.modalArea}>
                        <SideGameJoinUsers members={members} sideJoinSetModalToggle={sideJoinSetModalToggle}></SideGameJoinUsers>
                    </div>
                }
                {sideRankingModal &&
                    <div className={styles.modalArea}>
                        <SideRankingModal members={members} sideRankingModalToggle={sideRankingModalToggle}></SideRankingModal>
                    </div>
                }
                {scoreInputModal &&
                    <div className={styles.modalArea}>
                        <ScoreInputModal members={members} scoreInputModalToggle={scoreInputModalToggle} reloadMembers={loadMembers}></ScoreInputModal>    
                    </div>
                }
            </div>
        </>
    )
}

export default Scoreboard;