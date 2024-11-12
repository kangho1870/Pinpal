package com.example.allcoverproject.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@AllArgsConstructor
@Getter
@Setter
public class CodeMessageRespDto {

    private String code;
    private String message;

    public static ResponseEntity<CodeMessageRespDto> success() {
        CodeMessageRespDto responseBody = new CodeMessageRespDto(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }

    public static ResponseEntity<CodeMessageRespDto> validationFail() {
        CodeMessageRespDto responseBody = new CodeMessageRespDto(ResponseCode.VALIDATION_FAIL, ResponseMessage.VALIDATION_FAILED);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseBody);
    }

    public static ResponseEntity<CodeMessageRespDto> duplicated() {
        CodeMessageRespDto responseBody = new CodeMessageRespDto(ResponseCode.DUPLICATED, ResponseMessage.DUPLICATED_USER_ID);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseBody);
    }

    public static ResponseEntity<CodeMessageRespDto> databaseError() {
        CodeMessageRespDto responseBody = new CodeMessageRespDto(ResponseCode.DATABASE_ERROR, ResponseMessage.DATABASE_ERROR);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseBody);
    }

    public static ResponseEntity<CodeMessageRespDto> signInFail() {
        CodeMessageRespDto responseBody = new CodeMessageRespDto(ResponseCode.SIGN_IN_FAIL, ResponseMessage.SIGN_IN_FAIL);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseBody);
    }

    public static ResponseEntity<CodeMessageRespDto> tokenCreateFail() {
        CodeMessageRespDto responseBody = new CodeMessageRespDto(ResponseCode.TOKEN_CREATE_FAIL, ResponseMessage.TOKEN_CREATE_FAIL);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseBody);
    }

    public static ResponseEntity<CodeMessageRespDto> noExistMemberId() {
        CodeMessageRespDto responseBody = new CodeMessageRespDto(ResponseCode.NO_EXIST_MEMBER_ID, ResponseMessage.NO_EXIST_MEMBER_ID);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseBody);
    }

    public static ResponseEntity<CodeMessageRespDto> noExistMemberData() {
        CodeMessageRespDto responseBody = new CodeMessageRespDto(ResponseCode.NO_EXIST_MEMBER_DATA, ResponseMessage.NO_EXIST_MEMBER_DATA);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseBody);
    }

    public static ResponseEntity<CodeMessageRespDto> confirmFail() {
        CodeMessageRespDto responseBody = new CodeMessageRespDto(ResponseCode.CONFIRM_FAILED, ResponseMessage.CONFIRM_FAILED);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseBody);
    }

    public static ResponseEntity<CodeMessageRespDto> noFundGame() {
        CodeMessageRespDto responseBody = new CodeMessageRespDto(ResponseCode.NO_FOUND_GAME, ResponseMessage.NO_FOUND_GAME);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseBody);
    }

    public static ResponseEntity<CodeMessageRespDto> scoreboardJoinCancle() {
        CodeMessageRespDto responseBody = new CodeMessageRespDto(ResponseCode.SCOREBOARD_JOIN_CANCLE, ResponseMessage.SCOREBOARD_JOIN_CANCLE);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseBody);
    }

    public static ResponseEntity<CodeMessageRespDto> noFundCeremony() {
        CodeMessageRespDto responseBody = new CodeMessageRespDto(ResponseCode.NO_FUND_CEREMONY, ResponseMessage.NO_FUND_CEREMONY);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseBody);
    }

    public static ResponseEntity<CodeMessageRespDto> jwtExpired() {
        CodeMessageRespDto responseBody = new CodeMessageRespDto(ResponseCode.JWT_EXPIRED, ResponseMessage.JWT_EXPIRED);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseBody);
    }

    public static ResponseEntity<CodeMessageRespDto> roleUpdateFailWithMaster() {
        CodeMessageRespDto responseBody = new CodeMessageRespDto(ResponseCode.ROLE_UPDATE_FAIL_WITH_MASTER, ResponseMessage.ROLE_UPDATE_FAIL_WITH_MASTER);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseBody);
    }
}
