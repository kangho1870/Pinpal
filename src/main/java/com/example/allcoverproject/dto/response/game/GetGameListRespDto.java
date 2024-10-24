package com.example.allcoverproject.dto.response.myclub;

import com.example.allcoverproject.common.object.MyClubPageResp;
import com.example.allcoverproject.dto.response.CodeMessageRespDto;
import com.example.allcoverproject.dto.response.ResponseCode;
import com.example.allcoverproject.dto.response.ResponseMessage;
import com.example.allcoverproject.dto.response.scoreboard.GetScoreboardListRespDto;
import com.example.allcoverproject.entity.Game;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;

@Getter
public class GetMyClubListRespDto extends CodeMessageRespDto {

    private List<MyClubPageResp> myClubPageResps;

    private GetMyClubListRespDto(List<Game> games) {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
        this.myClubPageResps = MyClubPageResp.getClubPageRespList(games);
    }

    public static ResponseEntity<GetMyClubListRespDto> success(List<Game> games) {
        GetMyClubListRespDto getMyClubListRespDto = new GetMyClubListRespDto(games);
        return ResponseEntity.status(HttpStatus.OK).body(getMyClubListRespDto);
    }
}
