package com.example.allcoverproject.dto.response.scoreboard;

import com.example.allcoverproject.common.object.ScoreboardResp;
import com.example.allcoverproject.dto.response.CodeMessageRespDto;
import com.example.allcoverproject.dto.response.ResponseCode;
import com.example.allcoverproject.dto.response.ResponseMessage;
import com.example.allcoverproject.entity.Scoreboard;
import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;

@Getter
@Setter
public class GetScoreboardListRespDto extends CodeMessageRespDto {

    private List<ScoreboardResp> members;

    private GetScoreboardListRespDto(List<ScoreboardResp> scoreboard) {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
        this.members = scoreboard;
    }

    public static ResponseEntity<GetScoreboardListRespDto> success(List<ScoreboardResp> scoreboards) {
        GetScoreboardListRespDto responseBody = new GetScoreboardListRespDto(scoreboards);
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }
}
