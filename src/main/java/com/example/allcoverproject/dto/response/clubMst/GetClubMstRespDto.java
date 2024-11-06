package com.example.allcoverproject.dto.response.clubMst;

import com.example.allcoverproject.dto.response.CodeMessageRespDto;
import com.example.allcoverproject.dto.response.ResponseCode;
import com.example.allcoverproject.dto.response.ResponseMessage;
import com.example.allcoverproject.entity.ClubMst;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Getter
public class GetClubMstRespDto extends CodeMessageRespDto {

    private String clubName;
    private String clubDescription;

    public GetClubMstRespDto(ClubMst clubMst) {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
        this.clubName = clubMst.getName();
        this.clubDescription = clubMst.getDescription();
    }

    public static ResponseEntity<GetClubMstRespDto> success(ClubMst clubMst) {
        GetClubMstRespDto responseBody = new GetClubMstRespDto(clubMst);
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }
}
