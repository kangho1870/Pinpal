package com.example.allcoverproject.dto.request.club;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AddClubReqDto {

    private Long memberId;
    private String place;
    private String clubName;
    private String clubDescription;
}
