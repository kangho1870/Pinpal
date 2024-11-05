import axios, { AxiosResponse } from "axios";

const ROOT_API_DOMAIN = process.env.REACT_APP_ROOT_API_DOMAIN;

const AUTH_MODULE_URL = `${ROOT_API_DOMAIN}/api/v1/auth`;

const ID_CHECK_API_URL = `${AUTH_MODULE_URL}/id-check`;
const SIGN_UP_API_URL = `${AUTH_MODULE_URL}/sign-up`;
const SIGN_IN_API_URL = `${AUTH_MODULE_URL}/sign-in`;

const MEMBER_MODULE_URL = `${ROOT_API_DOMAIN}/api/v1/member`;

const GET_SIGN_IN_API_URL = `${MEMBER_MODULE_URL}/sign-in`;

const SCOREBOARD_MODUEL_URL = `${ROOT_API_DOMAIN}/api/v1/scoreboard`;

const GET_SCOREBOARD_MEMBER_API_URL = (gameId, clubId) => `${SCOREBOARD_MODUEL_URL}/?gameId=${gameId}&clubId=${clubId}`

const SCOREBOARD_JOIN_API_URL = (gameId, memberId) => `${SCOREBOARD_MODUEL_URL}/join?gameId=${gameId}&memberId=${memberId}`;

const SIDE_JOIN_API_URL = (gameId, memberId, sideType) => `${SCOREBOARD_MODUEL_URL}/joinSide?gameId=${gameId}&memberId=${memberId}&sideType=${sideType}`;

const CONFIRM_CHECK_API_URL = (gameId, memberId) => `${SCOREBOARD_MODUEL_URL}/confirmedJoin?gameId=${gameId}&memberId=${memberId}`;

const GRADE_SETTING_API_URL = (gameId) => `${SCOREBOARD_MODUEL_URL}/setGrade?gameId=${gameId}`;

const TEAM_SETTING_API_URL = (gameId) => `${SCOREBOARD_MODUEL_URL}/setTeam?gameId=${gameId}`;

const SCOREBOARD_SCORE_COUNTING_STOP_API_URL = (gameId) => `${SCOREBOARD_MODUEL_URL}/stopScoreCounting?gameId=${gameId}`;

const SCORE_INPUT_API_URL = (gameId, memberId) => `${SCOREBOARD_MODUEL_URL}/saveScore?memberId=${memberId}&gameId=${gameId}`;

const SCOREBOARD_GAME_STOP_API_URL = () => `${SCOREBOARD_MODUEL_URL}/stop`;

const bearerAuthorization = (accessToken) => ({ headers: { 'Authorization': `Bearer ${accessToken}` } });

const GAME_MODULE_URL = `${ROOT_API_DOMAIN}/api/v1/game`;

const GET_GAMES_BY_CLUB_API_URL = (clubId) => `${GAME_MODULE_URL}?clubId=${clubId}`;



const ADD_GAME_API_URL = `${GAME_MODULE_URL}`;

const CLUB_MODULE_URL = `${ROOT_API_DOMAIN}/api/v1/club`;

const GET_MEMBERS_BY_CLUB_API_URL = (clubId) => `${CLUB_MODULE_URL}/home?clubId=${clubId}`;

const GET_CEREMONYS_BY_CLUB_API_URL = (clubId) => `${CLUB_MODULE_URL}/ceremony?clubId=${clubId}`;

const responseDataHandler = (response) => {
    const { data } = response;
    return data;
};

const responseErrorHandler = (error) => {
    console.log(error)
    if (!error.response) return null;
    const { data } = error.response;
    
    return { code: data.code, message: data.message };
};

// auth 관련 함수
export const idCheckRequest = async (requestBody) => {
    const responseBody = await axios.post(ID_CHECK_API_URL, requestBody)
        .then(responseDataHandler)
        .catch(responseErrorHandler);
    return responseBody;
};

export const signUpRequest = async (requestBody) => {
    console.log(SIGN_UP_API_URL);
    const responseBody = await axios.post(SIGN_UP_API_URL, requestBody)
        .then(responseDataHandler)
        .catch(responseErrorHandler);
    return responseBody;
};

export const signInRequest = async (requestBody) => {
    const responseBody = await axios.post(SIGN_IN_API_URL, requestBody)
        .then(responseDataHandler)
        .catch(responseErrorHandler);
    return responseBody;
};

export const getSignInRequest = async (accessToken) => {
    const responseBody = await axios.get(GET_SIGN_IN_API_URL, bearerAuthorization(accessToken))
        .then(responseDataHandler)
        .catch(responseErrorHandler);
    return responseBody;
};

// scoreboard 관련 함수
export const getScoreboardMembers = async (gameId, clubId, accessToken) => {
    const responseBody = await axios.get(GET_SCOREBOARD_MEMBER_API_URL(gameId, clubId), bearerAuthorization(accessToken))
        .then(responseDataHandler)
        .catch(responseErrorHandler);
    return responseBody;
};

export const scoreboardJoinRequest = async (gameId, memberId, accessToken) => {
    const responseBody = await axios.post(SCOREBOARD_JOIN_API_URL(gameId, memberId),{}, bearerAuthorization(accessToken))
        .then(responseDataHandler)
        .catch(responseErrorHandler);
    return responseBody;
}

export const sideJoinRequest = async (gameId, memberId, sideType, accessToken) => {
    const responseBody = await axios.post(SIDE_JOIN_API_URL(gameId, memberId, sideType), {}, bearerAuthorization(accessToken))
        .then(responseDataHandler)
        .catch(responseErrorHandler);
    return responseBody;
};

export const confirmCheckRequest = async (gameId, memberId, code, accessToken) => {
    const responseBody = await axios.post(`${CONFIRM_CHECK_API_URL(gameId, memberId)}`, { code: code }, bearerAuthorization(accessToken))
        .then(responseDataHandler)
        .catch(responseErrorHandler);
    return responseBody;
}

export const scoreCountingStopRequest = async (gameId, accessToken) => {
    console.log(gameId + " + " + accessToken)
    const responseBody = await axios.post(`${SCOREBOARD_SCORE_COUNTING_STOP_API_URL(gameId)}`, {}, bearerAuthorization(accessToken))
        .then(responseDataHandler)
        .catch(responseErrorHandler);
    return responseBody;
}

export const gradeSettingRequest = async (gameId, updatedMembers, accessToken) => {
    const responsBody = await axios.post(`${GRADE_SETTING_API_URL(gameId)}`, { updatedMembers }, bearerAuthorization(accessToken))
        .then(responseDataHandler)
        .catch(responseErrorHandler);
    return responsBody;
}

export const teamSettingRequest = async (gameId, members, accessToken) => {
    const responsBody = await axios.post(`${TEAM_SETTING_API_URL(gameId)}`, { members }, bearerAuthorization(accessToken))
        .then(responseDataHandler)
        .catch(responseErrorHandler);
    return responsBody;
};

export const teamRandomSettingRequest = async (gameId, members, accessToken) => {
    const responsBody = await axios.post(`${TEAM_SETTING_API_URL(gameId)}`, { members }, bearerAuthorization(accessToken))
        .then(responseDataHandler)
        .catch(responseErrorHandler);
    return responsBody;
};

export const scoreInputRequest = async (gameId, memberId, scores, accessToken) => {
    const responsBody = await axios.post(`${SCORE_INPUT_API_URL(gameId, memberId)}`, scores, bearerAuthorization(accessToken))
        .then(responseDataHandler)
        .catch(responseErrorHandler);
    return responsBody;
}

export const scoreboardGameStop = async (dto, accessToken) => {
    const responsBody = await axios.post(`${SCOREBOARD_GAME_STOP_API_URL()}`, dto, bearerAuthorization(accessToken))
        .then((response) => {
            console.log(response)
        })
        .catch((error) => {
            console.log(error)
        });
    return responsBody;
}

// game 관련 함수

export const getGameListRequest = async (clubId, accessToken) => {
    const responseBody = await axios.get(`${GET_GAMES_BY_CLUB_API_URL(clubId)}`, bearerAuthorization(accessToken))
        .then(responseDataHandler)
        .catch(responseErrorHandler)
    return responseBody;
}

export const addGameRequest = async (game, accessToken) => {
    const responseBody = await axios.post(`${ADD_GAME_API_URL}`, game, bearerAuthorization(accessToken))
        .then(responseDataHandler)
        .catch(responseErrorHandler)
    return responseBody;
}

// club관련 함수

export const getMemberListRequest = async (clubId, accessToken) => {
    const responseBody = await axios.get(`${GET_MEMBERS_BY_CLUB_API_URL(clubId)}`, bearerAuthorization(accessToken))
        .then(responseDataHandler)
        .catch(responseErrorHandler)
    return responseBody;
}

export const getCeremonysListRequest = async (clubId, accessToken) => {
    const responseBody = await axios.get(`${GET_CEREMONYS_BY_CLUB_API_URL(clubId)}`, bearerAuthorization(accessToken))
        .then(responseDataHandler)
        .catch(responseErrorHandler)
    return responseBody;
}