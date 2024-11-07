import { useEffect, useState } from "react";
import styles from "../css/routes/MyClub.module.css";
import useSignInStore from "../../stores/useSignInStore";
import { useCookies } from "react-cookie";
import { ACCESS_TOKEN, CLUB_DETAIL_PATH, ROOT_PATH, SCOREBOARD_PATH } from "../../constants";
import { useNavigate, useParams } from "react-router-dom";
import { onClickBackBtn } from "../../hooks";
import { addGameRequest, clubJoinRequest, clubMemberAvgUpdateRequest, getCeremonysListRequest, getClubInfoRequest, getGameListRequest, getMemberListRequest, scoreboardJoinRequest } from "../../apis";
import Loading from "../components/loading/Loading";
import useClubStore from "../../stores/useClubStore";
import TextEditor from "../components/textEditor/TextEditor";

function MyClub() {

    const { members, setMembers, setCeremonys, setGames } = useClubStore();
    const { signInUser, setSignInUser } = useSignInStore();
    const [loading, setLoading] = useState(false);
    const [addGameModal, setAddGameModal] = useState(false);
    const navigator = useNavigate();
    const [cookies] = useCookies();
    const [clubInfo, setClubInfo] = useState({});
    const token = cookies[ACCESS_TOKEN];
    const [page, setPage] = useState(0);
    const { clubId } = useParams();
    const memberId = signInUser?.id || null;
    const roles = signInUser?.clubRole ? signInUser.clubRole.split(", ").map(role => role.trim()) : [];

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


    const addGameModalBtnClickHandler = () => {
        setAddGameModal(!addGameModal);
    }

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
    }

    const getCeremonysList = () => {
        getCeremonysListRequest(clubId, token).then(getCeremonysListResponse);
    }

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
        setLoading(false);
    }

    const getGamesRequest = () => {
        setLoading(true);
        getGameListRequest(clubId, token).then(getGamesResponse);
    }

    const getClubInfoResponse = (responseBody) => {
        const message = 
        !responseBody ? '서버에 문제가 있습니다.' :
        responseBody.code === 'AF' ? '잘못된 접근입니다.' :
        responseBody.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

        const isSuccessed = responseBody.code === 'SU';
        if (!isSuccessed) {
            alert(message);
            return;
        }
        const { clubName, clubDescription } = responseBody
        setClubInfo({ clubName, clubDescription });
    }

    const getClubInfo = () => {
        getClubInfoRequest(clubId, token).then(getClubInfoResponse);
    }

    const memberJoinClubResponse = (responseBody) => {

        const message = 
        !responseBody ? '서버에 문제가 있습니다.' :
        responseBody.code === 'AF' ? '잘못된 접근입니다.' :
        responseBody.code === 'DBE' ? '서버에 문제가 있습니다.' :
        responseBody.code === 'SJC' ? '취소 처리되었습니다.' : 
        responseBody.code === 'SU' ? '클럽에 가입되었습니다.' : '';

        const isSuccessed = responseBody.code === 'SU' || 'SJC';

        if (!isSuccessed) {
            alert(message);
            return; 
        }
        
        alert(message);
        getMemberListRequest();
        setLoading(false);
    }

    const memberJoinClubRequest = () => {
        if(members.filter((member) => member.memberId === memberId)) {
            alert("이미 가입한 클럽입니다.")
            return;
        }
        setLoading(true);
        clubJoinRequest(clubId, memberId, token).then(memberJoinClubResponse);
    }

    useEffect(() => {
        if(cookies[ACCESS_TOKEN] == null) {
            alert("로그인이 필요한 서비스입니다.");
            navigator(ROOT_PATH);
        }
        if(clubId == null) {
            return;
        }
        getMembersRequest();
        getCeremonysList();
        getGamesRequest();
        getClubInfo();
    },[clubId])

    return (
        <>
            <div className={styles.container}>
                <div className={styles.top}>
                    <div className={styles.clubTitle}>
                        <div className={styles.topCategory} onClick={() => onClickBackBtn(navigator)}><i class="fa-solid fa-chevron-left"></i></div>
                        <span className={styles.clubNameTitle}>{clubInfo.clubName}</span>
                        <div className={styles.topCategory}><i class="fa-solid fa-right-from-bracket"></i></div>
                    </div>
                    <div className={styles.clubNav}>
                        <button className={`${styles.clubNavBtns} ${page == 0 ? styles.selectedClubNavBtn : ""}`} onClick={() => setPage(0)}><span className={styles.btnSpan}>홈</span></button>
                        <button className={`${styles.clubNavBtns} ${page == 1 ? styles.selectedClubNavBtn : ""}`} onClick={() => setPage(1)}><span className={styles.btnSpan}>기록실</span></button>
                        <button className={`${styles.clubNavBtns} ${page == 2 ? styles.selectedClubNavBtn : ""}`} onClick={() => setPage(2)}><span className={styles.btnSpan}>게시판</span></button>
                        <button className={`${styles.clubNavBtns} ${page == 3 ? styles.selectedClubNavBtn : ""}`} onClick={() => setPage(3)}><span className={styles.btnSpan}>랭킹</span></button>
                        {(roles.includes("STAFF") || roles.includes("MASTER")) &&
                            <button className={`${styles.clubNavBtns} ${page == 4 ? styles.selectedClubNavBtn : ""}`} onClick={() => setPage(4)}><span className={styles.btnSpan}>관리</span></button>
                        }
                    </div>
                </div>
                <div className={styles.contextArea}>
                    {page == 0 &&
                        <ClubHome clubInfo={clubInfo} setLoading={setLoading} getGamesRequest={getGamesRequest}></ClubHome>
                    }
                    {page == 1 &&
                        <ClubCeremony setLoading={setLoading}></ClubCeremony>
                    }
                    {page == 4 &&
                        <ClubSetting setLoading={setLoading}></ClubSetting>
                    }
                </div>
            </div>
            {page === 0 && (roles.includes("STAFF") || roles.includes("MASTER")) &&
                <div className={styles.modalContainer}>
                    <div className={styles.modalBox}>
                        <div className={styles.modal} onClick={addGameModalBtnClickHandler}>
                            <i className="fa-solid fa-plus"></i>
                            <span className={styles.title}>게임 생성</span>
                        </div>
                    </div>
                </div>
            }
            {addGameModal && (roles.includes("STAFF") || roles.includes("MASTER")) &&
                <div className={styles.addGameModal}>
                    <AddGameModal clubId={clubId} token={token} addGameModalBtnClickHandler={addGameModalBtnClickHandler} ></AddGameModal>
                </div>
            }
            {loading &&
                <Loading></Loading>
            }
            {page == 0 && !members.filter((member) => member.memberId == memberId) &&
                <button className={styles.clubJoinBtn} onClick={memberJoinClubRequest}>클럽 가입하기</button>
            }
        </>
    )
}

export default MyClub;

function ClubHome({ clubInfo, setLoading, getGamesRequest }) {

    const { members, ceremonys, games } = useClubStore();
    const { signInUser, setSignInUser } = useSignInStore();
    const navigator = useNavigate();
    const [cookies] = useCookies();
    const token = cookies[ACCESS_TOKEN];

    const clubId = signInUser?.clubId || 0;
    const memberId = signInUser?.id || null;
    const roles = signInUser?.clubRole ? signInUser.clubRole.split(", ").map(role => role.trim()) : [];

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
    },[clubId])

    return (
        <>
            <div className={`${styles.clubBannerArea}`}>
                <img className={styles.bannerImage} src={require("../../imges/KakaoTalk_20241108_021010839.jpg")}></img>
            </div>
            <div
                className={`${styles.clubDescription} ${styles.commonDiv}`}
                dangerouslySetInnerHTML={{ __html: clubInfo.clubDescription }}
            />
            <div className={styles.divSection}></div>
            <div className={styles.subTitle}>
                <h3>클럽 일정</h3>
            </div>
            <div className={`${styles.clubSchedule} ${styles.commonDiv}`}>
                {games.length > 0 ? (
                    games
                        .filter((game) => new Date(game.gameDate) >= new Date()) // 현재 날짜와 같거나 큰 날짜만 필터링
                        .map((game, index) => (
                            <>
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
                                            <div className={styles.scheduleDescriptionBox}>
                                                <span className={styles.descriptionSubTitle}>참석:</span>
                                                <h5 className={styles.descriptionSubContent}>{game.members.length + "명"}</h5>
                                            </div>
                                            <button className={styles.scoreboard} onClick={() => scheduleOnClickHandler(game.gameId)}>점수판</button>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.memberProfileContainer}>
                                    {game.members.map((member, i) => (
                                        <div className={styles.memberBox}>
                                            <img className={styles.memberProfileImg} src={member.memberProfile} key={i}></img>
                                            {roles.includes("MASTER") && 
                                                <img className={styles.staffImg} src={require("../../imges/club/master.png")}></img>
                                            }
                                            {roles.includes("STAFF") && 
                                                <img className={styles.staffImg} src={require("../../imges/club/staff.png")}></img>
                                            }
                                        </div>
                                    ))}
                                </div>
                            </>
                        ))
                ) : (
                    <div className={styles.nodataContainer}>
                        <Nodata text={"진행중인 일정이 없습니다."}></Nodata>
                    </div>
                )}
            </div>
            <div className={styles.divSection}></div>
            <div className={styles.subTitle}>
                <h3>최근 게임</h3>
            </div>
            <div className={`${styles.clubRecentGame} ${styles.commonDiv}`}>
                {ceremonys.length > 0 ? (
                    ceremonys.map((ceremony, i) => (
                        <div className={styles.recentGameBox}>
                            <p>{ceremony.gameName}</p>
                            <div className={styles.recentGameCeremony}>
                                <div className={styles.recentGameDescriptionBox}>
                                    <span className={styles.recentGameSubTitle}>1등</span>
                                    <h5 className={styles.recentGameSubContent}>{ceremony.total1stId}</h5>
                                </div>
                                <div className={styles.recentGameDescriptionBox}>
                                    <span className={styles.recentGameSubTitle}>에버1등</span>
                                    <h5 className={styles.recentGameSubContent}>{ceremony.avg1stId}</h5>
                                </div>
                            </div>
                            <div className={styles.recentGameCeremony}>
                                <div className={styles.recentGameDescriptionBox}>
                                    <span className={styles.recentGameSubTitle}>1군 1등</span>
                                    <h5 className={styles.recentGameSubContent}>{ceremony.grade1_1stId == "" ? "-" : ceremony.grade1_1stId}</h5>
                                </div>
                                <div className={styles.recentGameDescriptionBox}>
                                    <span className={styles.recentGameSubTitle}>2군 1등</span>
                                    <h5 className={styles.recentGameSubContent}>{ceremony.grade2_1stId == "" ? "-" : ceremony.grade2_1stId}</h5>
                                </div>
                            </div>
                            <div className={styles.recentGameCeremony}>
                                <div className={styles.recentGameDescriptionBox}>
                                    <span className={styles.recentGameSubTitle}>3군 1등</span>
                                    <h5 className={styles.recentGameSubContent}>{ceremony.grade3_1stId == "" ? "-" : ceremony.grade3_1stId}</h5>
                                </div>
                                <div className={styles.recentGameDescriptionBox}>
                                    <span className={styles.recentGameSubTitle}>4군 1등</span>
                                    <h5 className={styles.recentGameSubContent}>{ceremony.grade4_1stId == "" ? "-" : ceremony.grade4_1stId}</h5>
                                </div>
                            </div>
                            <div className={styles.recentGameTeamCeremony}>
                                <span className={styles.recentGameSubTitle}>팀 1등</span>
                                <h5 className={styles.recentGameSubContent}>{ceremony.team1stIds}</h5>
                            </div>
                        </div>
                    ))): 
                    (
                        <div className={styles.nodataContainer}>
                            <Nodata text={"최근 게임 데이터가 없습니다."}></Nodata>
                        </div>
                    )
                }
                
            </div>
            <div className={styles.divSection}></div>
            <div className={styles.subTitle}>
                <h3>클럽 멤버</h3>
            </div>
            <div className={`${styles.memberContainer} ${styles.commonDiv}`}>
                {members.map((member, i) => (
                    <>
                        <div className={styles.memberBox}>
                            <div className={styles.memberProfile}>
                                <img className={styles.memberImg} src={member.memberProfile}></img>
                                {roles.includes("MASTER") && 
                                    <img className={styles.staffImg} src={require("../../imges/club/master.png")}></img>
                                }
                                {roles.includes("STAFF") && 
                                    <img className={styles.staffImg} src={require("../../imges/club/staff.png")}></img>
                                }
                            </div>
                            <div className={styles.memberProfileBox}>
                                {member.memberName}
                            </div>
                        </div>
                    </>
                ))}
            </div>
        </>
    )
}

function ClubCeremony({ setLoading }) {

    const { ceremonys } = useClubStore();
    const { signInUser, setSignInUser } = useSignInStore();
    const [cookies] = useCookies();
    const token = cookies[ACCESS_TOKEN];
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

    const clubId = signInUser?.clubId || 0;
    const memberId = signInUser?.id || null;

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
    }, [ceremonys, clubId])
    
    return (
        <>
            <div className={styles.clubCeremonyContainer}>
                <div className={styles.filterBox}>
                    <div className={styles.filterNavBox}>
                        <div className={styles.filterNav}>
                            <p className={styles.filterTitle}>참석여부</p>
                            <div className={styles.filterBtns}>
                                <button className={styles.filterBtn}>전체</button>
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
                    {ceremonys.length > 0 ? ceremonys.map((data, i) => (
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
                    )) : (
                            <div className={styles.nodataContainer}>
                                <Nodata text={"기록이 없습니다."}></Nodata>
                            </div>
                        )
                    }
                </div>
            </div>
        </>
    )
};

function ClubSetting() {
    const { members } = useClubStore();
    const [cookies] = useCookies();
    const token = cookies[ACCESS_TOKEN];
    const [page, setPage] = useState(0);
    const [updatedMembers, setUpdatedMembers] = useState([]);

    const groupedMembers = members.reduce((acc, member) => {
        const { memberGrade } = member;
        if (!acc[memberGrade]) {
            acc[memberGrade] = [];
        }
        acc[memberGrade].push(member);
        return acc;
    }, {});

    const memberAvgUpdate = (memberId, newAvg) => {
        setUpdatedMembers(prev =>
            prev.map(member =>
                member.memberId === memberId ? { ...member, memberAvg: newAvg } : member
            )
        );
    };
    
    const memberGradeUpdate = (memberId, newGrade) => {
        console.log(newGrade)
        setUpdatedMembers(prev =>
            prev.map(member =>
                member.memberId === memberId ? { ...member, memberGrade: newGrade } : member
            )
        );
    };

    const memberAvgUpdateResponse = (responseBody) => {

        const message = 
        !responseBody ? '서버에 문제가 있습니다.' :
        responseBody.code === 'AF' ? '잘못된 접근입니다.' :
        responseBody.code === 'DBE' ? '서버에 문제가 있습니다.' :
        responseBody.code === 'SJC' ? '취소 처리되었습니다.' : 
        responseBody.code === 'SU' ? '저장 완료되었습니다..' : '';

        const isSuccessed = responseBody.code === 'SU' || 'SJC';
        if (!isSuccessed) {
            alert(message);
            return;
        }
        
        alert(message);

    }

    const memberAvgUpdateRequest = () => {
        const dto = {
            ids: updatedMembers.map(member => member.memberId),
            avg: updatedMembers.map(member => member.memberAvg),
            grades: updatedMembers.map(member => member.memberGrade),
        }
        console.log(dto)
        clubMemberAvgUpdateRequest(dto, token).then(memberAvgUpdateResponse);
    }

    useEffect(() => {
        setUpdatedMembers(members);
    }, [members])

    return (
        <div className={styles.container}>
            <div className={styles.clubNav}>
                <button
                    className={`${styles.clubNavBtns} ${page === 0 ? styles.selectedClubNavBtn : ""}`}
                    onClick={() => setPage(0)}
                >
                    에버
                </button>
                <button
                    className={`${styles.clubNavBtns} ${page === 1 ? styles.selectedClubNavBtn : ""}`}
                    onClick={() => setPage(1)}
                >
                    회원관리
                </button>
            </div>
            <div className={styles.contextArea}>
                {page == 0 && 
                    <>
                        <div className={styles.gradesAvg}>
                            {Object.keys(groupedMembers).map((grade, i) => (
                                grade != 0 && grade < 3 && (
                                    <div key={grade} className={styles.gradeGroup}>
                                        {i === 0 ? <h3 className={styles.gradeTitle}>{grade} 군</h3> : ""}
                                        {groupedMembers[grade].map((member) => (
                                            <div key={member.memberId} className={styles.gradeBox}>
                                                <div className={styles.memberAvgBox}>
                                                    <p>{member.memberName}</p>
                                                </div>
                                                <div className={styles.memberAvgBox}>
                                                    <p>{member.memberAvg}</p>
                                                </div>
                                                <div className={styles.memberAvgBox}>
                                                    <input
                                                        type="number"
                                                        placeholder="에버"
                                                        className={styles.avgInput}
                                                        onChange={(e) =>
                                                            memberAvgUpdate(member.memberId, e.target.value)
                                                        }
                                                    />
                                                </div>
                                                <div className={styles.memberAvgBox}>
                                                    <input
                                                        type="number"
                                                        placeholder="군"
                                                        className={styles.avgInput}
                                                        onChange={(e) =>
                                                            memberGradeUpdate(member.memberId, e.target.value)
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )
                            ))}
                        </div>
                        <div className={styles.gradesAvg}>
                            {Object.keys(groupedMembers).map((grade, i) => (
                                grade != 0 && grade > 2 && grade < 5 && (
                                    <div key={grade} className={styles.gradeGroup}>
                                        {i === 0 ? <h3 className={styles.gradeTitle}>{grade} 군</h3> : ""}
                                        {groupedMembers[grade].map((member) => (
                                            <div key={member.memberId} className={styles.gradeBox}>
                                                <div className={styles.memberAvgBox}>
                                                    <p>{member.memberName}</p>
                                                </div>
                                                <div className={styles.memberAvgBox}>
                                                    <p>{member.memberAvg}</p>
                                                </div>
                                                <div className={styles.memberAvgBox}>
                                                    <input
                                                        type="number"
                                                        placeholder="에버"
                                                        className={styles.avgInput}
                                                        onChange={(e) =>
                                                            memberAvgUpdate(member.memberId, e.target.value)
                                                        }
                                                    />
                                                </div>
                                                <div className={styles.memberAvgBox}>
                                                    <input
                                                        type="number"
                                                        placeholder="군"
                                                        className={styles.avgInput}
                                                        onChange={(e) =>
                                                            memberGradeUpdate(member.memberId, e.target.value)
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )
                            ))}
                        </div>
                        <div className={styles.gradesAvg}>
                            {Object.keys(groupedMembers).map((grade, i) => (
                                grade != 0 && grade > 4 && grade < 7 && (
                                    <div key={grade} className={styles.gradeGroup}>
                                        {i === 0 ? <h3 className={styles.gradeTitle}>{grade} 군</h3> : ""}
                                        {groupedMembers[grade].map((member) => (
                                            <div key={member.memberId} className={styles.gradeBox}>
                                                <div className={styles.memberAvgBox}>
                                                    <p>{member.memberName}</p>
                                                </div>
                                                <div className={styles.memberAvgBox}>
                                                    <p>{member.memberAvg}</p>
                                                </div>
                                                <div className={styles.memberAvgBox}>
                                                    <input
                                                        type="number"
                                                        placeholder="에버"
                                                        className={styles.avgInput}
                                                        onChange={(e) =>
                                                            memberAvgUpdate(member.memberId, e.target.value)
                                                        }
                                                    />
                                                </div>
                                                <div className={styles.memberAvgBox}>
                                                    <input
                                                        type="number"
                                                        placeholder="군"
                                                        className={styles.avgInput}
                                                        onChange={(e) =>
                                                            memberGradeUpdate(member.memberId, e.target.value)
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )
                            ))}
                        </div>
                        <div className={styles.gradesAvg}>
                            {Object.keys(groupedMembers).map((grade, i) => (
                                grade == 0 && (
                                    <div key={grade} className={styles.gradeGroup}>
                                        {i === 0 ? <h3 className={styles.gradeTitle}>신입</h3> : ""}
                                        {groupedMembers[grade].map((member) => (
                                            <div key={member.memberId} className={styles.gradeBox}>
                                                <div className={styles.memberAvgBox}>
                                                    <p>{member.memberName}</p>
                                                </div>
                                                <div className={styles.memberAvgBox}>
                                                    <p>{member.memberAvg}</p>
                                                </div>
                                                <div className={styles.memberAvgBox}>
                                                    <input
                                                        type="number"
                                                        placeholder="에버"
                                                        className={styles.avgInput}
                                                        onChange={(e) =>
                                                            memberAvgUpdate(member.memberId, e.target.value)
                                                        }
                                                    />
                                                </div>
                                                <div className={styles.memberAvgBox}>
                                                    <input
                                                        type="number"
                                                        placeholder="군"
                                                        className={styles.avgInput}
                                                        onChange={(e) =>
                                                            memberGradeUpdate(member.memberId, e.target.value)
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )
                            ))}
                        </div>
                        <div className={styles.avgSaveBtnBox}>
                            <button className={styles.avgSaveBtn} onClick={memberAvgUpdateRequest}>저장하기</button>
                        </div>
                    </>
                }
            </div>
            
        </div>
    );
}

function AddGameModal({ clubId, token, addGameModalBtnClickHandler }) {
    const [gameName, setGameName] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const navigator = useNavigate();
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
        navigator(CLUB_DETAIL_PATH(clubId));
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


function Nodata({ text }) {
    return (
        <div className={styles.nodataBox}>
            <img className={styles.nodataImg} src={require("../../imges/club/noData.png")}></img>
            <span>{text}</span>
        </div>
    )
}