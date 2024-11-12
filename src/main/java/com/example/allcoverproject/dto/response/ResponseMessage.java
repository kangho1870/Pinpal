package com.example.allcoverproject.dto.response;

public interface ResponseMessage {

    String SUCCESS = "Success.";

    String VALIDATION_FAILED = "Validation Failed.";

    String DUPLICATED_USER_ID = "Duplicated user id.";

    String DATABASE_ERROR = "Database error.";

    String SIGN_IN_FAIL = "Sign in failed.";

    String TOKEN_CREATE_FAIL = "Token create failed.";

    String NO_EXIST_MEMBER_ID = "No exist member id.";

    String NO_EXIST_MEMBER_DATA = "No exist member data.";

    String CONFIRM_FAILED = "Confirm failed.";

    String NO_FOUND_GAME = "No found game.";

    String SCOREBOARD_JOIN_CANCLE = "Scoreboard join cancellation.";

    String NO_FUND_CEREMONY = "No fund ceremony.";

    String JWT_EXPIRED = "JWT expired.";

    String ROLE_UPDATE_FAIL_WITH_MASTER = "Master cannot be changed to Staff or Member.";
}
