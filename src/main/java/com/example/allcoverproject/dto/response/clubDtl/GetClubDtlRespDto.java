package com.example.allcoverproject.dto.response.clubDtl;

import com.example.allcoverproject.common.object.ClubDtlResp;
import com.example.allcoverproject.dto.response.CodeMessageRespDto;
import com.example.allcoverproject.dto.response.ResponseCode;
import com.example.allcoverproject.dto.response.ResponseMessage;
import com.example.allcoverproject.entity.ClubDtl;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;

@Getter
public class GetClubDtlRespDto extends CodeMessageRespDto {
    private List<ClubDtlResp> members;

    public GetClubDtlRespDto(List<ClubDtlResp> clubDtlList) {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
        this.members = clubDtlList;
    }

    public static ResponseEntity<GetClubDtlRespDto> success(List<ClubDtlResp> clubDtlList) {
        GetClubDtlRespDto respDto = new GetClubDtlRespDto(clubDtlList);
        return ResponseEntity.status(HttpStatus.OK).body(respDto);
    }
}
