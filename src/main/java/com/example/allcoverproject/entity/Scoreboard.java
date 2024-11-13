package com.example.allcoverproject.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.Where;

import java.time.LocalDateTime;


@Entity
@Table(name = "scoreboard")
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class Scoreboard {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "scoreboard_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", unique = false)
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "game_id", unique = false)
    private Game game;

    @Column
    private Integer member_avg;

    @Column
    private Integer grade;

    @Column(nullable = true)
    @ColumnDefault("0")
    private Integer game_1;

    @Column(nullable = true)
    @ColumnDefault("0")
    private Integer game_2;

    @Column(nullable = true)
    @ColumnDefault("0")
    private Integer game_3;

    @Column(nullable = true)
    @ColumnDefault("0")
    private Integer game_4;

    @ColumnDefault("false")
    private Boolean side_grade1;

    @ColumnDefault("false")
    private Boolean side_avg;

    @ColumnDefault("false")
    private Boolean confirmedJoin;

    @Column
    private Integer team_number;

    private String member_profile;

    private int all_cover;

    private String status;

    private LocalDateTime createDate;

    private LocalDateTime updateDate;

    public Scoreboard(Member member, Game game, ClubDtl clubDtl) {
        this.setMember_avg(clubDtl.getAvg());
        this.setGame(game);
        this.setMember(member);
        this.setGrade(0);
        this.setGame_1(null);
        this.setGame_2(null);
        this.setGame_3(null);
        this.setGame_4(null);
        this.setAll_cover(0);
        this.setTeam_number(0);
        this.setSide_avg(false);
        this.setSide_grade1(false);
        this.setConfirmedJoin(false);
        this.member_profile = member.getProfile();
        this.status = "ACTIVE";
        this.setCreateDate(LocalDateTime.now());
        this.setUpdateDate(LocalDateTime.now());
    }

    public void setMember(Member member) {
        this.member = member;
        member.getScoreboards().add(this);
    }

}
