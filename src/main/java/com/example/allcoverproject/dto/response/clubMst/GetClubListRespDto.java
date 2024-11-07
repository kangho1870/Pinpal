package com.example.allcoverproject.dto.response.clubMst;

import com.example.allcoverproject.common.object.ClubListResp;
import com.example.allcoverproject.dto.response.CodeMessageRespDto;
import com.example.allcoverproject.dto.response.ResponseCode;
import com.example.allcoverproject.dto.response.ResponseMessage;
import com.example.allcoverproject.entity.ClubMst;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;

@Getter
public class GetClubListRespDto extends CodeMessageRespDto {
    private List<ClubListResp> clubList;

    private GetClubListRespDto(List<ClubMst> clubMstList, List<Long> count) {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
        this.clubList = ClubListResp.getClubList(clubMstList, count);
    }

    public static ResponseEntity<GetClubListRespDto> success(List<ClubMst> clubMstList, List<Long> count) {
        GetClubListRespDto responseBody = new GetClubListRespDto(clubMstList, count);
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }
}
