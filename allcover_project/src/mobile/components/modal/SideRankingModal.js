import { useMemo, useState } from "react";
import styles from "../../css/components/modal/SideRankingModal.module.css";

export default function SideRankingModal({ members, sideRankingModalToggle }) {
    const [page, setPage] = useState(0);
    const [btns] = useState(["사이드", "에버 사이드"]);

    const btnClickHandler = (i) => {
        setPage(i);
    }
    // 총핀과 핀 차이를 계산
    const sortedMembers = useMemo(() => {
        const membersWithTotalPins = members
            .filter(member => member.sideGrade1 == true)
            .map(member => ({
                ...member,
                totalPins: [member.game1, member.game2, member.game3, member.game4]
                    .reduce((sum, game) => sum + (game || 0), 0), // 각 게임 점수를 더해 총핀 계산
            }))
            .sort((a, b) => b.totalPins - a.totalPins); // 총핀 기준으로 내림차순 정렬

        const topTotalPins = membersWithTotalPins[0]?.totalPins || 0; // 1등의 총핀

        return membersWithTotalPins.map(member => ({
            ...member,
            pinDifference: topTotalPins - member.totalPins, // 1등과의 핀 차이
        }));
    });

    // 게임별로 등수 계산 (최대 7등까지)
    const getGameRankings = (gameKey) => {
        return members
            .filter(member => member[gameKey] !== null && member.sideGrade1 == true) // null이 아닌 점수들만 필터링
            .sort((a, b) => b[gameKey] - a[gameKey]) // 점수 기준으로 내림차순 정렬
            .slice(0, 7); // 7등까지 추출
    };

    const game1Rankings = getGameRankings("game1");
    const game2Rankings = getGameRankings("game2");
    const game3Rankings = getGameRankings("game3");
    const game4Rankings = getGameRankings("game4");

    return (
        <>
            <div className={styles.modal}>
                <div className={styles.closeBox} onClick={sideRankingModalToggle}>
                    <i class="fa-regular fa-circle-xmark"></i>
                </div>
                <div className={styles.sideRankingModalContainer}>
                    <div className={styles.modalContainer}>
                        <div className={styles.navBar}>
                            {btns.map((btn, i) => (
                                <button className={`${styles.navBtns} ${i == page ? styles.selectedBtn : ""}`} key={i} onClick={() => btnClickHandler(i)}>{btn}</button>
                            ))}
                        </div>
                        <div className={styles.modalContents}>
                            {page == 0 && 
                                <div className={styles.modalContentsLeft}>
                                    {sortedMembers
                                        .filter(member => member.sideGrade1 === true)
                                        .map((member, i) => (
                                            <div key={i} className={styles.memberCardBox}>
                                                <div>
                                                    <p>{i + 1}</p>
                                                </div>
                                                <div className={styles.memberCard}>
                                                    <div className={styles.memberNameBox}>
                                                        <span className={styles.title}>이름</span>
                                                        <p className={styles.info}>{member.memberName}</p>
                                                    </div>
                                                    <div className={styles.memberScoreBox}>
                                                        <span className={styles.title}>점수</span>
                                                        <div className={styles.scoreBox}>
                                                            <div className={styles.scoreArea}>
                                                                <div className={styles.score}>
                                                                    <span className={styles.title}>1Game</span>
                                                                    <p className={`${styles.scoreInfo} ${member.game1 >= 200 ? styles.highScore : ''}`}>
                                                                        {member.game1 == null ? '-' : member.game1}
                                                                    </p>
                                                                </div>
                                                                <div className={styles.score}>
                                                                    <span className={styles.title}>2Game</span>
                                                                    <p className={`${styles.scoreInfo} ${member.game2 >= 200 ? styles.highScore : ''}`}>
                                                                        {member.game2 == null ? '-' : member.game2}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <div className={styles.scoreArea}>
                                                                <div className={styles.score}>
                                                                    <span className={styles.title}>3Game</span>
                                                                    <p className={`${styles.scoreInfo} ${member.game3 >= 200 ? styles.highScore : ''}`}>
                                                                        {member.game3 == null ? '-' : member.game3}
                                                                    </p>
                                                                </div>
                                                                <div className={styles.score}>
                                                                    <span className={styles.title}>4Game</span>
                                                                    <p className={`${styles.scoreInfo} ${member.game4 >= 200 ? styles.highScore : ''}`}>
                                                                        {member.game4 == null ? '-' : member.game4}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className={styles.memberNameBox}>
                                                        <span className={styles.title}>총핀</span>
                                                        <p className={`${styles.info} ${member.totalPins >= 800 ? styles.highScore : ''}`}>{member.totalPins}</p>
                                                    </div>
                                                    <div className={styles.memberNameBox}>
                                                        <span className={styles.title}>핀차이</span>
                                                        <p className={styles.info}>{member.pinDifference}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            }
                            {page == 0 &&
                                <div className={styles.modalContentsRight}>
                                    <div className={styles.gameRankingContainer}>
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>순위</th>
                                                    <th>1G</th>
                                                    <th>2G</th>
                                                    <th>3G</th>
                                                    <th>4G</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {Array.from({ length: 7 }, (_, i) => (
                                                    <tr key={i}>
                                                        <td>{i + 1 + "위"}</td>
                                                        <td>{game1Rankings[i]?.memberName || "-"}</td>
                                                        <td>{game2Rankings[i]?.memberName || "-"}</td>
                                                        <td>{game3Rankings[i]?.memberName || "-"}</td>
                                                        <td>{game4Rankings[i]?.memberName || "-"}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            }
                            {page == 1 &&
                                <AvgSideRankingModal members={members}></AvgSideRankingModal>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

function AvgSideRankingModal({ members }) {
    // sideAvg가 true인 멤버들만 필터링
    const filteredMembers = useMemo(() => {
        return members.filter(member => member.sideAvg === true);
    }, [members]);

    // 게임별로 memberAvg를 뺀 점수 계산
    const getAvgGameRankings = (gameKey) => {
        return filteredMembers
            .map(member => ({
                ...member,
                adjustedScore: member[gameKey] - (member.memberAvg || 0) // 각 게임 점수에서 memberAvg를 뺌
            }))
            .filter(member => member[gameKey] !== null) // null이 아닌 점수들만 필터링
            .sort((a, b) => b.adjustedScore - a.adjustedScore) // 점수 기준으로 내림차순 정렬
            .slice(0, 10); // 10등까지 추출
    };

    const game1Rankings = getAvgGameRankings("game1");
    const game2Rankings = getAvgGameRankings("game2");
    const game3Rankings = getAvgGameRankings("game3");
    const game4Rankings = getAvgGameRankings("game4");

    return (
        <div className={styles.avgSideRankingModalContainer}>
            <div className={styles.gameRankingContainer}>
                <table>
                    <thead>
                        <tr className={styles.avgTr}>
                            <th>순위</th>
                            <th>1G</th>
                            <th>2G</th>
                            <th>3G</th>
                            <th>4G</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.from({ length: 10 }, (_, i) => (
                            <tr key={i}>
                                <td className={styles.avgTd}>{i + 1 + "위"}</td>
                                <td className={styles.avgScore}>
                                    {game1Rankings[i] ? (
                                        <>
                                            {game1Rankings[i]?.memberName || "-"} 
                                            <br />
                                            {game1Rankings[i]?.game1 != null ? (
                                                <>
                                                    {game1Rankings[i]?.game1} (
                                                    {(game1Rankings[i]?.game1 - game1Rankings[i]?.memberAvg) >= 0 ? (
                                                        <span className={styles.redText}>+{(game1Rankings[i]?.game1 - game1Rankings[i]?.memberAvg).toFixed(0)}</span>
                                                    ) : (
                                                        <span className={styles.blueText}>{(game1Rankings[i]?.game1 - game1Rankings[i]?.memberAvg).toFixed(0)}</span>
                                                    )}
                                                    )
                                                </>
                                            ) : ""}
                                        </>
                                    ) : (
                                        <span>-</span>
                                    )}
                                </td>
                                <td className={styles.avgScore}>
                                    {game2Rankings[i] ? (
                                        <>
                                            {game2Rankings[i]?.memberName || "-"} 
                                            <br />
                                            {game2Rankings[i]?.game2 != null ? (
                                                <>
                                                    {game2Rankings[i]?.game2} (
                                                    {(game2Rankings[i]?.game2 - game2Rankings[i]?.memberAvg) >= 0 ? (
                                                        <span className={styles.redText}>+{(game2Rankings[i]?.game2 - game2Rankings[i]?.memberAvg).toFixed(0)}</span>
                                                    ) : (
                                                        <span className={styles.blueText}>{(game2Rankings[i]?.game2 - game2Rankings[i]?.memberAvg).toFixed(0)}</span>
                                                    )}
                                                    )
                                                </>
                                            ) : ""}
                                        </>
                                    ) : (
                                        <span>-</span>
                                    )}
                                </td>
                                <td className={styles.avgScore}>
                                    {game3Rankings[i] ? (
                                        <>
                                            {game3Rankings[i]?.memberName || "-"} 
                                            <br />
                                            {game3Rankings[i]?.game3 != null ? (
                                                <>
                                                    {game3Rankings[i]?.game3} (
                                                    {(game3Rankings[i]?.game3 - game3Rankings[i]?.memberAvg) >= 0 ? (
                                                        <span className={styles.redText}>+{(game3Rankings[i]?.game3 - game3Rankings[i]?.memberAvg).toFixed(0)}</span>
                                                    ) : (
                                                        <span className={styles.blueText}>{(game3Rankings[i]?.game3 - game3Rankings[i]?.memberAvg).toFixed(0)}</span>
                                                    )}
                                                    )
                                                </>
                                            ) : ""}
                                        </>
                                    ) : (
                                        <span>-</span>
                                    )}
                                </td>
                                <td className={styles.avgScore}>
                                    {game4Rankings[i] ? (
                                        <>
                                            {game4Rankings[i]?.memberName || "-"} 
                                            <br />
                                            {game4Rankings[i]?.game4 != null ? (
                                                <>
                                                    {game4Rankings[i]?.game4} (
                                                    {(game4Rankings[i]?.game4 - game4Rankings[i]?.memberAvg) >= 0 ? (
                                                        <span className={styles.redText}>+{(game4Rankings[i]?.game4 - game4Rankings[i]?.memberAvg).toFixed(0)}</span>
                                                    ) : (
                                                        <span className={styles.blueText}>{(game4Rankings[i]?.game4 - game4Rankings[i]?.memberAvg).toFixed(0)}</span>
                                                    )}
                                                    )
                                                </>
                                            ) : ""}
                                        </>
                                    ) : (
                                        <span>-</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
