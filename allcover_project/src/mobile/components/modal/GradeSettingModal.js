import { useEffect, useState } from "react";
import axios from "axios";
import styles from "../../css/components/modal/GradeSettingModal.module.css";
import { useSearchParams } from "react-router-dom";
import useScoreboard from "../../../stores/useScoreboardStore";
import { useCookies } from "react-cookie";
import { ACCESS_TOKEN } from "../../../constants";
import { gradeSettingRequest } from "../../../apis";


function GradeSettingModal({ getScoreboard }) {
    const [cookies] = useCookies();
    const token = cookies[ACCESS_TOKEN];
    const [searchParams] = useSearchParams();
    const gameId = searchParams.get("gameId");
    const { members, toggleGradeModal } = useScoreboard();
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
        console.log(memberId)
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

    const gradeSettingResponse = (resposenBody) => {
        const message = 
            !resposenBody ? '서버에 문제가 있습니다.' :
            resposenBody.code === 'AF' ? '잘못된 접근입니다.' :
            resposenBody.code === 'DBE' ? '서버에 문제가 있습니다.' : 
            resposenBody.code === 'ND' ? '잘못된 접근입니다.' :'';

        const isSuccessed = resposenBody.code === 'SU';
        if (!isSuccessed) {
            alert(message);
            return;
        }
        getScoreboard();
        toggleGradeModal();
    }

    const changeGrade = () => {
        gradeSettingRequest(gameId, updatedMembers, token).then(gradeSettingResponse)
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
                                        {selectGrade + "군"}
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
                            <div className={styles.gradeTitle}>
                                볼러
                            </div>
                            <div className={styles.memberList}>
                                {updatedMembers
                                    .filter(member => member.grade == 0)
                                    .map((v, i) => (
                                        <>
                                            <div 
                                                key={v.memberId}
                                                className={styles.memberBox}
                                                onClick={() => setGradeByMember(v.memberId)}
                                            >
                                                <h5>{i + 1}</h5>
                                                <h5>{v.memberName}</h5>
                                                <h5>{v.memberAvg}</h5>
                                            </div>

                                        </>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className={styles.btnBox}>
                        <button className={styles.settingBtn} onClick={toggleGradeModal}>취소</button>
                        <button className={styles.settingBtn} onClick={changeGrade}>
                            저장
                        </button>
                    </div>
                    
                </div>
            </div>
        </>
    );
}

export default GradeSettingModal;
