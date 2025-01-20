import { useEffect, useState } from "react";
import axios from "axios";
import styles from "../../css/components/modal/GradeSettingModal.module.css";
import { useSearchParams } from "react-router-dom";
import useScoreboard from "../../../stores/useScoreboardStore";
import { useCookies } from "react-cookie";
import { ACCESS_TOKEN } from "../../../constants";
import { teamRandomSettingRequest, teamSettingRequest } from "../../../apis";

function TeamSettingModal({ getScoreboard }) {
    const [cookies] = useCookies();
    const token = cookies[ACCESS_TOKEN];
    const [searchParams] = useSearchParams();
    const gameId = searchParams.get("gameId");
    const { members, toggleTeamModal } = useScoreboard();
    const [selectGrade, setSelectGrade] = useState(1);
    const [teamBtns, setTeamBtns] = useState([1, 2, 3, 4, 5, 6, 7, 8]);
    const [updatedMembers, setUpdatedMembers] = useState([]);
    const [teamSetModal, setTeamSetModal] = useState(false);
    const socket = new WebSocket(`ws://192.168.35.151:8000/scoreboard/${gameId}`);

    useEffect(() => {
        if (members && members.length > 0) {
            setUpdatedMembers(members);
        }
    }, [members]);

    const clickGradeBtn = (i) => {
        setSelectGrade(i);
    };

    const setGradeByMember = (memberId) => {
        setUpdatedMembers(prev =>
            prev.map(member =>
                member.memberId === memberId ? { ...member, teamNumber: selectGrade } : member
            )
        );
    };

    const resetGradeByMember = (memberId) => {
        setUpdatedMembers(prev =>
            prev.map(member =>
                member.memberId === memberId ? { ...member, teamNumber: 0 } : member
            )
        );
    };

    const randomTeamSetting = (totalTeamCount) => {
        setUpdatedMembers(prev =>
            prev.map(member => ({
                ...member,
                teamNumber: 0
            }))
        );

        const gradeGroups = {};
        members.forEach(member => { // members를 직접 참조
            if (!gradeGroups[member.grade]) {
                gradeGroups[member.grade] = [];
            }
            gradeGroups[member.grade].push(member);
        });
    
        const assignTeams = (members, totalTeamCount) => {
            let teamIndex = 1;
            const shuffledMembers = [...members].sort(() => Math.random() - 0.5);
    
            return shuffledMembers.map(member => {
                const updatedMember = {
                    ...member,
                    teamNumber: teamIndex
                };
                teamIndex = (teamIndex % totalTeamCount) + 1;
                return updatedMember;
            });
        };
    
        const newMembers = [];
    
        Object.keys(gradeGroups).forEach(grade => {
            newMembers.push(...assignTeams(gradeGroups[grade], totalTeamCount));
        });
    
        setUpdatedMembers(newMembers);
        changeRandomTeamSocket(newMembers); 
    };
    
    const teamRandomSetModalToggle = () => {
        setTeamSetModal(!teamSetModal);
    };

    // const teamSettingResponse = (resposenBody) => {
    //     const message = 
    //         !resposenBody ? '서버에 문제가 있습니다.' :
    //         resposenBody.code === 'AF' ? '잘못된 접근입니다.' :
    //         resposenBody.code === 'DBE' ? '서버에 문제가 있습니다.' : 
    //         resposenBody.code === 'ND' ? '잘못된 접근입니다.' :'';

    //     const isSuccessed = resposenBody.code === 'SU';
    //     if (!isSuccessed) {
    //         alert(message);
    //         return;
    //     }
    //     getScoreboard();
    //     toggleTeamModal();
    // }

    const changeTeamSocket = () => {
        const updatedTeamNumber = updatedMembers.map(member => ({
            memberId: member.memberId,
            teamNumber: member.teamNumber,
        }));
        const updateTeam = {
            action: "updateTeamNumber",
            members: updatedTeamNumber,
            gameId: gameId
        }
        
        socket.send(JSON.stringify(updateTeam));
        toggleTeamModal();
    };

    const changeRandomTeamSocket = (newMembers) => {
        const updatedTeamNumber = newMembers.map(member => ({
            memberId: member.memberId,
            teamNumber: member.teamNumber,
        }));
        const updateTeam = {
            action: "updateTeamNumber",
            members: updatedTeamNumber,
            gameId: gameId
        }
        socket.send(JSON.stringify(updateTeam));
        toggleTeamModal();
    };

    // const teamRandomSettingResponse = (resposenBody) => {
    //     const message = 
    //         !resposenBody ? '서버에 문제가 있습니다.' :
    //         resposenBody.code === 'AF' ? '잘못된 접근입니다.' :
    //         resposenBody.code === 'DBE' ? '서버에 문제가 있습니다.' : 
    //         resposenBody.code === 'ND' ? '잘못된 접근입니다.' :'';

    //     const isSuccessed = resposenBody.code === 'SU';
    //     if (!isSuccessed) {
    //         alert(message);
    //         return;
    //     }
    //     getScoreboard();
    //     teamRandomSetModalToggle();
    //     toggleTeamModal();
    // }

    // const saveTeamChanges = () => {
    //     teamSettingRequest(gameId, updatedMembers, token).then(teamSettingResponse);
    // };

    // const saveRandomChanges = (newMembers) => {
    //     const updatedMembers = newMembers;
    //     teamRandomSettingRequest(gameId, updatedMembers, token).then(teamRandomSettingResponse)
    // };

    return (
        <>
            <div className={styles.modalArea}>
                <div className={styles.modalBox}>
                    <div className={styles.gradeSettingBox}>
                        <div className={styles.gradeSelectArea}>
                            <div className={styles.shuffleBox} onClick={teamRandomSetModalToggle}>
                                <i className="fa-solid fa-arrows-rotate"></i>
                            </div>
                            <div className={styles.gradeList}>
                                {teamBtns.map((v, i) => (
                                    <div 
                                        key={i}
                                        className={`${styles.gradeDiv} ${v === selectGrade ? styles.selectGrade : ""}`}
                                        onClick={() => clickGradeBtn(v)}
                                        >
                                        <p>{v + "팀"}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className={styles.gradeArea}>
                            <div className={styles.gradeBox}>
                                <div className={styles.grades}>
                                    <div className={styles.gradeTitle}>
                                        <h4>{selectGrade + "팀"}</h4>
                                    </div>
                                    <div className={styles.gradeMemberList}>
                                        {updatedMembers
                                            .filter(member => member.teamNumber == selectGrade)
                                            .map((v, i) => (
                                                <div 
                                                    key={v.memberId}
                                                    className={styles.gradeMember}
                                                    onClick={() => resetGradeByMember(v.memberId)}>
                                                        <h5>{i + 1}</h5>
                                                        <h5>{v.memberName}</h5>
                                                        <h5>{v.memberAvg}</h5>
                                                </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.select}>
                            <i className="fa-solid fa-right-left"></i>
                        </div>
                        <div className={styles.memberArea}>
                            <div className={styles.gradeTitle}>볼러</div>
                            <div className={styles.memberList}>
                                {updatedMembers
                                    .filter(member => member.teamNumber == 0)
                                    .map((v, i) => (
                                        <div 
                                            key={v.memberId}
                                            className={styles.memberBox}
                                            onClick={() => setGradeByMember(v.memberId)}
                                        >
                                            <h5>{i + 1}</h5>
                                            <h5>{v.memberName}</h5>
                                            <h5>{v.memberAvg}</h5>
                                        </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className={styles.btnBox}>
                        <button className={styles.settingBtn} onClick={toggleTeamModal}>취소</button>
                        <button className={styles.settingBtn} onClick={changeTeamSocket}>저장</button>
                    </div>
                </div>
            </div>

            {teamSetModal && 
                <div className={styles.teamSetModal}>
                    <TeamSetModal teamRandomSetModalToggle={teamRandomSetModalToggle} randomTeamSetting={randomTeamSetting}></TeamSetModal>
                </div>
            }
        </>
    );
}

export default TeamSettingModal;

function TeamSetModal({ teamRandomSetModalToggle, randomTeamSetting }) {
    const [totalTeamCount, setTotalTeamCount] = useState("");

    const changeTotalTeamCount = (e) => {
        setTotalTeamCount(Number(e.target.value)); // totalTeamCount를 숫자로 변환
    };

    return (
        <>
            <div className={styles.teamModalContainer}>
                <div className={styles.modalHeader}>
                    <div className={styles.modalTitle}>
                        <p>총 팀수</p>
                    </div>
                    <div className={styles.inputBox}>
                        <input className={styles.countInput} onChange={(e) => changeTotalTeamCount(e)} placeholder="전체 팀 수를 적어주세요." />
                    </div>
                    <div className={styles.modalBtnBox}>
                        <button className={styles.btn} onClick={teamRandomSetModalToggle}>취소</button>
                        <button className={styles.btn} onClick={() => randomTeamSetting(totalTeamCount)}>확인</button>
                    </div>
                </div>
            </div>
        </>
    );
}

