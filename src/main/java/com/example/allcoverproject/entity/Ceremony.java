package com.example.allcoverproject.entity;

import jakarta.persistence.*;

import java.util.List;


@Entity
@Table(name = "ceremony")
public class Ceremony {

    @Id
    @Column(name = "ceremony_id")
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "game_id")
    private Game game;

    private String total_1st;
    private String grade1_1st;
    private String grade2_1st;
    private String grade3_1st;
    private String grade4_1st;
    private String avg_1st;
    private String team_1st;
}
