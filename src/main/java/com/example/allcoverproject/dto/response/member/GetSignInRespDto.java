package com.example.allcoverproject.dto.response.member;

import com.example.allcoverproject.dto.response.CodeMessageRespDto;
import com.example.allcoverproject.dto.response.ResponseCode;
import com.example.allcoverproject.dto.response.ResponseMessage;
import com.example.allcoverproject.entity.ClubDtl;
import com.example.allcoverproject.entity.Member;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Getter
public class GetSignInRespDto extends CodeMessageRespDto {

    private String memberId;
    private Long id;
    private Long clubId;
    private String clubRole;

    public GetSignInRespDto(Member member, ClubDtl clubDtl) {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
        this.memberId = member.getEmail();
        this.id = member.getId();
        this.clubRole = clubDtl != null ? clubDtl.getRole() : null;
        System.out.println("club_role = " + member.getName());
        this.clubId = clubDtl != null ? clubDtl.getId() : null;
    }

    public static ResponseEntity<GetSignInRespDto> success(Member member, ClubDtl clubDtl) {
        GetSignInRespDto responseBody = new GetSignInRespDto(member, clubDtl);
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }
}
