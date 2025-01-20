package com.example.allcoverproject.common.object;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SideJoinRequestDto {
    private String action;
    private Long gameId;
    private Long memberId;
    private String sideType;
}
