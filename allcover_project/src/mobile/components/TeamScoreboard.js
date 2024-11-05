import { useEffect } from "react";
import useScoreboard from "../../stores/useScoreboardStore";
import styles from "../css/components/TeamScoreboard.module.css";

export default function TeamScoreboard() {
    const { members, setTeam1stMember } = useScoreboard();

    const teams = members.reduce((acc, member) => {
        if (!acc[member.teamNumber]) {
            acc[member.teamNumber] = [];
        }
        acc[member.teamNumber].push(member);
        return acc;
    }, {});
    
    // 팀별로 총합 점수 계산 (모든 게임에서 gameX - memberAvg 기준)
    const teamScores = Object.keys(teams).map(teamNumber => {
        const teamMembers = teams[teamNumber];
        
        // 팀 멤버 중 하나라도 0점이 있는지 확인
        const hasZeroScore = teamMembers.some(member =>
            (member.game1 === 0) || 
            (member.game2 === 0) || 
            (member.game3 === 0) || 
            (member.game4 === 0)
        );

        const totalScore = hasZeroScore
            ? 0  // 0점인 멤버가 있으면 팀 총점 0
            : teamMembers.reduce((sum, member) => {
                const game1Score = (member.game1 || 0) - (member.memberAvg || 0);
                const game2Score = (member.game2 || 0) - (member.memberAvg || 0);
                const game3Score = (member.game3 || 0) - (member.memberAvg || 0);
                const game4Score = (member.game4 || 0) - (member.memberAvg || 0);

                return sum + game1Score + game2Score + game3Score + game4Score;
            }, 0);
    
        return {
            teamNumber,
            members: teamMembers,
            totalScore
        };
    });

    // 총합 점수 기준으로 팀 순위 정렬 및 teamNumber가 0인 팀은 제외
    const sortedTeams = teamScores
        .filter(team => team.teamNumber !== "0")  // teamNumber가 0이 아닌 팀만 필터링
        .sort((a, b) => b.totalScore - a.totalScore);

    useEffect(() => {
        if (sortedTeams.length > 0) {
            // 1등 팀의 모든 멤버의 memberId 가져오기
            const topTeamMemberIds = sortedTeams[0]?.members.map(member => member.memberId);
            const topTeamMemberMembers = sortedTeams[0]?.members.map(member => member);

            const teamMember = {
                ids: topTeamMemberIds,
                members: topTeamMemberMembers
            }
    
            if (teamMember) {
                setTeam1stMember(teamMember);
            }
        }
    }, [members])

    return (
        <div className={styles.teamScoreboardContainer}>
            {sortedTeams.map((team, index) => {
                // 각 게임의 총합 계산
                const hasZeroScore = team.members.some(member =>
                    (member.game1 === null) || 
                    (member.game2 === null) || 
                    (member.game3 === null) || 
                    (member.game4 === null)
                );
                
                const game1Total = hasZeroScore ? 0 : team.members.reduce((sum, member) => sum + (member.game1 || 0) - (member.memberAvg || 0), 0);
                const game2Total = hasZeroScore ? 0 : team.members.reduce((sum, member) => sum + (member.game2 || 0) - (member.memberAvg || 0), 0);
                const game3Total = hasZeroScore ? 0 : team.members.reduce((sum, member) => sum + (member.game3 || 0) - (member.memberAvg || 0), 0);
                const game4Total = hasZeroScore ? 0 : team.members.reduce((sum, member) => sum + (member.game4 || 0) - (member.memberAvg || 0), 0);
                const totalSum = hasZeroScore ? 0 : game1Total + game2Total + game3Total + game4Total;

                return (
                    <div key={team.teamNumber} className={styles.teamScoreboardBox}>
                        <div className={styles.teamTableBox}>
                            <div className={styles.teamRankBox}>
                                <p className={styles.teamRankTitle}>{index + 1}</p>
                            </div>
                            <table className={styles.teamScoreTable}>
                                <thead>
                                    <tr className={styles.teamScoreHeaderTr}>
                                        <th className={styles.teamScoreTh} colSpan={3}></th>
                                        <th className={styles.teamScoreTh}>Avg</th>
                                        <th className={styles.teamScoreTh}>1G</th>
                                        <th className={styles.teamScoreTh}>2G</th>
                                        <th className={styles.teamScoreTh}>3G</th>
                                        <th className={styles.teamScoreTh}>4G</th>
                                        <th className={styles.teamScoreTh}>총점</th>
                                        <th className={styles.teamScoreTh}>평균</th>
                                        <th className={styles.teamScoreTh}>합계</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {team.members.map((member, idx) => {
                                        const scores = [member.game1, member.game2, member.game3, member.game4].filter(score => score !== null && score !== 0);
                                        const memberTotal = scores.reduce((sum, score) => sum + score, 0);
                                        const memberAvg = scores.length > 0 ? memberTotal / scores.length : 0;
                                        const avgTotla = ((scores[0] || 0) + (scores[1] || 0) + (scores[2] || 0) + (scores[3] || 0)) - (member.memberAvg * 4);

                                        return (
                                            <tr key={idx} className={styles.teamScoreBodyTr}>
                                                {/* 첫 번째 멤버에만 팀 이름과 rowSpan 적용 */}
                                                {idx === 0 && (
                                                    <td className={styles.teamScoreTd} rowSpan={team.members.length}>Team {team.teamNumber}</td>
                                                )}
                                                <td className={styles.teamScoreTd}>{idx + 1}</td>
                                                <td className={styles.teamScoreTd}>{member.memberName}</td>
                                                <td className={styles.teamScoreTd}>{member.memberAvg}</td>
                                                <td className={`${styles.teamScoreTd} ${styles.gameScoreBackground}`}>{member.game1 || 0}</td>
                                                <td className={`${styles.teamScoreTd} ${styles.gameScoreBackground}`}>{member.game2 || 0}</td>
                                                <td className={`${styles.teamScoreTd} ${styles.gameScoreBackground}`}>{member.game3 || 0}</td>
                                                <td className={`${styles.teamScoreTd} ${styles.gameScoreBackground}`}>{member.game4 || 0}</td>
                                                <td className={styles.teamScoreTd}>{memberTotal}</td>
                                                <td className={styles.teamScoreTd}>{memberAvg.toFixed(1)}</td>
                                                <td className={styles.teamScoreTd}>{avgTotla}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                                <tfoot>
                                    <tr className={styles.teamScoreHeaderTr}>
                                        <td className={styles.teamScoreTh} colSpan={4}>합계</td>
                                        <td className={styles.teamScoreTh}>{game1Total}</td>
                                        <td className={styles.teamScoreTh}>{game2Total}</td>
                                        <td className={styles.teamScoreTh}>{game3Total}</td>
                                        <td className={styles.teamScoreTh}>{game4Total}</td>
                                        <td className={styles.teamScoreTh} colSpan={2}>팀 종합</td>
                                        <td className={styles.teamScoreTh}>{totalSum}</td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
