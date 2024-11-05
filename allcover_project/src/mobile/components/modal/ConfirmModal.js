import { useEffect, useState } from "react";
import styles from "../../css/components/modal/ConfirmModal.module.css";
import { useSearchParams } from "react-router-dom";
import useSignInStore from "../../../stores/useSignInStore";
import { confirmCheckRequest } from "../../../apis";
import useScoreboard from "../../../stores/useScoreboardStore";
import { useCookies } from "react-cookie";
import { ACCESS_TOKEN } from "../../../constants";

export default function ConfirmModal({ getScoreboard }) {
    
    const [searchParams] = useSearchParams();
    const { signInUser } = useSignInStore();
    const [cookies] = useCookies();
    const token = cookies[ACCESS_TOKEN];
    const { members, toggleConfirmModal } = useScoreboard();
    const gameId = searchParams.get("gameId");

    const memberId = signInUser.id;

    const [isConfirm, setIsConfirm] = useState(false);
    const [code, setCode] = useState("");
    const [confirmResult, setConfirmResult] = useState(false);
    const [failCount, setFailCount] = useState(0);
    const [validCode, setValidCode] = useState(false);

    const codeChangeHandler = (e) => {
        setCode(e.target.value);
    }

    const confirmResultClickHandler = () => {
        setConfirmResult(!confirmResult);
    }

    const confirmCheckResponse = (resposenBody) => {
        const message = 
            !resposenBody ? '서버에 문제가 있습니다.' :
            resposenBody.code === 'AF' ? '잘못된 접근입니다.' :
            resposenBody.code === 'DBE' ? '서버에 문제가 있습니다.' : 
            resposenBody.code === 'ND' ? '잘못된 접근입니다.' :'';

        const isSuccessed = resposenBody.code === 'SU';
        if (!isSuccessed) {
            setValidCode(!validCode);
            alert(message);
            return;
        }
        alert("참석이 확정되었습니다.")
        getScoreboard();
        confirmResultClickHandler();
    }

    const confirmBtnClickHandler = () => {
        if(code == "") {
            setFailCount(failCount + 1);
            return;
        }
        confirmCheckRequest(gameId, memberId, code, token).then(confirmCheckResponse);
    }

    const findCurrentUser = () => {
        const user = members.find(member => member.memberId == memberId);
        if(user) {
            setIsConfirm(user.confirmedJoin);
        }
    }

    useEffect(() => {
        findCurrentUser();
    }, [members])

    return (
        <>
            <div className={styles.modalContainer}>
                {!isConfirm && 
                    <div className={styles.modalBox}>
                        <div className={styles.mainBox}>
                            <div className={styles.codeBox}>
                                <div><h2 className={styles.title}>참석확정코드 입력</h2></div>
                                <div><span className={styles.subTitle}>확정코드 8자리를 입력해 주세요.</span></div>
                                <input className={styles.codeInput} placeholder="●●●●●●●●" onChange={codeChangeHandler} maxLength={8}></input>
                                {failCount > 0 && code.length == 0 &&
                                    <span style={{color:"red"}}>코드를 입력해 주세요.</span>
                                }
                                {(validCode > 0 && code.length !== 0) &&
                                    <span style={{color:"red"}}>코드가 일치하지 않습니다.</span>
                                }
                            </div>
                        </div>
                        <div className={styles.btnBox}>
                            <button className={styles.btn} onClick={toggleConfirmModal}>취소</button>
                            <button className={styles.btn} onClick={confirmBtnClickHandler}>확인</button>
                        </div>
                    </div>
                }
                {isConfirm &&
                    <div className={styles.modalBox}>
                        <div className={styles.mainBox}>
                            <div className={styles.codeBox}>
                                <div><h2 className={styles.title}>참석이 확정되었습니다.</h2></div>
                            </div>
                        </div>
                        <div className={styles.btnBox}>
                            <button className={styles.btn} onClick={toggleConfirmModal}>확인</button>
                        </div>
                    </div>
                }
            </div>
            {/* {confirmResult &&
                <ConfirmResultModal confirmModal={confirmModal} confirmResultClickHandler={confirmResultClickHandler} getScoreboard={getScoreboard}></ConfirmResultModal>
            } */}
        </>
    )
}

// function ConfirmResultModal({ confirmModal, confirmResultClickHandler, getScoreboard }) {

//     const btnClickHandler = () => {
//         confirmResultClickHandler();
//         getScoreboard();
//         confirmModal();
//     }

//     return (
//         <>
//             <div className={styles.resultModal}>
//                 <h3>참석이 확정되었습니다.</h3>
//                 <button className={styles.resultBtn} onClick={btnClickHandler}>확인</button>
//             </div>
//         </>
//     )
// }