package com.example.allcoverproject.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;


@Entity
@Table(name = "scoreboard")
@Getter
@Setter
@ToString
public class Scoreboard {

    @Id @GeneratedValue
    @Column(name = "scoreboard_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", unique = false)
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "game_id", unique = false)
    private Game game;

    @Column(nullable = true)
    private int game_1;
    @Column(nullable = true)
    private int game_2;
    @Column(nullable = true)
    private int game_3;
    @Column(nullable = true)
    private int game_4;

    public void setMember(Member member) {
        this.member = member;
        member.getScoreboards().add(this);
    }
}
