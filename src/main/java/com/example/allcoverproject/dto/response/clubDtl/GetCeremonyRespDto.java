package com.example.allcoverproject.dto.response.clubDtl;

import com.example.allcoverproject.common.object.CeremonyResp;
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

    public GetCeremonyRespDto(List<Ceremony> ceremony, List<List<Scoreboard>> scoreboards, List<Game> games, MemberRepository memberRepository) {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
        this.ceremonys = CeremonyResp.getCeremonyList(ceremony, scoreboards, games, memberRepository);
    }

    public static ResponseEntity<GetCeremonyRespDto> success(List<Ceremony> ceremony, List<List<Scoreboard>> scoreboards, List<Game> games, MemberRepository memberRepository) {
        GetCeremonyRespDto respDto = new GetCeremonyRespDto(ceremony, scoreboards, games, memberRepository);
        return ResponseEntity.status(HttpStatus.OK).body(respDto);
    }
}
