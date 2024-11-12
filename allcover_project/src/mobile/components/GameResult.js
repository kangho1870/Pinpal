import { useEffect, useState } from "react";
import styles from "../css/components/GameResult.module.css";
import useScoreboard from "../../stores/useScoreboardStore";
import { useSearchParams } from "react-router-dom";
import useSignInStore from "../../stores/useSignInStore";
import { scoreboardGameStop } from "../../apis";
import { useCookies } from "react-cookie";
import { ACCESS_TOKEN } from "../../constants";
import noProfileUrl from "../../imges/user-img/no-profile-url.png";

export default function GameResult() {
    const { signInUser } = useSignInStore();
    const [cookies] = useCookies();
    const token = cookies[ACCESS_TOKEN];
    const { members, team1stMember } = useScoreboard();
    const [scoreCounting, setScoreCounting] = useState(true);
    const [searchParams] = useSearchParams();
    const gameId = searchParams.get("gameId");
    const clubId = signInUser?.clubId || null;
    const roles = signInUser?.clubRole || null;
    

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

        return avgTopScoreMember[0] || null; // undefined 방지
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
                        return (member.game1 >= 230) || (member.game2 >= 230) || (member.game3 >= 230) || (member.game4 >= 230) ? member : null;
                    } else if (gender === 1) {
                        return (member.game1 >= 200) || (member.game2 >= 200) || (member.game3 >= 200) || (member.game4 >= 200) ? member : null;
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
    
    // 제외할 멤버 목록 업데이트
    const excludedNames = [
        sortedMembers[0]?.memberName,
    ]; // undefined 제거


    const getGradeFirstMemberId = (grade) => {
        const gradeMembers = getGrade1stMember(grade);
        if(gradeMembers.length > 0) {
            return;
        }
    };

    const getTopMembersByGrade = (members) => {
        const grades = [1, 2, 3, 4, 5, 6]; // 각 군의 등급
        const finalGrades = [];
    
        // 각 군별로 멤버를 필터링하고 점수 계산
        grades.forEach((grade) => {
            const gradeMembers = members.filter(member => member.grade === grade);
            
            // 멤버가 존재하는지 확인
            if (gradeMembers.length === 0 || excludedNames.includes(gradeMembers[0].memberName)) {
                finalGrades.push(null); // 해당 군에 멤버가 없으면 null 추가
                return;
            }
    
            // 각 멤버의 점수를 계산
            gradeMembers.forEach(member => {
                member.totalScore = (member.game1 || 0 - member.memberAvg) + (member.game2 || 0 - member.memberAvg) + 
                                    (member.game3 || 0 - member.memberAvg) + (member.game4 || 0 - member.memberAvg);
            });
    
            // 점수에 따라 내림차순 정렬
            gradeMembers.sort((a, b) => a.totalScore - b.totalScore);
    
            gradeMembers.forEach(member => {
                if(!excludedNames.includes(member.memberName)) {
                    finalGrades.push(member);
                    excludedNames.push(member.memberName)
                }
            })
        });
    
        return finalGrades;
    };
    
    // 사용 예시
    
    const topMembers = getTopMembersByGrade(members);
    console.log(topMembers);

    const grade1stId = topMembers[0]?.memberId || null;
    const grade2stId = topMembers[1]?.memberId || null;
    const grade3stId = topMembers[2]?.memberId || null;
    const grade4stId = topMembers[3]?.memberId || null;
    const grade5stId = topMembers[4]?.memberId || null;
    const grade6stId = topMembers[5]?.memberId || null;


    // 남자 하이스코어 멤버 선택 (grade1~4st 제외)
    const maleMembers = getHighScoreMember(0).filter(member => !excludedNames.includes(member.memberName));
    const highScoreOfMan = maleMembers.length > 0 
        ? maleMembers[0] || '-' 
        : '-';
    const highScoreOfManId = maleMembers.length > 0 
    ? maleMembers[0]?.memberId || null 
    : null;

    // 여자 하이스코어 멤버 선택 (grade1~4st 제외)
    const femaleMembers = getHighScoreMember(1).filter(member => !excludedNames.includes(member.memberName));
    const highScoreOfGirl = femaleMembers.length > 0 
        ? femaleMembers[0] || '-' 
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
        grade5st: grade5stId,
        grade6st: grade6stId,
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
        scoreboardGameStop(resultSetOfLong, token).then(stopGameResponse);
    }

    return (
        <div className={styles.container}>
            {scoreCounting === false && sortedMembers?.length > 0 ? (
                <div className={styles.mainArea}>
                    <div className={styles.gameResultBox}>
                        <div className={styles.total1stBox}>
                            <img className={styles.total1stImg} src={require("../../imges/gameResult-img/1st-PNG.png")} alt="총핀 1위"/>
                            <div className={styles.memberBox}>
                                <p>총핀 1위 :</p>
                                <div className={styles.memberProfileBox}>
                                    <img className={styles.memberProfile} src={sortedMembers[0]?.memberProfile || noProfileUrl}></img>
                                    <h3>{sortedMembers[0]?.memberName || '-'}</h3>
                                </div>
                            </div>
                        </div>
                        <div className={styles.total1stBox}>
                            <img className={styles.total1stImg} src={require("../../imges/gameResult-img/1st-PNG.png")} alt="에버 1위"/>
                            <div className={styles.memberBox}>
                                <p>에버 1위 :</p>
                                <div className={styles.memberProfileBox}>
                                    <img className={styles.memberProfile} src={avgTopScoreMember?.memberProfile || noProfileUrl}></img>
                                    <h3>{avgTopScoreMember?.memberName || '-'}</h3>
                                </div>
                            </div>
                        </div>
                        {/* 각 군 1위에 대한 섹션 */}
                        <div className={styles.grade1stBox}>
                            <div className={styles.grade1stArea}>
                                <img className={styles.grade1stImg} src={require("../../imges/gameResult-img/grade1st-PNG.png")} alt="군 1위"/>
                                <div className={styles.memberBox}>
                                    {topMembers.map((grade, index) => (
                                        <div className={styles.member} key={index}>
                                            <p className={styles.grade1stTitle}>{index + 1}군</p>
                                            <div className={styles.memberProfileBox}>
                                                <img className={styles.memberProfile} src={grade?.memberProfile || noProfileUrl} />
                                                <h3 className={styles.grade1stInfo}>{grade?.memberName || '-'}</h3>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className={styles.highScoreArea}>
                            <div className={styles.highScoreBox}>
                                <img className={styles.highScoreImg} src={require("../../imges/gameResult-img/highScore-png.png")} alt="하이스코어"/>
                                <div>
                                    <div className={styles.memberBox}>
                                        <p className={styles.grade1stTitle}>남자 하이스코어 :</p>
                                        <div className={styles.memberProfileBox}>
                                            <img className={styles.memberProfile} src={highScoreOfMan?.memberProfile || noProfileUrl}></img>
                                            <h3 className={styles.grade1stInfo}>{highScoreOfMan?.memberName || '-'}</h3>
                                        </div>
                                    </div>
                                    <div className={styles.memberBox}>
                                        <p className={styles.grade1stTitle}>여자 하이스코어 :</p>
                                        <div className={styles.memberProfileBox}>
                                            <img className={styles.memberProfile} src={highScoreOfGirl?.memberProfile || noProfileUrl}></img>
                                            <h3 className={styles.grade1stInfo}>{highScoreOfGirl?.memberName || '-'}</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.grade1stBox}>
                            <div className={styles.grade1stArea}>
                                <img className={styles.grade1stImg} src={require("../../imges/gameResult-img/grade1st-PNG.png")} alt="팀 1등"/>
                                <p>팀 1등</p>
                                <div className={styles.memberBox}>
                                    {team1stMember?.members?.map((member, index) => (
                                        <div className={styles.member} key={index}>
                                            <div className={styles.memberProfileBox}>
                                                <img className={styles.memberProfile} src={member?.memberProfile || noProfileUrl}></img>
                                                <h3 className={styles.grade1stInfo}>{member?.memberName || '-'}</h3>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        {(roles === "STAFF" || roles === "MASTER") && 
                            <button className={styles.gameStopBtn} onClick={stopGameRequest}>게임 종료</button>
                        }
                    </div>
                </div>
            ) : (
                <Loading />
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