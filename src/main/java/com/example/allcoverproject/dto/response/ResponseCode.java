package com.example.allcoverproject.dto.response;

public interface ResponseCode {

    String SUCCESS = "SU";
    String VALIDATION_FAIL = "VF";
    String DUPLICATED = "DI";
    String DATABASE_ERROR = "DBE";
    String SIGN_IN_FAIL = "SF";
    String TOKEN_CREATE_FAIL = "TCF";
    String NO_EXIST_MEMBER_ID = "NI";
    String NO_EXIST_MEMBER_DATA = "ND";
    String CONFIRM_FAILED = "CF";
    String NO_FOUND_GAME = "NG";
    String SCOREBOARD_JOIN_CANCLE = "SJC";
    String NO_FUND_CEREMONY = "NC";
    String JWT_EXPIRED = "JE";
    String ROLE_UPDATE_FAIL_WITH_MASTER = "RUF";
}
