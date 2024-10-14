import { useState } from "react";
import styles from "../css/components/GameResult.module.css";

export default function GameResult({ members }) {
    const [scoreCounting] = useState(members[0].scoreCounting);

    const sortedMembers = [...members].sort((a, b) => {
        const totalA = (a.game1 || 0) + (a.game2 || 0) + (a.game3 || 0) + (a.game4 || 0);
        const totalB = (b.game1 || 0) + (b.game2 || 0) + (b.game3 || 0) + (b.game4 || 0);
        return totalB - totalA;
    });

    const topTotalScore = sortedMembers.length > 0 
        ? (sortedMembers[0].game1 || 0) + (sortedMembers[0].game2 || 0) + (sortedMembers[0].game3 || 0) + (sortedMembers[0].game4 || 0) 
        : 0;

    const getGrade1stMember = (i) => {
        const grade1st = members.filter(member => member.grade == i)
            .sort((a, b) => {
                const totalA = ((a.game1 || 0) - a.memberAvg) + 
                                ((a.game2 || 0) - a.memberAvg) + 
                                ((a.game3 || 0) - a.memberAvg) + 
                                ((a.game4 || 0) - a.memberAvg);

                const totalB = ((b.game1 || 0) - b.memberAvg) + 
                                ((b.game2 || 0) - b.memberAvg) + 
                                ((b.game3 || 0) - b.memberAvg) + 
                                ((b.game4 || 0) - b.memberAvg);

                return totalB - totalA;
            })

        return grade1st;
    }

    const getAvgTopScoreMember = () => {
        if (members.length === 0) {
            return null;
        }
    
        const avgTopScoreMember = [...members] // members 배열 복사
            .sort((a, b) => {
                const totalA = ((a.game1 || 0) - a.memberAvg) + 
                               ((a.game2 || 0) - a.memberAvg) + 
                               ((a.game3 || 0) - a.memberAvg) + 
                               ((a.game4 || 0) - a.memberAvg);
    
                const totalB = ((b.game1 || 0) - b.memberAvg) + 
                               ((b.game2 || 0) - b.memberAvg) + 
                               ((b.game3 || 0) - b.memberAvg) + 
                               ((b.game4 || 0) - b.memberAvg);
    
                return totalB - totalA;
            });
    
        return avgTopScoreMember[0].memberName || null; // undefined 방지
    }

    const getHighScoreMember = (gender) => {
        const highScoreMember = [...members]
            .filter(member => {
                if (member.gender === gender) {
                    if (gender === 0) {
                        return (member.game1 >= 230) || (member.game2 >= 230) || (member.game3 >= 230) || (member.game4 >= 230);
                    } else if (gender === 1) {
                        return (member.game1 >= 200) || (member.game2 >= 200) || (member.game3 >= 200) || (member.game4 >= 200);
                    }
                }
                return false;
            })
            .sort((a, b) => {
                const highestA = Math.max(a.game1 || 0, a.game2 || 0, a.game3 || 0, a.game4 || 0);
                const highestB = Math.max(b.game1 || 0, b.game2 || 0, b.game3 || 0, b.game4 || 0);
    
                return highestB - highestA;
            });
        
        return highScoreMember.length > 0 ? highScoreMember : [];
    };

    const avgTopScoreMember = getAvgTopScoreMember();

    // 각 그룹별 1등 멤버 선택
    const getGradeFirstMember = (grade) => {
        const gradeMembers = getGrade1stMember(grade);
        return gradeMembers[0]?.memberName; // 1등 멤버 선택
    };

    const grade1st = getGradeFirstMember(1);
    const grade2st = getGradeFirstMember(2);
    const grade3st = getGradeFirstMember(3);
    const grade4st = getGradeFirstMember(4);

    // 제외할 멤버 목록 업데이트
    const excludedNames = [
        sortedMembers[0].memberName,
        grade1st,
        grade2st,
        grade3st,
        grade4st
    ];

    // 남자 하이스코어 멤버 선택 (grade1~4st 제외)
    const maleMembers = getHighScoreMember(0).filter(member => !excludedNames.includes(member.memberName));
    const highScoreOfMan = maleMembers.length > 0 
        ? maleMembers[0]?.memberName || '-' 
        : '-';

    // 여자 하이스코어 멤버 선택 (grade1~4st 제외)
    const femaleMembers = getHighScoreMember(1).filter(member => !excludedNames.includes(member.memberName));
    const highScoreOfGirl = femaleMembers.length > 0 
        ? femaleMembers[0]?.memberName || '-' 
        : '-';

    

    return (
        <div className={styles.container}>
            {scoreCounting == false &&
                <div className={styles.mainArea}>
                    <div className={styles.gameResultBox}>
                        <div className={styles.total1stBox}>
                            <img className={styles.total1stImg} src={require("../../imges/gameResult-img/1st-PNG.png")}></img>
                            <div className={styles.memberBox}>
                                <p>총핀 1위 :</p>
                                <h3>{sortedMembers[0].memberName}</h3>
                            </div>
                        </div>
                        <div className={styles.grade1stBox}>
                            <div className={styles.grade1stArea}>
                                <img className={styles.grade1stImg} src={require("../../imges/gameResult-img/grade1st-PNG.png")}></img>
                                <div className={styles.memberBox}>
                                    <div className={styles.member}>
                                        <p className={styles.grade1stTitle}>1군</p>
                                        <h3 className={styles.grade1stInfo}>{grade1st}</h3>
                                    </div>
                                    <div className={styles.member}>
                                        <p className={styles.grade1stTitle}>2군</p>
                                        <h3 className={styles.grade1stInfo}>{grade2st}</h3>
                                    </div>
                                    <div className={styles.member}>
                                        <p className={styles.grade1stTitle}>3군</p>
                                        <h3 className={styles.grade1stInfo}>{grade3st}</h3>
                                    </div>
                                    <div className={styles.member}>
                                        <p className={styles.grade1stTitle}>4군</p>
                                        <h3 className={styles.grade1stInfo}>{grade4st}</h3>
                                    </div>
                                    <div className={styles.member}>
                                        <p className={styles.grade1stTitle}>5군</p>
                                        <h3 className={styles.grade1stInfo}>강호</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.highScoreArea}>
                            <div className={styles.highScoreBox}>
                                <img className={styles.highScoreImg} src={require("../../imges/gameResult-img/highScore-png.png")}></img>
                                <div>
                                    <div className={styles.memberBox}>
                                        <p className={styles.grade1stTitle}>남자 하이스코어 :</p>
                                        <h3 className={styles.grade1stInfo}>{highScoreOfMan}</h3>
                                    </div>
                                    <div className={styles.memberBox}>
                                        <p className={styles.grade1stTitle}>여자 하이스코어 :</p>
                                        <h3 className={styles.grade1stInfo}>{highScoreOfGirl}</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.ceremonyArea}>
                            <div className={styles.avgTop}>
                                <img className={styles.avgTopImg} src={require("../../imges/gameResult-img/avg1st-png.png")}></img>
                                <div className={styles.memberBox}>
                                    <p className={styles.grade1stTitle}>에버 1등 :</p>
                                    <h3 className={styles.grade1stInfo}>{avgTopScoreMember}</h3>
                                </div>
                            </div>
                        </div>
                        <div className={styles.ceremonyArea}>
                            <div className={styles.avgTop}>
                                <img className={styles.avgTopImg} src={require("../../imges/gameResult-img/spare-png.png")}></img>
                                <div className={styles.memberBox}>
                                    <p className={styles.grade1stTitle}>올커버 :</p>
                                    <h3 className={styles.grade1stInfo}></h3>
                                </div>
                            </div>
                        </div>
                        <div className={styles.ceremonyArea}>
                            <div className={styles.avgTop}>
                                <img className={styles.avgTopImg} src={require("../../imges/gameResult-img/team1st-png.png")}></img>
                                <div className={styles.memberBox}>
                                    <p className={styles.grade1stTitle}>팀 1등 :</p>
                                    <h3 className={styles.grade1stInfo}></h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
            {scoreCounting == true &&
                <Loading></Loading>
            }
        </div>
    )
}

function Loading() {

    return (
        <div className={styles.countingContainer}>
            <div className={styles.countingBox}>
                <div className={styles.spinner}>
                    <img src={require("../../imges/loading-img/Spinner@1x-1.0s-200px-200px.gif")}></img>
                    <h4>점수 집계 중입니다...</h4>
                </div>
            </div>
        </div>
    )
}