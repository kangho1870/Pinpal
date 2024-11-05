package com.example.allcoverproject.dto.request.game;

import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
public class AddGameReqDto {
    private String gameName;
    private LocalDate date;
    private LocalTime time;
    private int gameType;
    private String confirmCode;
    private Long clubId;
}
