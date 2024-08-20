import { useState } from "react";
import styles from "../css/components/RankingBoard.module.css";

function RankingBoard() {
    const [scores, setScores] = useState([
        { grade: 1, gameScores: [200, 210, 180, 190], average: 195, total: 780 },
        { grade: 2, gameScores: [200, 210, 180, 190], average: 195, total: 800 },
        { grade: 1, gameScores: [200, 210, 180, 190], average: 195, total: 780 },
        { grade: 1, gameScores: [200, 210, 180, 190], average: 195, total: 800 },
        { grade: 3, gameScores: [200, 210, 180, 190], average: 195, total: 780 },
        { grade: 1, gameScores: [200, 210, 180, 190], average: 195, total: 780 },
        { grade: 4, gameScores: [200, 210, 180, 190], average: 195, total: 800 }
    ]);

    const getCardClass = (grade) => {
        switch (grade) {
            case 1:
                return styles.scoreCard1;
            case 2:
                return styles.scoreCard2;
            case 3:
                return styles.scoreCard3;
            case 4:
                return styles.scoreCard4;
            default:
                return "";
        }
    };

    return (
        <>
            <div className={styles.main}>
                <div className={styles.scoreCardBox}>
                    {scores.map((score, index) => (
                        <div key={index} className={styles.scoreCardList}>
                            <div className={styles.scoreCardTitle}>
                                <h3>{index + 1}</h3>
                            </div>
                            <div className={`${styles.scoreCardTitle} ${getCardClass(score.grade)}`}>
                                <div className={styles.nameBox}>
                                    <div className={styles.subTitle}>
                                        <span>군</span>
                                    </div>
                                    <div>
                                        <h2>{score.grade}군</h2>
                                    </div>
                                </div>
                                <div className={styles.nameBox}>
                                    <div className={styles.subTitle}>
                                        <span>이름</span>
                                    </div>
                                    <div>
                                        <h2>강호</h2>
                                    </div>
                                </div>
                                <div className={styles.nameBox}>
                                    <div className={styles.subTitle}>
                                        <span>점수</span>
                                    </div>
                                    <div className={styles.scoreBox}>
                                        <div className={styles.scoreInfo}>
                                            {score.gameScores.slice(0, 2).map((gameScore, i) => (
                                                <div key={i} className={styles.score}>
                                                    <span>{i + 1}Game</span>
                                                    <p className={gameScore >= 200 ? styles.redText : ""}>
                                                        {gameScore}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                        <div className={styles.scoreInfo}>
                                            {score.gameScores.slice(2).map((gameScore, i) => (
                                                <div key={i + 2} className={styles.score}>
                                                    <span>{i + 3}Game</span>
                                                    <p className={gameScore >= 200 ? styles.redText : ""}>
                                                        {gameScore}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.nameBox}>
                                    <div className={styles.subTitle}>
                                        <span>평균</span>
                                    </div>
                                    <div>
                                        <h2 className={score.average >= 200 ? styles.redText : ""}>
                                            {score.average}
                                        </h2>
                                    </div>
                                </div>
                                <div className={styles.nameBox}>
                                    <div className={styles.subTitle}>
                                        <span>총점</span>
                                    </div>
                                    <div>
                                        <h2 className={score.total >= 800 ? styles.redText : ""}>
                                            {score.total}
                                        </h2>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.scoreWith}>
                                <h3>{index == 0 ? "-" : ("-" + index + 2)}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className={styles.modalArea}>
                <div className={styles.modalBox}>
                    <div className={styles.modal}>
                        <i className="fa-solid fa-ranking-star"></i>
                        <span>사이드 순위</span>
                    </div>
                </div>
                <div className={styles.modalBox}>
                    <div className={styles.modal}>
                        <i className="fa-solid fa-plus-minus"></i>
                        <span>점수 입력</span>
                    </div>
                </div>
            </div>
        </>
    );
}

export default RankingBoard;
