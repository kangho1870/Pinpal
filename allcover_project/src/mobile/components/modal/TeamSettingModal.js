import { useEffect, useState } from "react";
import axios from "axios";
import styles from "../../css/components/modal/GradeSettingModal.module.css";

function TeamSettingModal({ members, gameId, teamSetModalToggle, reloadMembers }) {
    const [selectGrade, setSelectGrade] = useState(1);
    const [teamBtns, setTeamBtns] = useState([1, 2, 3, 4, 5, 6, 7, 8]);
    const [updatedMembers, setUpdatedMembers] = useState([]);
    const [teamSetModal, setTeamSetModal] = useState(false);

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
        // 모든 멤버의 teamNumber를 0으로 초기화
        setUpdatedMembers(prev =>
            prev.map(member => ({
                ...member,
                teamNumber: 0
            }))
        );
    
        // 멤버들을 grade별로 그룹화
        const gradeGroups = {};
        members.forEach(member => { // members를 직접 참조
            if (!gradeGroups[member.grade]) {
                gradeGroups[member.grade] = [];
            }
            gradeGroups[member.grade].push(member);
        });
    
        // teamNumber를 배정하는 로직
        const assignTeams = (members, totalTeamCount) => {
            let teamIndex = 1;
            const shuffledMembers = [...members].sort(() => Math.random() - 0.5); // 멤버를 랜덤으로 섞음
    
            return shuffledMembers.map(member => {
                const updatedMember = {
                    ...member,
                    teamNumber: teamIndex
                };
                teamIndex = (teamIndex % totalTeamCount) + 1; // teamIndex가 totalTeamCount 범위를 넘지 않게 순환
                return updatedMember;
            });
        };
    
        // 각 grade 그룹의 멤버들을 랜덤으로 팀 배정
        const newMembers = [];
    
        Object.keys(gradeGroups).forEach(grade => {
            newMembers.push(...assignTeams(gradeGroups[grade], totalTeamCount));
        });
    
        setUpdatedMembers(newMembers); // 상태 업데이트
        console.log(newMembers); // 변경된 멤버 로그 확인
        saveRandomChanges(newMembers); // 저장 시 변경된 멤버 목록을 전달
    };
    
    

    const teamRandomSetModalToggle = () => {
        setTeamSetModal(!teamSetModal);
    };

    const saveChanges = () => {
        axios.post(`/scoreboard/setTeam?gameId=${gameId}`, { updatedMembers })
            .then(response => {
                console.log("변경 사항이 저장되었습니다.");
                reloadMembers();
                teamRandomSetModalToggle();
                teamSetModalToggle();
            })
            .catch(error => {
                console.error("오류 발생!", error);
            });
    };

    const saveRandomChanges = (newMembers) => {
        axios.post(`/scoreboard/setTeam?gameId=${gameId}`, { updatedMembers: newMembers })
            .then(response => {
                console.log("변경 사항이 저장되었습니다.");
                reloadMembers();
                teamRandomSetModalToggle();
                teamSetModalToggle();
            })
            .catch(error => {
                console.error("오류 발생!", error);
            });
    };

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
                            <div>볼러</div>
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
                        <button className={styles.settingBtn} onClick={teamSetModalToggle}>취소</button>
                        <button className={styles.settingBtn} onClick={saveChanges}>저장</button>
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

