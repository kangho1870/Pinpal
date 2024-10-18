package com.example.allcoverproject.dto.response.member;

import com.example.allcoverproject.dto.response.CodeMessageRespDto;
import com.example.allcoverproject.dto.response.ResponseCode;
import com.example.allcoverproject.dto.response.ResponseMessage;
import com.example.allcoverproject.entity.Member;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Getter
public class GetSignIRespDto extends CodeMessageRespDto {

    private String memberId;
    private String memberName;

    public GetSignIRespDto(Member member) {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
        this.memberId = member.getEmail();
        this.memberName = member.getName();
    }

    public static ResponseEntity<GetSignIRespDto> success(Member member) {
        GetSignIRespDto responseBody = new GetSignIRespDto(member);
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }
}
