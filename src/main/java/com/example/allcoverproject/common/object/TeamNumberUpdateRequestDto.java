package com.example.allcoverproject.common.object;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class TeamNumberUpdateRequestDto {
    private String action; // 액션 타입 (예: "updateGrade")
    private Long gameId; // 게임 ID
    private List<MemberTeamUpdateDto> members;
}
