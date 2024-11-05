import { useEffect, useState } from "react";
import styles from "../css/components/GameResult.module.css";
import useScoreboard from "../../stores/useScoreboardStore";
import { useSearchParams } from "react-router-dom";
import useSignInStore from "../../stores/useSignInStore";
import { scoreboardGameStop } from "../../apis";
import { useCookies } from "react-cookie";
import { ACCESS_TOKEN } from "../../constants";

export default function GameResult() {
    const { signInUser } = useSignInStore();
    const [cookies] = useCookies();
    const token = cookies[ACCESS_TOKEN];
    const { members, team1stMember } = useScoreboard();
    const [scoreCounting, setScoreCounting] = useState(true);
    const [searchParams] = useSearchParams();
    const gameId = searchParams.get("gameId");
    const clubId = signInUser.clubId;

    const findCurrentUser = () => {
        const counting = members[0].scoreCounting;
        setScoreCounting(counting);
    }

    useEffect(() => {
        findCurrentUser();
    }, [])

    const sortedMembers = [...members].sort((a, b) => {
        const totalA = (a.game1 || 0) + (a.game2 || 0) + (a.game3 || 0) + (a.game4 || 0);
        const totalB = (b.game1 || 0) + (b.game2 || 0) + (b.game3 || 0) + (b.game4 || 0);
        return totalB - totalA;
    });

    const topTotalScore = sortedMembers.length > 0 
        ? (sortedMembers[0].game1 || 0) + (sortedMembers[0].game2 || 0) + (sortedMembers[0].game3 || 0) + (sortedMembers[0].game4 || 0) 
        : 0;

    const getGrade1stMember = (i) => {
        const grade1st = members.filter(member => member.grade === i)
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

        return avgTopScoreMember[0]?.memberName || null; // undefined 방지
    }

    const getAvgTopScoreMemberId = () => {
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

        return avgTopScoreMember[0]?.memberId || null; // undefined 방지
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
        if(gradeMembers.length > 0) {
            return gradeMembers[0]?.memberName; // 1등 멤버 선택
        }
    };

    const grade1st = getGradeFirstMember(1);
    const grade2st = getGradeFirstMember(2);
    const grade3st = getGradeFirstMember(3);
    const grade4st = getGradeFirstMember(4);

    // 제외할 멤버 목록 업데이트
    const excludedNames = [
        sortedMembers[0]?.memberName,
        grade1st,
        grade2st,
        grade3st,
        grade4st
    ].filter(Boolean); // undefined 제거

    const getGradeFirstMemberId = (grade) => {
        const gradeMembers = getGrade1stMember(grade);
        if(gradeMembers.length > 0) {
            return gradeMembers[0]?.memberId; // 1등 멤버 선택
        }
    };

    const grade1stId = getGradeFirstMemberId(1);
    const grade2stId = getGradeFirstMemberId(2);
    const grade3stId = getGradeFirstMemberId(3);
    const grade4stId = getGradeFirstMemberId(4);

    // 남자 하이스코어 멤버 선택 (grade1~4st 제외)
    const maleMembers = getHighScoreMember(0).filter(member => !excludedNames.includes(member.memberName));
    const highScoreOfMan = maleMembers.length > 0 
        ? maleMembers[0]?.memberName || '-' 
        : '-';
    const highScoreOfManId = maleMembers.length > 0 
    ? maleMembers[0]?.memberId || null 
    : null;

    // 여자 하이스코어 멤버 선택 (grade1~4st 제외)
    const femaleMembers = getHighScoreMember(1).filter(member => !excludedNames.includes(member.memberName));
    const highScoreOfGirl = femaleMembers.length > 0 
        ? femaleMembers[0]?.memberName || '-' 
        : '-';
    const highScoreOfGirlId = femaleMembers.length > 0 
    ? femaleMembers[0]?.memberId || null 
    : null;

    const avgTopScoreMemberId = getAvgTopScoreMemberId();

    const resultSetOfLong = {
        gameId: gameId,
        clubId: clubId,
        pin1st: sortedMembers[0].memberId,
        avgTopScoreMember: avgTopScoreMemberId,
        grade1st: grade1stId,
        grade2st: grade2stId,
        grade3st: grade3stId,
        grade4st: grade4stId,
        highScoreOfMan: highScoreOfManId,
        highScoreOfGirl: highScoreOfGirlId,
        team1stIds: team1stMember
    }

    const stopGameResponse = (responseBody) => {
        const message = 
            !responseBody ? '서버에 문제가 있습니다.' :
            responseBody.code === 'VF' ? '올바른 데이터가 아닙니다.' :
            responseBody.code === 'DBE' ? '서버에 문제가 있습니다.' :
            responseBody.code === 'SU' ? '게임이 종료되었습니다.' : '';
        
        const isSuccessed = responseBody !== null && responseBody.code === 'SU';
        if (!isSuccessed) {
            alert(message);
            return;
        }

        alert(message);
    };
    
    const stopGameRequest = () => {
        scoreboardGameStop(resultSetOfLong, token);
    }

    return (
        <div className={styles.container}>
            {scoreCounting === false && sortedMembers.length > 0 ? (
                <div className={styles.mainArea}>
                    <div className={styles.gameResultBox}>
                        <div className={styles.total1stBox}>
                            <img className={styles.total1stImg} src={require("../../imges/gameResult-img/1st-PNG.png")} alt="총핀 1위" />
                            <div className={styles.memberBox}>
                                <p>총핀 1위 :</p>
                                <h3>{sortedMembers[0]?.memberName || '-'}</h3>
                            </div>
                        </div>
                        <div className={styles.grade1stBox}>
                            <div className={styles.grade1stArea}>
                                <img className={styles.grade1stImg} src={require("../../imges/gameResult-img/grade1st-PNG.png")} alt="군 1위" />
                                <div className={styles.memberBox}>
                                    <div className={styles.member}>
                                        <p className={styles.grade1stTitle}>1군</p>
                                        <h3 className={styles.grade1stInfo}>{grade1st || '-'}</h3>
                                    </div>
                                    <div className={styles.member}>
                                        <p className={styles.grade1stTitle}>2군</p>
                                        <h3 className={styles.grade1stInfo}>{grade2st || '-'}</h3>
                                    </div>
                                    <div className={styles.member}>
                                        <p className={styles.grade1stTitle}>3군</p>
                                        <h3 className={styles.grade1stInfo}>{grade3st || '-'}</h3>
                                    </div>
                                    <div className={styles.member}>
                                        <p className={styles.grade1stTitle}>4군</p>
                                        <h3 className={styles.grade1stInfo}>{grade4st || '-'}</h3>
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
                                <img className={styles.highScoreImg} src={require("../../imges/gameResult-img/highScore-png.png")} alt="하이스코어" />
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
                    </div>
                    <button className={styles.gameStopBtn} onClick={stopGameRequest}>게임 종료</button>
                </div>
            ) : (
                <Loading></Loading>
            )}
        </div>
    );
}


function Loading() {

    return (
        <div className={styles.countingContainer}>
            <div className={styles.countingBox}>
                <div className={styles.spinner}>
                    <img src={require("../../imges/loading-img/Ball@1x-0.7s-200px-200px.gif")}></img>
                    <h4>점수 집계 중입니다...</h4>
                </div>
            </div>
        </div>
    )
}