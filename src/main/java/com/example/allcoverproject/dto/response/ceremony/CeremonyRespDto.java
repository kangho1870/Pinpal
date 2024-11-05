package com.example.allcoverproject.dto.response.ceremony;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CeremonyRespDto {

    private Long gameId;
    private String total1st;
    private String grade1_1st;
    private String grade2_1st;
    private String grade3_1st;
    private String grade4_1st;
    private String avg1st;
    private String team1st;
}
