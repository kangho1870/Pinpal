import { useEffect, useState } from "react";
import styles from "../css/components/WaitingRoom.module.css";

function WaitingRoom({ members = [], memberId }) {
    const [sideGrade1, setSideGrade1] = useState(false);
    const [sideAvg, setSideAvg] = useState(false);
    const [confirmedJoin, setConfirmedJoin] = useState(false);


    useEffect(() => {
        members.forEach(member => {
            if(member.memberId == memberId) {
                setSideGrade1(prev => prev || member.sideGrade1);
                setSideAvg(prev => prev || member.sideAvg);
                setConfirmedJoin(prev => prev || member.confirmedJoin);
            }
        });
    })
    console.log(members)
    return (
        <>
            <div className={styles.mainBox}>
                <div className={styles.contentsBox}>
                    <div className={styles.leftSide}>
                        {members
                            .filter(member => member.confirmedJoin === true)
                            .map((member, i) => (
                            <div key={i} className={styles.userBox}>
                                <div className={styles.noBox}>
                                    <p>{i + 1}</p>
                                </div>
                                <div className={styles.nameCardBox}>
                                    <div className={styles.checkIcon}>
                                        <i class="fa-regular fa-circle-check fa-xl"></i>
                                        <h3 style={{marginLeft: "10px"}}>{member.grade == 0 ? null : member.grade + "군"}</h3>
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
                    <div className={styles.rightSide}>
                        <div className={styles.settingBoxTitle}>
                            <h4>설정</h4>
                        </div>
                        <div className={styles.userSettingBox}>
                            <div>
                                <div className={styles.settingBox}>
                                    <div className={styles.sideJoinBox}>
                                        <div className={styles.checkBox}>
                                            <h4>1군 사이드</h4>
                                        </div>
                                        <button className={styles.sideJoinBtn}><h4>{!sideGrade1 ? "참가" : "취소"}</h4></button>
                                    </div>
                                </div>
                                <div className={styles.settingBox}>
                                    <div className={styles.sideJoinBox}>
                                        <div className={styles.checkBox}>
                                            <h4>에버 사이드</h4>
                                        </div>
                                        <button className={styles.sideJoinBtn}><h4>{!sideAvg ? "참가" : "취소"}</h4></button>
                                    </div>
                                </div>
                                <div className={styles.settingBox}>
                                    <div className={styles.btnBox}>
                                        <button className={styles.settingBtn}>
                                            <div><i class="fa-solid fa-user-check"></i></div>
                                        </button>
                                        <button className={styles.settingBtn}>
                                            <div><i class="fa-solid fa-right-from-bracket fa-xl"></i></div>
                                        </button>
                                    </div>
                                </div>
                                <div>
                                    <button className={styles.settingBtn2}>
                                        <div><h4>사이드 참가자</h4></div>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className={styles.settingBoxTitle}>
                            <h4>게임 설정</h4>
                        </div>
                        <div className={styles.userSettingBox}>
                            <div className={styles.gameSettingBox}>
                                <button className={styles.settingBtn2}><div><h4>군 설정</h4></div></button>
                                <button className={styles.settingBtn2}><div><h4>팀 설정</h4></div></button>
                            </div>
                        </div>
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
                                            <h4 className={styles.userInfo}>{member.memberName}</h4>
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
        </>
    )
}

export default WaitingRoom;