package com.example.allcoverproject.common.object;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class GradeUpdateRequestDto {
    private String action;
    private Long gameId;
    private List<MemberGradeUpdateDto> members;
}
