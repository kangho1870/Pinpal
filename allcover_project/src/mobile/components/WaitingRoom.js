import { useEffect, useState } from "react";
import styles from "../css/components/WaitingRoom.module.css";
import axios from "axios";
import useScoreboard from "../../stores/useScoreboardStore";  // 스토어 임포트
import useSignInStore from "../../stores/useSignInStore";
import { useSearchParams } from "react-router-dom";
import { scoreCountingStopRequest, sideJoinRequest } from "../../apis";
import { useCookies } from "react-cookie";
import { ACCESS_TOKEN } from "../../constants";

function WaitingRoom({ getScoreboard }) {
    const { 
        members = [], reloadMembers, 
        toggleGradeModal, toggleTeamModal, toggleConfirmModal, toggleSideJoinUserModal
    } = useScoreboard();  // useScoreboard로 상태와 함수 가져오기

    const { signInUser } = useSignInStore();
    const [searchParams] = useSearchParams();
    const [cookies] = useCookies();
    const token = cookies[ACCESS_TOKEN];

    const [sideGrade1, setSideGrade1] = useState(false);
    const [sideAvg, setSideAvg] = useState(false);
    const [confirmedJoin, setConfirmedJoin] = useState(false);
    const memberId = signInUser?.id || null;
    const gameId = searchParams.get("gameId");
    const roles = signInUser?.clubRole ? signInUser.clubRole : null;
    const socket = new WebSocket(`ws://192.168.35.151:8000/scoreboard/${gameId}`);

    

    const sideJoinBtns = ["grade1", "avg"];

    const findCurrentUser = () => {
        const user = members.find(member => member.memberId == memberId);
        if(user) {
            setSideGrade1(user.sideGrade1);
            setSideAvg(user.sideAvg);
            setConfirmedJoin(user.confirmedJoin);
        }
    };

    useEffect(() => {
        findCurrentUser();
    }, [members]);

    const joinSideSocket = (i) => {
        const updateSide = {
            action: "updateSide",
            gameId: gameId,
            memberId: memberId,
            sideType: sideJoinBtns[i]
        }
        
        socket.send(JSON.stringify(updateSide));
    };

    const sideJoinResponse = (resposenBody) => {
        const message = 
            !resposenBody ? '서버에 문제가 있습니다.' :
            resposenBody.code === 'AF' ? '잘못된 접근입니다.' :
            resposenBody.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

        const isSuccessed = resposenBody.code === 'SU';
        if (!isSuccessed) {
            alert(message);
            return;
        }
        getScoreboard();
    };

    const sideJoinBtnsClick = (i) => {
        if(members.some((member) => member.memberId === memberId)) {
            sideJoinRequest(gameId, memberId, sideJoinBtns[i], token).then(sideJoinResponse);
        } else {
            alert("게임에 참석하지 않았습니다.")
        }
    };

    const scoreCountingStopResponse = (resposenBody) => {
        const message = 
            !resposenBody ? '서버에 문제가 있습니다.' :
            resposenBody.code === 'AF' ? '잘못된 접근입니다.' :
            resposenBody.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

        const isSuccessed = resposenBody.code === 'SU';
        if (!isSuccessed) {
            alert(message);
            return;
        }

        getScoreboard();
    };

    const scoreCountingStop = () => {
        if(members.some((member) => member.memberId === memberId)) {
            scoreCountingStopRequest(gameId, token).then(scoreCountingStopResponse);
        } else {
            alert("게임에 참석하지 않았습니다.")
        }
    }

    return (
        <div className={styles.mainBox}>
            <div className={styles.contentsBox}>
                <div className={styles.leftSide}>
                    <div className={styles.settingBoxTitle}>
                        <h4>확정 볼러</h4>
                    </div>
                    <div className={styles.confirmedMemberBox}>
                        {members
                            .filter(member => member.confirmedJoin === true)
                            .map((member, i) => (
                                <div key={i} className={styles.userBox}>
                                    <div className={styles.noBox}>
                                        <p>{i + 1}</p>
                                    </div>
                                    <div className={styles.nameCardBox}>
                                        <div className={styles.checkIcon}>
                                            <i className="fa-regular fa-circle-check fa-xl" style={{color:"#63E6BE"}}></i>
                                            <h3 style={{ marginLeft: "2px" }}>{member.grade == 0 ? null : member.grade + "군"}</h3>
                                        </div>
                                        <div className={styles.description}>
                                            <h2>{member.memberName}</h2>
                                        </div>
                                        <div className={styles.description}>
                                            <p>{member.memberAvg}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
                <div className={styles.rightSide}>
                    <div className={styles.settingBoxTitle}>
                        <h4>설정</h4>
                    </div>
                    <div className={styles.userSettingBox}>
                        <div>
                            {sideJoinBtns.map((v, i) => (
                                <div key={i} className={styles.settingBox}>
                                    <div className={styles.sideJoinBox}>
                                        <div className={styles.checkBox}>
                                            <h4>{v == "grade1" ? "1군 사이드" : "에버 사이드"}</h4>
                                        </div>
                                        <button className={`${styles.sideJoinBtn} ${v === "grade1" && sideGrade1 ? styles.sideJoinedBtn : ""} ${v === "avg" && sideAvg ? styles.sideJoinedBtn : ""}`}
                                            onClick={() => joinSideSocket(i)}>
                                            <h4>
                                                {
                                                    v === "grade1" ? (!sideGrade1 ? "참가" : "취소")
                                                    : v === "avg" ? (!sideAvg ? "참가" : "취소")
                                                    : null
                                                }
                                            </h4>
                                        </button>
                                    </div>
                                </div>
                            ))}
                            <div className={styles.settingBox}>
                                <div className={styles.btnBox}>
                                    <button className={styles.settingBtn} onClick={toggleConfirmModal}>
                                        <div><i className="fa-solid fa-user-check"></i></div>
                                    </button>
                                    <button className={styles.settingBtn}>
                                        <div><i className="fa-solid fa-right-from-bracket fa-xl"></i></div>
                                    </button>
                                </div>
                            </div>
                            <div>
                                <button className={styles.settingBtn2} onClick={toggleSideJoinUserModal}>
                                    <div><h4>사이드 참가자</h4></div>
                                </button>
                            </div>
                        </div>
                    </div>
                    {(roles === "STAFF" || roles === "MASTER") &&
                        <>
                            <div className={styles.settingBoxTitle}>
                                <h4>게임 설정</h4>
                            </div>
                            <div className={styles.userSettingBox}>
                                <div className={styles.gameSettingBox}>
                                    <button className={styles.settingBtn2} onClick={toggleGradeModal}><div><h4>군 설정</h4></div></button>
                                    <button className={styles.settingBtn2} onClick={toggleTeamModal}><div><h4>팀 설정</h4></div></button>
                                </div>
                                <button className={styles.settingBtn2} onClick={scoreCountingStop}><div><h4>{members[0]?.scoreCounting ? "점수집계 종료" : "점수집계 재개"}</h4></div></button>
                            </div>
                        </>
                    }
                    <div className={styles.settingBoxTitle}>
                        <h4>대기 볼러</h4>
                    </div>
                    <div className={styles.userSettingBox}>
                        {members
                            .filter(member => member.confirmedJoin === false)
                            .map((member, i) => (
                                <div key={i} className={styles.waitingUser}>
                                    <div>
                                        <p>{i + 1}</p>
                                    </div>
                                    <div className={styles.waitingUserInfoBox}>
                                        <div className={styles.waitingUserDesBox}>
                                            <span className={styles.waitingSpan}>name</span>
                                            <div className={styles.memberBox}>
                                            <div className={styles.profileContainer}>
                                                <img className={styles.memberProfile} src={member.memberProfile} />
                                                {roles === "MASTER" && 
                                                    <img className={styles.staffImg} src={require("../../imges/club/master.png")} />
                                                }
                                                {roles === "STAFF" && 
                                                    <img className={styles.staffImg} src={require("../../imges/club/staff.png")} />
                                                }
                                            </div>
                                                <h4 className={styles.userInfo}>{member.memberName}</h4>
                                            </div>
                                        </div>
                                        <div className={styles.waitingUserDesBox}>
                                            <span className={styles.waitingSpan}>avg</span>
                                            <h4 className={styles.userInfo}>{member.memberAvg}</h4>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WaitingRoom;
