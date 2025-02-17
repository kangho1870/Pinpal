package com.example.allcoverproject.dto.response.clubDtl;

import com.example.allcoverproject.common.object.CeremonyResp;
import com.example.allcoverproject.common.object.ScoreboardResp;
import com.example.allcoverproject.dto.response.CodeMessageRespDto;
import com.example.allcoverproject.dto.response.ResponseCode;
import com.example.allcoverproject.dto.response.ResponseMessage;
import com.example.allcoverproject.entity.Ceremony;
import com.example.allcoverproject.entity.Game;
import com.example.allcoverproject.entity.Scoreboard;
import com.example.allcoverproject.repository.member.MemberRepository;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;

@Getter
public class GetCeremonyRespDto extends CodeMessageRespDto {
    private List<CeremonyResp> ceremonys;

    public GetCeremonyRespDto(List<CeremonyResp> ceremony, List<List<ScoreboardResp>> scoreboards) {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
        this.ceremonys = CeremonyResp.getCeremonyList(ceremony, scoreboards);
    }

    public GetCeremonyRespDto(List<CeremonyResp> ceremony) {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
        this.ceremonys = CeremonyResp.getCeremonyList(ceremony);
    }

    public static ResponseEntity<GetCeremonyRespDto> success(List<CeremonyResp> ceremony, List<List<ScoreboardResp>> scoreboards) {
        GetCeremonyRespDto respDto = new GetCeremonyRespDto(ceremony, scoreboards);
        return ResponseEntity.status(HttpStatus.OK).body(respDto);
    }

    public static ResponseEntity<GetCeremonyRespDto> success(List<CeremonyResp> ceremony) {
        GetCeremonyRespDto respDto = new GetCeremonyRespDto(ceremony);
        return ResponseEntity.status(HttpStatus.OK).body(respDto);
    }
}
