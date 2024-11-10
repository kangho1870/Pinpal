import { useSearchParams } from "react-router-dom";
import styles from "../../css/components/modal/ScoreInputModal.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import useScoreboard from "../../../stores/useScoreboardStore";
import useSignInStore from "../../../stores/useSignInStore";
import { scoreInputRequest } from "../../../apis";
import { useCookies } from "react-cookie";
import { ACCESS_TOKEN } from "../../../constants";

export default function ScoreInputModal({ getScoreboard }) {
    const [cookies] = useCookies();
    const token = cookies[ACCESS_TOKEN];
    const [searchParams] = useSearchParams();
    const gameId = searchParams.get('gameId');
    const { members, toggleScoreInputModal } = useScoreboard();
    const { signInUser } = useSignInStore();
    
    const memberId = signInUser?.id || null;

    const member = members.find(member => member.memberId == memberId);
    
    const [game1Score, setGame1Score] = useState(member?.game1 || "");
    const [game2Score, setGame2Score] = useState(member?.game2 || "");
    const [game3Score, setGame3Score] = useState(member?.game3 || "");
    const [game4Score, setGame4Score] = useState(member?.game4 || "");

    const scores = {
        game1Score : game1Score,
        game2Score : game2Score,
        game3Score : game3Score,
        game4Score : game4Score
    }

    const handleScoreChange = (e, setScore) => {
        const { value } = e.target;
        setScore(value);
    };

    const saveScoreResponse = (resposenBody) => {
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
        toggleScoreInputModal();
    }

    const saveScoreRequest = () => {
        if(members.some((member) => member.memberId === memberId)) {
            scoreInputRequest(gameId, memberId, scores, token).then(saveScoreResponse);
        } else {
            alert("게임에 참석하지 않았습니다.")
        }
    }

    return (
        <div className={styles.modalContainer}>
            <div className={styles.closeBox} onClick={toggleScoreInputModal}>
                <i class="fa-regular fa-circle-xmark"></i>
            </div>
            <div className={styles.modalArea}>
                <div className={styles.scoreInputTitle}>
                    <p>점수 입력</p>
                </div>
                <div className={styles.inputArea}>
                    <div className={styles.inputContainer}>
                        <div className={styles.inputBox}>
                            <span className={styles.gameTitle}>1G</span>
                            <input 
                                className={`${styles.scoreInput} ${game1Score >= 200 ? styles.redText : ""}`}
                                value={game1Score}
                                onChange={(e) => handleScoreChange(e, setGame1Score)}
                            />
                        </div>
                        <div className={styles.inputBox}>
                            <span className={styles.gameTitle}>2G</span>
                            <input 
                                className={`${styles.scoreInput} ${game2Score >= 200 ? styles.redText : ""}`}
                                value={game2Score}
                                onChange={(e) => handleScoreChange(e, setGame2Score)}
                            />
                        </div>
                    </div>
                    <div className={styles.inputContainer}>
                        <div className={styles.inputBox}>
                            <span className={styles.gameTitle}>3G</span>
                            <input 
                                className={`${styles.scoreInput} ${game3Score >= 200 ? styles.redText : ""}`}
                                value={game3Score}
                                onChange={(e) => handleScoreChange(e, setGame3Score)}
                            />
                        </div>
                        <div className={styles.inputBox}>
                            <span className={styles.gameTitle}>4G</span>
                            <input 
                                className={`${styles.scoreInput} ${game4Score >= 200 ? styles.redText : ""}`}
                                value={game4Score}
                                onChange={(e) => handleScoreChange(e, setGame4Score)}
                            />
                        </div>
                    </div>
                </div>
                <div className={styles.btnBox}>
                    <button className={styles.btns} onClick={toggleScoreInputModal}>취소</button>
                    <button className={styles.btns} onClick={saveScoreRequest}>확인</button>
                </div>
            </div>
        </div>
    )
}
