import { useState } from "react";
import styles from "../css/components/RankingBoard.module.css";

function RankingBoard({ members, sideRankingModalToggle, scoreInputModalToggle }) {
    const [scoreInputModal, setScoreInputModal] = useState(false);

    const getCardClass = (grade) => {
        switch (grade) {
            case 0:
                return styles.scoreCard0;
            case 1:
                return styles.scoreCard1;
            case 2:
                return styles.scoreCard2;
            case 3:
                return styles.scoreCard3;
            case 4:
                return styles.scoreCard4;
            case 5:
                return styles.scoreCard5;
            case 6:
                return styles.scoreCard6;    
            default:
                return "";
        }
    };

    function getAvgScore(...scores) {
        const validScores = scores.filter(score => score !== null && score !== undefined);
        const totalScore = validScores.reduce((acc, score) => acc + score, 0);
        
        if (validScores.length === 0) return 0;
    
        const avg = totalScore / validScores.length;
        return Number.isInteger(avg) ? avg : avg.toFixed(0);
    }

    const sortedMembers = [...members].sort((a, b) => {
        const totalA = (a.game1 || 0) + (a.game2 || 0) + (a.game3 || 0) + (a.game4 || 0);
        const totalB = (b.game1 || 0) + (b.game2 || 0) + (b.game3 || 0) + (b.game4 || 0);
        return totalB - totalA;
    });

    const topTotalScore = sortedMembers.length > 0 
        ? (sortedMembers[0].game1 || 0) + (sortedMembers[0].game2 || 0) + (sortedMembers[0].game3 || 0) + (sortedMembers[0].game4 || 0) 
        : 0;

    return (
        <div className={styles.rankingBoardMain}>
            <div className={styles.scoreCardBox}>
                {sortedMembers.map((member, index) => {
                    const memberTotalScore = (member.game1 || 0) + (member.game2 || 0) + (member.game3 || 0) + (member.game4 || 0);
                    const scoreDifference = topTotalScore - memberTotalScore;
                    return (
                        <div key={index} className={styles.scoreCardList}>
                            <div className={styles.scoreCardTitle}>
                                <h3>{index + 1}</h3>
                            </div>
                            <div className={`${styles.scoreCardTitle} ${getCardClass(member.grade)}`}>
                                <div className={styles.memberCardBox}>
                                    <div className={styles.memberCard}>
                                        <span className={styles.infoTitle}>군</span>
                                        <p className={styles.info}>{member.grade}군</p>
                                    </div>
                                    <div className={styles.memberCard}>
                                        <span className={styles.infoTitle}>이름</span>
                                        <p className={styles.info}>{member.memberName}</p>
                                    </div>
                                    <div className={styles.memberCard}>
                                        <span className={styles.infoTitle}>에버</span>
                                        <p className={styles.info}>{member.memberAvg}</p>
                                    </div>
                                    <div className={styles.memberCard}>
                                        <span>점수</span>
                                        <div className={styles.scoreBox}>
                                            <div className={styles.scoreTop}>
                                                <div className={styles.scoreTitle}>
                                                    <span className={styles.scoreSpan}>1Game</span>
                                                    <p className={`${styles.scoreSpan2} ${(member && member.game1 >= 200) ? styles.redText : ""}`}>
                                                        {member?.game1 == null ? "-" : member.game1}
                                                    </p>
                                                </div>
                                                <div className={styles.scoreTitle}>
                                                    <span className={styles.scoreSpan}>2Game</span>
                                                    <p className={`${styles.scoreSpan2} ${(member && member.game2 >= 200) ? styles.redText : ""}`}>
                                                        {member?.game2 == null ? "-" : member.game2}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className={styles.scoreTop}>
                                                <div className={styles.scoreTitle}>
                                                    <span className={styles.scoreSpan}>3Game</span>
                                                    <p className={`${styles.scoreSpan2} ${(member && member.game3 >= 200) ? styles.redText : ""}`}>
                                                        {member?.game3 == null ? "-" : member.game3}
                                                    </p>
                                                </div>
                                                <div className={styles.scoreTitle}>
                                                    <span className={styles.scoreSpan}>4Game</span>
                                                    <p className={`${styles.scoreSpan2} ${(member && member.game4 >= 200) ? styles.redText : ""}`}>
                                                        {member?.game4 == null ? "-" : member.game4}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.memberCard}>
                                        <span className={styles.infoTitle}>평균</span>
                                        <p className={`${styles.info} ${getAvgScore(member.game1, member.game2, member.game3, member.game4) >= 200 ? styles.redText : ""}`}>
                                            {getAvgScore(member.game1, member.game2, member.game3, member.game4)}
                                        </p>
                                    </div>
                                    <div className={styles.memberCard}>
                                        <span className={styles.infoTitle}>총점</span>
                                        <p className={`${styles.info} ${(member && memberTotalScore >= 800) ? styles.redText : ""}`}>{memberTotalScore}</p>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.scoreWith}>
                                <h4>{index === 0 ? "-" : `-${scoreDifference}`}</h4>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className={styles.modalContainer}>
                <div className={styles.modalBox}>
                    <div className={styles.modal} onClick={sideRankingModalToggle}>
                        <i className="fa-solid fa-ranking-star"></i>
                        <span className={styles.title}>사이드 순위</span>
                    </div>
                </div>
                <div className={styles.modalBox}>
                    <div className={styles.modal} onClick={scoreInputModalToggle}>
                        <i className="fa-solid fa-plus-minus"></i>
                        <span className={styles.title}>점수 입력</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RankingBoard;