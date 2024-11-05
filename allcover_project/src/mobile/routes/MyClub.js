import { useEffect, useState } from "react";
import styles from "../css/routes/MyClub.module.css";
import useSignInStore from "../../stores/useSignInStore";
import { useCookies } from "react-cookie";
import { ACCESS_TOKEN, ROOT_PATH, SCOREBOARD_PATH } from "../../constants";
import { useNavigate } from "react-router-dom";
import { onClickBackBtn } from "../../hooks";
import { addGameRequest, getCeremonysListRequest, getGameListRequest, getMemberListRequest, scoreboardJoinRequest } from "../../apis";
import Loading from "../components/loading/Loading";

function MyClub() {

    const { signInUser, setSignInUser } = useSignInStore();
    const [loading, setLoading] = useState(false);
    const [addGameModal, setAddGameModal] = useState(false);
    const navigator = useNavigate();
    const [cookies] = useCookies();
    const token = cookies[ACCESS_TOKEN];
    const [page, setPage] = useState(1);
    const clubId = signInUser.clubId || 0;


    const addGameModalBtnClickHandler = () => {
        setAddGameModal(!addGameModal);
    }

    return (
        <>
            <div className={styles.container}>
                <div className={styles.top}>
                    <div className={styles.clubTitle}>
                        <div className={styles.topCategory} onClick={() => onClickBackBtn(navigator)}><i class="fa-solid fa-chevron-left"></i></div>
                        <span className={styles.topCategory}>test</span>
                        <div className={styles.topCategory}><i class="fa-solid fa-right-from-bracket"></i></div>
                    </div>
                    <div className={styles.clubNav}>
                        <button className={`${styles.clubNavBtns} ${page == 0 ? styles.selectedClubNavBtn : ""}`} onClick={() => setPage(0)}><span className={styles.btnSpan}>홈</span></button>
                        <button className={`${styles.clubNavBtns} ${page == 1 ? styles.selectedClubNavBtn : ""}`} onClick={() => setPage(1)}><span className={styles.btnSpan}>기록실</span></button>
                        <button className={`${styles.clubNavBtns} ${page == 2 ? styles.selectedClubNavBtn : ""}`} onClick={() => setPage(2)}><span className={styles.btnSpan}>게시판</span></button>
                        <button className={`${styles.clubNavBtns} ${page == 3 ? styles.selectedClubNavBtn : ""}`} onClick={() => setPage(3)}><span className={styles.btnSpan}>랭킹</span></button>
                    </div>
                </div>
                <div className={styles.contextArea}>
                {signInUser && signInUser.clubId !== null && page == 0 &&
                    <ClubHome setLoading={setLoading}></ClubHome>
                }
                {signInUser && signInUser.clubId !== null && page == 1 &&
                    <ClubCeremony></ClubCeremony>
                }
                {!signInUser && signInUser.clubId == null &&
                    <div className={styles.noClubContainer}>
                        <p className={styles.noClubTitle}>가입한 클럽이 없습니다.</p>
                    </div>
                }
                    
                </div>
            </div>
            <div className={styles.modalContainer}>
                <div className={styles.modalBox}>
                    <div className={styles.modal} onClick={addGameModalBtnClickHandler}>
                        <i className="fa-solid fa-plus"></i>
                        <span className={styles.title}>게임 생성</span>
                    </div>
                </div>
            </div>
            {addGameModal &&
                <div className={styles.addGameModal}>
                    <AddGameModal clubId={clubId} token={token} addGameModalBtnClickHandler={addGameModalBtnClickHandler}></AddGameModal>
                </div>
            }
            {loading &&
                <Loading></Loading>
            }
        </>
    )
}

export default MyClub;

function ClubHome({ setLoading }) {

    const { signInUser, setSignInUser } = useSignInStore();
    const navigator = useNavigate();
    const [cookies] = useCookies();
    const token = cookies[ACCESS_TOKEN];
    const [games, setGames] = useState([]);
    const [members, setMembers] = useState([]);


    const clubId = signInUser.clubId || 0;
    const memberId = signInUser.id || null;

    const scheduleOnClickHandler = (gameId) => {
        navigator(`${SCOREBOARD_PATH}?gameId=${gameId}&clubId=${clubId}`);
    }

    const formatShortDate = (date) => {
        const formattedDate = new Intl.DateTimeFormat('ko-KR', {
            month: 'numeric',
            day: 'numeric',
            weekday: 'short'
        }).format(new Date(date));
        
        return formattedDate.replace(/\./g, '/').replace(') ', ')').replace('/(', ' (');
    };

    const formatDateTime = (date, time) => {
        const dateTime = new Date(`${date}T${time}`);
        const formattedDate = new Intl.DateTimeFormat('ko-KR', {
            month: 'numeric',
            day: 'numeric',
            weekday: 'short',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        }).format(dateTime);
    
        // Replace dots with slashes and remove the period after the weekday
        return formattedDate.replace(/\./g, '/').replace(') ', ')').replace('/(', ' (');
    };



    const getGamesResponse = (responseBody) => {
        const message = 
        !responseBody ? '서버에 문제가 있습니다.' :
        responseBody.code === 'AF' ? '잘못된 접근입니다.' :
        responseBody.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

        const isSuccessed = responseBody.code === 'SU';
        if (!isSuccessed) {
            alert(message);
            return;
        }
        const { games } = responseBody
        setGames(games)
        console.log(games)
        setLoading(false);
    }

    const getGamesRequest = () => {
        setLoading(true);
        getGameListRequest(clubId, token).then(getGamesResponse);
    }

    const getMembersResponse = (responseBody) => {

        const message = 
        !responseBody ? '서버에 문제가 있습니다.' :
        responseBody.code === 'AF' ? '잘못된 접근입니다.' :
        responseBody.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

        const isSuccessed = responseBody.code === 'SU';
        if (!isSuccessed) {
            alert(message);
            return;
        }
        const { members } = responseBody
        setMembers(members)
        setLoading(false);
    }

    const getMembersRequest = () => {
        setLoading(true);
        getMemberListRequest(clubId, token).then(getMembersResponse)
    }

    const scoreboardJoinResponse = (responseBody) => {

        const message = 
        !responseBody ? '서버에 문제가 있습니다.' :
        responseBody.code === 'AF' ? '잘못된 접근입니다.' :
        responseBody.code === 'DBE' ? '서버에 문제가 있습니다.' :
        responseBody.code === 'SJC' ? '취소 처리되었습니다.' : 
        responseBody.code === 'SU' ? '참석 처리되었습니다.' : '';

        const isSuccessed = responseBody.code === 'SU' || 'SJC';
        if (!isSuccessed) {
            alert(message);
            return;
        }
        
        alert(message);
        getGamesRequest();
        setLoading(false);
    }

    const scoreboardJoin = (gameId) => {
        setLoading(true);
        scoreboardJoinRequest(gameId, memberId, token).then(scoreboardJoinResponse);
    }

    useEffect(() => {
        if(cookies[ACCESS_TOKEN] == null) {
            alert("로그인이 필요한 서비스입니다.");
            navigator(ROOT_PATH);
        }
        getMembersRequest();
        getGamesRequest();
    },[])

    return (
        <>
            <div className={`${styles.clubBannerArea} ${styles.commonDiv}`}>
                <img className={styles.bannerImage} src=""></img>
            </div>
            <div className={`${styles.clubDescription} ${styles.commonDiv}`}>
                부산 서면볼링센터 상주 <br></br>
                정모 : 매월 2,4주 일요일 오후 2시 <br></br>
                정법 : 매월 1,3주 월요일 오후 8시 <br></br>
                회비 : 매월 1만원 <br></br>
                · 볼링초보, 볼링구력자 모두 대환영 (장비와 유니폼은 필수 구입해야 함!) <br></br>
                번개 매일, <br></br>
                금요일 정기 판게임 있음 3인조, <br></br>
                주간하이 등 수시 이벤트 다양 <br></br>
                진정 볼링을 사랑하는 볼러들 모집중 <br></br>
                볼링레슨 가능~~ <br></br>
                볼링이중 클럽 <br></br>
                나이제한 83년생까지 <br></br>
                가입 후 한달이내 참석필수 <br></br>
                #부산볼링 #볼링클럽 #서면볼링 #볼링 #부산볼링클럽 #볼링동호회 #2030 #부산동호회
            </div>
            <div className={styles.divSection}></div>
            <div className={styles.title}>
                <h3>클럽 일정</h3>
            </div>
            <div className={`${styles.clubSchedule} ${styles.commonDiv}`}>
                {games.map((game, index) => (
                    <div className={styles.scheduleBox}>
                        <div className={styles.scheduleTitle}>
                            <p>{game.gameName}</p>
                            <div className={styles.scheduleTitle}>
                                <h5>{formatShortDate(game.gameDate)}</h5>
                                {game.members.filter((member) => member.memberId === memberId).length > 0 ? (
                                    <button className={styles.scheduleCancleBtn} onClick={() => scoreboardJoin(game.gameId)}>취소</button>
                                ) : (
                                    <button className={styles.scheduleJoinBtn} onClick={() => scoreboardJoin(game.gameId)}>참석</button>
                                )}
                            </div>
                        </div>
                        <div className={styles.scheduleContnet}>
                            <div className={styles.imgBox}>
                                <img className={styles.scheduleImg} src={require("../../imges/club/bowlingGame.png")}></img>
                            </div>
                            <div className={styles.scheduleDescriptionArea}>
                                <div className={styles.scheduleDescriptionBox}>
                                    <span className={styles.descriptionSubTitle}>일시:</span>
                                    <h5 className={styles.descriptionSubContent}>{formatDateTime(game.gameDate, game.gameTime)}</h5>
                                </div>
                                <div className={styles.scheduleDescriptionBox}>
                                    <span className={styles.descriptionSubTitle}>장소:</span>
                                    <h5 className={styles.descriptionSubContent}>서면볼링센터</h5>
                                </div>
                                <button className={styles.scoreboard} onClick={() => scheduleOnClickHandler(game.gameId)}>점수판</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className={styles.divSection}></div>
            <div className={styles.title}>
                <h3>최근 게임</h3>
            </div>
            <div className={`${styles.clubRecentGame} ${styles.commonDiv}`}>
                <div className={styles.recentGameBox}>
                    <p>제 41회 정모</p>
                    <div className={styles.recentGameCeremony}>
                        <div className={styles.recentGameDescriptionBox}>
                            <span className={styles.recentGameSubTitle}>1등</span>
                            <h5 className={styles.recentGameSubContent}>강호</h5>
                        </div>
                        <div className={styles.recentGameDescriptionBox}>
                            <span className={styles.recentGameSubTitle}>슈퍼히어로</span>
                            <h5 className={styles.recentGameSubContent}>강호</h5>
                        </div>
                    </div>
                    <div className={styles.recentGameCeremony}>
                        <div className={styles.recentGameDescriptionBox}>
                            <span className={styles.recentGameSubTitle}>1군 1등</span>
                            <h5 className={styles.recentGameSubContent}>강호</h5>
                        </div>
                        <div className={styles.recentGameDescriptionBox}>
                            <span className={styles.recentGameSubTitle}>2군 1등</span>
                            <h5 className={styles.recentGameSubContent}>강호</h5>
                        </div>
                    </div>
                    <div className={styles.recentGameCeremony}>
                        <div className={styles.recentGameDescriptionBox}>
                            <span className={styles.recentGameSubTitle}>3군 1등</span>
                            <h5 className={styles.recentGameSubContent}>강호</h5>
                        </div>
                        <div className={styles.recentGameDescriptionBox}>
                            <span className={styles.recentGameSubTitle}>4군 1등</span>
                            <h5 className={styles.recentGameSubContent}>강호</h5>
                        </div>
                    </div>
                    <div className={styles.recentGameTeamCeremony}>
                        <span className={styles.recentGameSubTitle}>팀 1등</span>
                        <h5 className={styles.recentGameSubContent}>강호, 강호, 강호, 강호, 강호</h5>
                    </div>
                </div>
            </div>
            <div className={styles.divSection}></div>
            <div className={styles.title}>
                <h3>클럽 멤버</h3>
            </div>
            <div className={`${styles.memberContainer} ${styles.commonDiv}`}>
                {members.map((member, i) => (
                    <>
                        <div className={styles.memberBox}>
                            <div className={styles.memberProfile}>
                                <img className={styles.memberImg} src={member.memberProfile}></img>
                                <div>
                                    {member.memberName}
                                </div>
                            </div>
                        </div>
                    </>
                ))}
            </div>
        </>
    )
}

function ClubCeremony({  }) {
    const { signInUser, setSignInUser } = useSignInStore();
    const [cookies] = useCookies();
    const token = cookies[ACCESS_TOKEN];
    const [ceremonys, setCeremonys] = useState([]);
    const [expandedIndices, setExpandedIndices] = useState([]);
    const [pageStates, setPageStates] = useState([]);

    const toggleCeremonyInfo = (index) => {
        setExpandedIndices((prevIndices) => {
            if(prevIndices.includes(index)) {
                // 클릭한 인덱스가 이미 열려있으면 닫기
                return prevIndices.filter(i => i !== index);
            }else {
                setPageStates((prevPageStates) => {
                    const newPageStates = [...prevPageStates];
                    newPageStates[index] = 0; // 개인점수로 초기화
                    return newPageStates;
                });
                // 클릭한 인덱스가 닫혀있으면 열기
                return [...prevIndices, index];
            }
        });
    };

    const handlePageChange = (index, newPage) => {
        setPageStates((prevPageStates) => {
            const newPageStates = [...prevPageStates];
            newPageStates[index] = newPage; // 해당 세리머니의 페이지 상태 업데이트
            return newPageStates;
        });
    };

    const clubId = signInUser.clubId || 0;
    const memberId = signInUser.id || null;

    const getCeremonysListResponse = (responseBody) => {
        const message = 
        !responseBody ? '서버에 문제가 있습니다.' :
        responseBody.code === 'AF' ? '잘못된 접근입니다.' :
        responseBody.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

        const isSuccessed = responseBody.code === 'SU';
        if (!isSuccessed) {
            alert(message);
            return;
        }
        const { ceremonys } = responseBody

        setCeremonys(ceremonys);
        console.log(ceremonys)
    }

    const getCeremonysList = () => {
        getCeremonysListRequest(clubId, token).then(getCeremonysListResponse);
    }

    function getAvgScore(...scores) {
        const validScores = scores.filter(score => score !== null && score !== undefined);
        const totalScore = validScores.reduce((acc, score) => acc + score, 0);
        
        if (validScores.length === 0) return 0;
    
        const avg = totalScore / validScores.length;
        return Number.isInteger(avg) ? avg : avg.toFixed(0);
    }

    function getHighScore(...scores) {
        const integerScores = scores.map(score => Number.parseInt(score, 10));
        return Math.max(...integerScores);
    }

    useState(() => {
        setPageStates(new Array(ceremonys.length).fill(0));
        getCeremonysList();
    }, [ceremonys, clubId])
    
    return (
        <>
            <div className={styles.clubCeremonyContainer}>
                <div className={styles.filterBox}>
                    <div className={styles.filterNavBox}>
                        <div className={styles.filterNav}>
                            <p className={styles.filterTitle}>참석여부</p>
                            <div className={styles.filterBtns}>
                                <button className={styles.filterBtn}>전체보기</button>
                                <button className={styles.filterBtn}>참여한 게임만 보기</button>
                            </div>
                        </div>
                        <div className={styles.filterNav}>
                            <p className={styles.filterTitle}>게임종류</p>
                            <div className={styles.filterBtns}>
                                <button className={styles.filterBtn}>전체</button>
                                <button className={styles.filterBtn}>정기모임</button>
                                <button className={styles.filterBtn}>정기번개</button>
                                <button className={styles.filterBtn}>기타</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.ceremonyContainer}>
                    {ceremonys.map((data, i) => (
                        <>
                            <div className={`${styles.ceremonyBox} ${expandedIndices.includes(i) ? styles.selectedCeremony : ""}`} key={data.gameId}>
                                <div className={styles.simpleInformation}>
                                    <div className={styles.simpleGameInfo}>
                                        <div className={styles.simpleGameInfoTitle}>
                                            <h3>{data.gameName}</h3>
                                        </div>
                                        <div className={styles.simpleGameInfoTitle}>
                                            <p>{data.gameDate}</p>
                                        </div>
                                    </div>
                                    <div className={styles.simpleInformationBox}>
                                        <div className={styles.simpleCeremony}>
                                            <span className={styles.simpleCeremonyTitle}>1등</span>
                                            <p>{data.total1stId}</p>
                                        </div>
                                        <div className={styles.simpleCeremony}>
                                            <span className={styles.simpleCeremonyTitle}>에버 1등</span>
                                            <p>{data.avg1stId}</p>
                                        </div>
                                    </div>
                                    <div className={styles.simpleInformationBox}>
                                        <div className={styles.simpleCeremony}>
                                            <span className={styles.simpleCeremonyTitle}>1군 1등</span>
                                            <p>{data.grade1_1stId == "" ? "-" : data.grade1_1stId}</p>
                                        </div>
                                        <div className={styles.simpleCeremony}>
                                            <span className={styles.simpleCeremonyTitle}>2군 1등</span>
                                            <p>{data.grade2_1stId == "" ? "-" : data.grade2_1stId}</p>
                                        </div>
                                    </div>
                                    <div className={styles.simpleInformationBox}>
                                        <div className={styles.simpleCeremony}>
                                            <span className={styles.simpleCeremonyTitle}>3군 1등</span>
                                            <p>{data.grade3_1stId == "" ? "-" : data.grade3_1stId}</p>
                                        </div>
                                        <div className={styles.simpleCeremony}>
                                            <span className={styles.simpleCeremonyTitle}>4군 1등</span>
                                            <p>{data.grade4_1stId == "" ? "-" : data.grade4_1stId}</p>
                                        </div>
                                    </div>
                                    <div className={styles.simpleInformationBox}>
                                        <div className={styles.simpleCeremony}>
                                            <span className={styles.simpleCeremonyTitle}>남자 하이스코어</span>
                                            <p>{data.highScoreOfMan == "" ? "-" : data.highScoreOfMan}</p>
                                        </div>
                                        <div className={styles.simpleCeremony}>
                                            <span className={styles.simpleCeremonyTitle}>여자 하이스코어</span>
                                            <p>{data.highScoreOfGirl == "" ? "-" : data.highScoreOfGirl}</p>
                                        </div>
                                    </div>
                                    <div className={styles.simpleInformationBox}>
                                        <div className={styles.simpleCeremony}>
                                            <span className={styles.simpleCeremonyTitle}>팀 1등</span>
                                            <div className={styles.simpleCeremonyInfoBox}>
                                                <p className={styles.simpleCeremonyInfo}>{data.team1stIds}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.moreInfo} onClick={() => toggleCeremonyInfo(i)}>
                                    {!expandedIndices.includes(i) ? (
                                        <i class="fa-solid fa-chevron-down"></i>
                                    ) : (
                                        <i class="fa-solid fa-chevron-up"></i>
                                    )}
                                </div>
                            </div>
                            {expandedIndices.includes(i) && 
                                <div className={styles.ceremonyInfo} key={data.gameId}>
                                    <div className={styles.ceremonyInfoBtnBox}>
                                        <button className={`${styles.infoBtn} ${pageStates[i] == 0 ? styles.infoBtnSelectedBtn : ""}`} onClick={() => handlePageChange(i, 0)}>개인점수</button>
                                        <button className={`${styles.infoBtn} ${pageStates[i] == 1 ? styles.infoBtnSelectedBtn : ""}`} onClick={() => handlePageChange(i, 1)}>팀 점수</button>
                                    </div>
                                    <div className={styles.ceremonyContext}>
                                        {pageStates[i] === 0 &&
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th>순위</th>
                                                        <th>이름</th>
                                                        <th>에버</th>
                                                        <th>1G</th>
                                                        <th>2G</th>
                                                        <th>3G</th>
                                                        <th>4G</th>
                                                        <th>합계</th>
                                                        <th>평균</th>
                                                        <th>에버편차</th>
                                                        <th>HIGH</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {data.scoreboards.map((member, i) => (
                                                        <tr>
                                                            <td>{(i + 1)}</td>
                                                            <td>{member.memberName}</td>
                                                            <td>{member.memberAvg}</td>
                                                            <td>{member.game1}</td>
                                                            <td>{member.game2}</td>
                                                            <td>{member.game3}</td>
                                                            <td>{member.game4}</td>
                                                            <td>{member.game1 + member.game2 + member.game3 + member.game4}</td>
                                                            <td>{getAvgScore(member.game1 + member.game2 + member.game3 + member.game4)}</td>
                                                            <td>{(member.game1 + member.game2 + member.game3 + member.game4 / 4) - member.memberAvg}</td>
                                                            <td>{getHighScore(member.game1 + member.game2 + member.game3 + member.game4)}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        }
                                        {pageStates[i] == 1 &&
                                            Object.entries(
                                                data.scoreboards.reduce((teams, member) => {
                                                    const teamNumber = member.teamNumber;
                                                    const scoreDifference = ((member.game1 + member.game2 + member.game3 + member.game4)) - (member.memberAvg * 4 );

                                                    if (!teams[teamNumber]) {
                                                        teams[teamNumber] = {
                                                            members: [],
                                                            totalDifference: 0,
                                                            game1Total: 0,
                                                            game2Total: 0,
                                                            game3Total: 0,
                                                            game4Total: 0
                                                        };
                                                    }

                                                    teams[teamNumber].members.push(member);
                                                    teams[teamNumber].totalDifference += scoreDifference;
                                                    teams[teamNumber].game1Total += member.game1 - member.memberAvg;
                                                    teams[teamNumber].game2Total += member.game2 - member.memberAvg;
                                                    teams[teamNumber].game3Total += member.game3 - member.memberAvg;
                                                    teams[teamNumber].game4Total += member.game4 - member.memberAvg;

                                                    return teams;
                                                }, {})
                                            )
                                            // 팀별로 높은 총 차이 점수 순으로 정렬
                                            .sort(([, teamA], [, teamB]) => teamB.totalDifference - teamA.totalDifference)
                                            .map(([teamNumber, team], i) => (
                                                <table className={styles.teamScoreTable} key={teamNumber}>
                                                    <thead>
                                                        <tr className={styles.teamScoreHeaderTr}>
                                                            <th className={styles.teamScoreTh}>{i + 1 + "위"}</th>
                                                            <th className={styles.teamScoreTh} colSpan={2}></th>
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
                                                        {team.members.map((member, index) => (
                                                            <tr className={styles.teamScoreBodyTr} key={index}>
                                                                {index === 0 && (
                                                                    <td className={styles.teamScoreTd} rowSpan={team.members.length}>Team {teamNumber}</td>
                                                                )}
                                                                <td className={styles.teamScoreTd}>{index + 1}</td>
                                                                <td className={styles.teamScoreTd}>{member.memberName}</td>
                                                                <td className={styles.teamScoreTd}>{member.memberAvg}</td>
                                                                <td className={`${styles.teamScoreTd} ${styles.gameScoreBackground}`}>{member.game1}</td>
                                                                <td className={`${styles.teamScoreTd} ${styles.gameScoreBackground}`}>{member.game2}</td>
                                                                <td className={`${styles.teamScoreTd} ${styles.gameScoreBackground}`}>{member.game3}</td>
                                                                <td className={`${styles.teamScoreTd} ${styles.gameScoreBackground}`}>{member.game4}</td>
                                                                <td className={styles.teamScoreTd}>
                                                                    {member.game1 + member.game2 + member.game3 + member.game4}
                                                                </td>
                                                                <td className={styles.teamScoreTd}>
                                                                    {((member.game1 + member.game2 + member.game3 + member.game4) / 4).toFixed(1)}
                                                                </td>
                                                                <td className={styles.teamScoreTd}>
                                                                    {(((member.game1 + member.game2 + member.game3 + member.game4) / 4) - member.memberAvg)}
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                    <tfoot>
                                                        <tr className={styles.teamScoreHeaderTr}>
                                                            <td className={styles.teamScoreTh} colSpan={4}>합계</td>
                                                            <td className={styles.teamScoreTh}>{team.game1Total}</td>
                                                            <td className={styles.teamScoreTh}>{team.game2Total}</td>
                                                            <td className={styles.teamScoreTh}>{team.game3Total}</td>
                                                            <td className={styles.teamScoreTh}>{team.game4Total}</td>
                                                            <td className={styles.teamScoreTh} colSpan={2}>팀 종합</td>
                                                            <td className={styles.teamScoreTh}>{team.totalDifference}</td>
                                                        </tr>
                                                    </tfoot>
                                                </table>
                                            ))}
                                    </div>
                                </div>
                            }
                        </>
                    ))}
                </div>
            </div>
        </>
    )
};

function AddGameModal({ clubId, token, addGameModalBtnClickHandler }) {
    const [gameName, setGameName] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [gameType, setGameType] = useState(null);
    const [confirmCode, setConfirmCode] = useState("");

    const handleGameNameChange = (e) => setGameName(e.target.value);
    const handleDateChange = (e) => setDate(e.target.value);
    const handleTimeChange = (e) => setTime(e.target.value);
    const handleConfirmCodeChange = (e) => setConfirmCode(e.target.value.slice(0, 8));

    const addGameResponse = (resposenBody) => {
        const message = 
            !resposenBody ? '서버에 문제가 있습니다.' :
            resposenBody.code === 'AF' ? '잘못된 접근입니다.' :
            resposenBody.code === 'DBE' ? '서버에 문제가 있습니다.' :
            resposenBody.code === 'SU' ? '게임을 생성하였습니다.' : "";

        const isSuccessed = resposenBody.code === 'SU';
        if (!isSuccessed) {
            alert(message);
            return;
        }

        addGameModalBtnClickHandler();
        alert(message);
    };

    const addGame = () => {
        const game = {
            gameName: gameName,
            date: date,
            time: time,
            gameType: gameType,
            confirmCode: confirmCode,
            clubId: clubId
        }
        addGameRequest(game, token).then(addGameResponse);
    }

    return (
        <>
            <div className={styles.addGameModalContainer}>
                <div className={styles.titleBox}>
                    <div className={styles.backBtn} onClick={addGameModalBtnClickHandler}>
                        <i class="fa-solid fa-chevron-left"></i>
                    </div>
                    <p>게임 생성</p>
                </div>
                <div className={styles.gameInfoContainer}>
                    <div className={styles.gameInfoBox}>
                        <div className={styles.gameTitleBox}>
                            <span className={styles.title}>게임 이름</span>
                        </div>
                        <input 
                            className={styles.infoInput} 
                            placeholder="게임 이름" 
                            value={gameName} 
                            onChange={handleGameNameChange} 
                        />
                    </div>
                    <div className={styles.gameInfoBox}>
                        <span>날짜</span>
                        <input 
                            className={styles.infoInput} 
                            type="date" 
                            value={date} 
                            onChange={handleDateChange} 
                        />
                    </div>
                    <div className={styles.gameInfoBox}>
                        <span>시간</span>
                        <input 
                            className={styles.infoInput} 
                            type="time" 
                            value={time} 
                            onChange={handleTimeChange} 
                        />
                    </div>
                    <div className={styles.gameInfoBox}>
                        <span>모임 종류</span>
                        <div className={styles.gameTypeBtnBox}>
                            <button className={`${styles.gameTypeBtn} ${gameType == 0 ? styles.selectedBtn : ""}`} onClick={() => setGameType(0)}>정기번개</button>
                            <button className={`${styles.gameTypeBtn} ${gameType == 1 ? styles.selectedBtn : ""}`} onClick={() => setGameType(1)}>정기모임</button>
                        </div>
                    </div>
                    <div className={styles.gameInfoBox}>
                        <span>참석확정코드</span>
                        <input 
                            className={styles.infoInput} 
                            type="number" 
                            placeholder="8자리 숫자를 입력해주세요." 
                            value={confirmCode} 
                            onChange={handleConfirmCodeChange} 
                        />
                    </div>
                </div>
                <div className={styles.addGameBtnBox}>
                    <button className={styles.addGameBtn} onClick={addGame}>게임 만들기</button>
                </div>
            </div>
        </>
    );
}