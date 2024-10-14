import { useState } from "react";
import styles from "../../css/components/modal/ConfirmModal.module.css";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";

export default function ConfirmModal({ confirmSetModalToggle, reloadMembers }) {
    const location = useLocation();  // useLocation 훅으로 현재 URL 정보를 가져옵니다.
    
    // URLSearchParams를 사용하여 쿼리 파라미터를 가져옵니다.
    const searchParams = new URLSearchParams(location.search);
    const gameId = searchParams.get("gameId");
    const memberId = searchParams.get("memberId");

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

    const confirmBtnClickHandler = () => {
        if(code == "") {
            setFailCount(failCount + 1);
            return;
        }
        axios.post(`/scoreboard/confirmedJoin?gameId=${gameId}&memberId=${memberId}`, { code : code })
        .then(response => {
            console.log(response)
            if(response.data.data == true) {
                confirmResultClickHandler();
            }
            else if(response.data.data == false) {
                setValidCode(!validCode);
            }
        })
        .catch(error => {
            console.log(error)
        })
        
    }

    return (
        <>
            <div className={styles.modalContainer}>
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
                        <button className={styles.btn} onClick={confirmSetModalToggle}>취소</button>
                        <button className={styles.btn} onClick={confirmBtnClickHandler}>확인</button>
                    </div>
                </div>
            </div>
            {confirmResult &&
                <ConfirmResultModal confirmSetModalToggle={confirmSetModalToggle} confirmResultClickHandler={confirmResultClickHandler} reloadMembers={reloadMembers}></ConfirmResultModal>
            }
        </>
    )
}

function ConfirmResultModal({ confirmSetModalToggle, confirmResultClickHandler, reloadMembers }) {

    const btnClickHandler = () => {
        confirmResultClickHandler();
        reloadMembers();
        confirmSetModalToggle();
    }

    return (
        <>
            <div className={styles.resultModal}>
                <h3>참석이 확정되었습니다.</h3>
                <button className={styles.resultBtn} onClick={btnClickHandler}>확인</button>
            </div>
        </>
    )
}