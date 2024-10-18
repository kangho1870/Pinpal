package com.example.allcoverproject.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MemberReqDto {

    private Long memberId;
    private String name;
    private int gender;
    private String email;
    private String password;
}
