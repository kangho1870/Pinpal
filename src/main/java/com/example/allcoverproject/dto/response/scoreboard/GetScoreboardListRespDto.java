package com.example.allcoverproject.dto.response.scoreboard;

import com.example.allcoverproject.common.object.ScoreboardResp;
import com.example.allcoverproject.dto.response.CodeMessageRespDto;
import com.example.allcoverproject.dto.response.ResponseCode;
import com.example.allcoverproject.dto.response.ResponseMessage;
import com.example.allcoverproject.entity.ClubDtl;
import com.example.allcoverproject.entity.Scoreboard;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;

@Getter
public class GetScoreboardListRespDto extends CodeMessageRespDto {

    private List<ScoreboardResp> members;

    private GetScoreboardListRespDto(List<Scoreboard> scoreboard, List<ClubDtl> clubDtlList) {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
        this.members = ScoreboardResp.getList(scoreboard, clubDtlList);
    }

    public static ResponseEntity<GetScoreboardListRespDto> success(List<Scoreboard> scoreboards, List<ClubDtl> clubDtlList) {
        GetScoreboardListRespDto responseBody = new GetScoreboardListRespDto(scoreboards, clubDtlList);
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }
}
