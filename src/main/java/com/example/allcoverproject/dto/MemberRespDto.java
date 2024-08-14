package com.example.allcoverproject.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class MemberRespDto {

    private Long memberId;
    private String memberName;
    private Integer memberAvg;
}
