import axios, { AxiosResponse } from "axios";

const ROOT_API_DOMAIN = process.env.REACT_APP_ROOT_API_DOMAIN;

const AUTH_MODULE_URL = `${ROOT_API_DOMAIN}/api/v1/auth`;

const ID_CHECK_API_URL = `${AUTH_MODULE_URL}/id-check`;
const SIGN_UP_API_URL = `${AUTH_MODULE_URL}/sign-up`;
const SIGN_IN_API_URL = `${AUTH_MODULE_URL}/sign-in`;

const MEMBER_MODULE_URL = `${ROOT_API_DOMAIN}/api/v1/member`;

const GET_SIGN_IN_API_URL = `${MEMBER_MODULE_URL}/sign-in`;

const SCOREBOARD_MODUEL_URL = `${ROOT_API_DOMAIN}/api/v1/scoreboard`;

const bearerAuthorization = (accessToken) => ({ headers: { 'Authorization': `Bearer ${accessToken}` } });

const responseDataHandler = (response) => {
    const { data } = response;
    return data;
};

const responseErrorHandler = (error) => {
    if (!error.response) return null;
    const { data } = error.response;
    
    return { code: data.code, message: data.message };
};

// function: id check api 요청 함수 //
export const idCheckRequest = async (requestBody) => {
    const responseBody = await axios.post(ID_CHECK_API_URL, requestBody)
        .then(responseDataHandler)
        .catch(responseErrorHandler);
    return responseBody;
};

// function: sign up 요청 함수 //
export const signUpRequest = async (requestBody) => {
    console.log(SIGN_UP_API_URL);
    const responseBody = await axios.post(SIGN_UP_API_URL, requestBody)
        .then(responseDataHandler)
        .catch(responseErrorHandler);
    return responseBody;
};

// function: sign in 요청 함수 //
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