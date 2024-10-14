import { useEffect, useState } from "react";
import axios from "axios";
import styles from "../../css/components/modal/GradeSettingModal.module.css";

function GradeSettingModal({ members, gameId, gradeSetModalToggle, reloadMembers }) {
    const [selectGrade, setSelectGrade] = useState(1);
    const [gradeBtns, setGradeBtns] = useState([1, 2, 3, 4, 5, 6]);
    const [updatedMembers, setUpdatedMembers] = useState([]);

    useEffect(() => {
        if (members && members.length > 0) {
            setUpdatedMembers(members);
        }
    }, [members]);
    const clickGradeBtn = (i) => {
        setSelectGrade(i);
    }

    const setGradeByMember = (memberId) => {
        setUpdatedMembers(prev => 
            prev.map(member =>
                member.memberId === memberId ? { ...member, grade: selectGrade } : member
            )
        );
    }

    const resetGradeByMember = (memberId) => {
        setUpdatedMembers(prev => 
            prev.map(member =>
                member.memberId === memberId ? { ...member, grade: 0 } : member
            )
        );
    }

    const saveChanges = () => {
        axios.post(`/scoreboard/setGrade?gameId=${gameId}`, { updatedMembers })
            .then(response => {
                console.log("변경 사항이 저장되었습니다.");
                reloadMembers();
                gradeSetModalToggle();
            })
            .catch(error => {
                console.error("오류 발생!", error);
            });
    }

    return (
        <>
            <div className={styles.modalArea}>
                <div className={styles.modalBox}>
                    <div className={styles.gradeSettingBox}>
                        <div className={styles.gradeSelectArea}>
                            <div className={styles.gradeList}>
                                {gradeBtns.map((v, i) => (
                                    <div 
                                        key={i}
                                        className={`${styles.gradeDiv} ${v === selectGrade ? styles.selectGrade : ""}`}
                                        onClick={() => clickGradeBtn(v)}
                                        >
                                        <p>{v + "군"}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className={styles.gradeArea}>
                            <div className={styles.gradeBox}>
                                <div className={styles.grades}>
                                    <div className={styles.gradeTitle}>
                                        <h4>{selectGrade + "군"}</h4>
                                    </div>
                                    <div className={styles.gradeMemberList}>
                                        {updatedMembers
                                            .filter(member => member.grade == selectGrade)
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
                            <div>
                                볼러
                            </div>
                            <div className={styles.memberList}>
                                {updatedMembers
                                    .filter(member => member.grade == 0)
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
                        <button className={styles.settingBtn} onClick={gradeSetModalToggle}>취소</button>
                        <button className={styles.settingBtn} onClick={saveChanges}>
                            저장
                        </button>
                    </div>
                    
                </div>
            </div>
        </>
    );
}

export default GradeSettingModal;
