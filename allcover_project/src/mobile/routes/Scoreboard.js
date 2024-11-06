import { useEffect } from "react";
import RankingBoard from "../components/RankingBoard";
import WaitingRoom from "../components/WaitingRoom";
import styles from "../css/routes/Scoreboard.module.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import GradeSettingModal from "../components/modal/GradeSettingModal";
import TeamSettingModal from "../components/modal/TeamSettingModal";
import ConfirmModal from "../components/modal/ConfirmModal";
import SideGameJoinUsers from "../components/modal/SideGameJoinUsers";
import SideRankingModal from "../components/modal/SideRankingModal";
import ScoreInputModal from "../components/modal/ScoreInputModal";
import GameResult from "../components/GameResult";
import TeamScoreboard from "../components/TeamScoreboard";
import useSignInStore from "../../stores/useSignInStore";
import useScoreboard from "../../stores/useScoreboardStore";
import { getScoreboardMembers } from "../../apis";
import { useCookies } from "react-cookie";
import { ACCESS_TOKEN, ROOT_PATH } from "../../constants";
import { onClickBackBtn } from "../../hooks";

function Scoreboard() {
    const { signInUser } = useSignInStore();
    const [cookies] = useCookies();

    const { 
        members, gradeModal, teamModal, confirmModal, sideJoinUserModal,
        sideRankingModal, scoreInputModal, page, navTitle,
        setMembers, toggleGradeModal, toggleTeamModal, toggleConfirmModal,
        toggleSideJoinUserModal, toggleSideRankingModal, toggleScoreInputModal, setPage, clearMembers
    } = useScoreboard();

    const [searchParams] = useSearchParams();
    const navigator = useNavigate();
    const gameId = searchParams.get('gameId');
    const clubId = signInUser?.clubId || null;

    const loadMembers = () => {
        axios.get()
            .then(response => {
                const data = response.data.data;
                console.log(data)
                setMembers(data);
            })
            .catch(error => {
                console.log("error!!", error);
            });
    };

    const getScoreboardResponse = (resposenBody) => {
        const message = 
            !resposenBody ? '서버에 문제가 있습니다.' :
            resposenBody.code === 'AF' ? '잘못된 접근입니다.' :
            resposenBody.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

        const isSuccessed = resposenBody.code === 'SU';
        if (!isSuccessed) {
            alert(message);
            return;
        }

        const { members } = resposenBody;
        setMembers(members)
    };

    const getScoreboard = () => {
        const accessToken = cookies[ACCESS_TOKEN];
        if(!accessToken) return;
        getScoreboardMembers(gameId, clubId, accessToken).then(getScoreboardResponse);
    }

    useEffect(() => {
        if(cookies[ACCESS_TOKEN] == null) {
            alert("로그인이 필요한 서비스입니다.")
            navigator(ROOT_PATH);
        }
        getScoreboard();
        // return (
        //     clearMembers
        // )
    }, [signInUser]);

    const navBtnClickHandler = (index) => {
        setPage(index);
    };

    return (
        <>
            <div className={styles.container}>
                <div className={styles.topBox}>
                    <div onClick={() => onClickBackBtn(navigator)}>
                        <i class="fa-solid fa-chevron-left"></i>
                    </div>
                    <div>
                        <p>{members.length > 0 ? (
                            members[0].gameName
                        ) : ""}</p>
                    </div>
                    <div>
                        <i className="fa-solid fa-circle-exclamation"></i>
                    </div>
                </div>
                <div className={styles.main}>
                    <div className={styles.navBox}>
                        <div>
                            {navTitle.map((btn, index) => (
                                <button
                                    key={index}
                                    className={`${styles.navBtn} ${page === index ? styles.selectedBtn : ""}`}
                                    onClick={() => navBtnClickHandler(index)}
                                >
                                    {btn}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className={styles.contentsBox}>
                        {page === 0 && (
                            <WaitingRoom getScoreboard={getScoreboard}/>
                        )}
                        {page === 1 && (
                            <RankingBoard
                                members={members}
                                getScoreboard={getScoreboard}
                                sideRankingModalToggle={toggleSideRankingModal}
                                scoreInputModalToggle={toggleScoreInputModal}
                            />
                        )}
                        {page === 2 && <TeamScoreboard members={members} />}
                        {page === 3 && <GameResult members={members} />}
                        {page === 4 && <div>1</div>}
                    </div>
                </div>
                {gradeModal && (
                    <div className={styles.modalArea}>
                        <GradeSettingModal
                            getScoreboard={getScoreboard}
                        />
                    </div>
                )}
                {teamModal && (
                    <div className={styles.modalArea}>
                        <TeamSettingModal
                            getScoreboard={getScoreboard}
                        />
                    </div>
                )}
                {confirmModal && (
                    <div className={styles.modalArea}>
                        <ConfirmModal
                            getScoreboard={getScoreboard}
                        />
                    </div>
                )}
                {sideJoinUserModal && (
                    <div className={styles.modalArea}>
                        <SideGameJoinUsers
                            sideJoinSetModalToggle={toggleSideJoinUserModal}
                        />
                    </div>
                )}
                {sideRankingModal && (
                    <div className={styles.modalArea}>
                        <SideRankingModal
                            sideRankingModalToggle={toggleSideRankingModal}
                        />
                    </div>
                )}
                {scoreInputModal && (
                    <div className={styles.modalArea}>
                        <ScoreInputModal
                            getScoreboard={getScoreboard}
                        />
                    </div>
                )}
            </div>
        </>
    );
}

export default Scoreboard;
