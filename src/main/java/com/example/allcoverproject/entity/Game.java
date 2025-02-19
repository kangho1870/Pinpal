package com.example.allcoverproject.entity;

import com.example.allcoverproject.dto.request.game.AddGameReqDto;
import com.example.allcoverproject.type.GameType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import java.sql.Time;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Entity
@Table(name = "game")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@SQLDelete(sql = "update game set deleted = 1 where game_id = ?")
@Where(clause = "deleted = 0")
public class Game {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "game_id")
    private Long id;
    private String name;
    @Enumerated(EnumType.STRING)
    private GameType type;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "club_id")
    private ClubMst clubMst;

    @ManyToOne(fetch = FetchType.LAZY)
    private BowlingCenter bowlingCenter;

    private String confirmedCode;

    private Boolean scoreCounting;

    private LocalDate date;

    private LocalTime time;

    private String status;

    private int deleted;

    private LocalDateTime createDate;

    private LocalDateTime updateDate;

    public Game(AddGameReqDto addGameReqDto) {
        this.name = addGameReqDto.getGameName();
        this.type = addGameReqDto.getGameType() == 0 ? GameType.정기번개
                : addGameReqDto.getGameType() == 1 ? GameType.정기모임 : null;
        this.confirmedCode = addGameReqDto.getConfirmCode();
        this.scoreCounting = true;
        this.date = addGameReqDto.getDate();
        this.time = addGameReqDto.getTime();
        this.status = "NOT_END";
        this.createDate = LocalDateTime.now();
        this.updateDate = LocalDateTime.now();
    }
}
