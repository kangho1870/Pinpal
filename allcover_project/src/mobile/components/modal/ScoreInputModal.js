import { useSearchParams } from "react-router-dom";
import styles from "../../css/components/modal/ScoreInputModal.module.css";
import { useState, useEffect } from "react";
import axios from "axios";

export default function ScoreInputModal({ members, scoreInputModalToggle, reloadMembers }) {
    const [searchParams] = useSearchParams();
    const memberId = searchParams.get('memberId');
    const gameId = searchParams.get('gameId');

    const [games] = useState(["1G", "2G", "3G", "4G"]);

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

    const saveScore = () => {
        axios.post(`/scoreboard/saveScore?memberId=${memberId}&gameId=${gameId}`, scores)
            .then(response => {
                reloadMembers();
                scoreInputModalToggle();
            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <div className={styles.modalContainer}>
            <div className={styles.closeBox} onClick={scoreInputModalToggle}>
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
                    <button className={styles.btns} onClick={scoreInputModalToggle}>취소</button>
                    <button className={styles.btns} onClick={saveScore}>확인</button>
                </div>
            </div>
        </div>
    )
}
