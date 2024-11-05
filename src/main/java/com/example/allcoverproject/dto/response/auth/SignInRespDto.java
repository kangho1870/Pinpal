package com.example.allcoverproject.dto.response.auth;

import com.example.allcoverproject.dto.response.CodeMessageRespDto;
import com.example.allcoverproject.dto.response.ResponseCode;
import com.example.allcoverproject.dto.response.ResponseMessage;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Getter
public class SignInRespDto extends CodeMessageRespDto {

    private String accessToken;
    private Integer expiration;

    private SignInRespDto(String accessToken) {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
        this.accessToken = accessToken;
        this.expiration = 4 * 60 * 60;
    }

    public static ResponseEntity<SignInRespDto> success(String accessToken) {
        SignInRespDto responseBody = new SignInRespDto(accessToken);
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }
}
