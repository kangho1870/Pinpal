package com.example.allcoverproject.entity;

import com.example.allcoverproject.type.GameType;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "game")
@Getter
@Setter
public class Game {

    @Id @GeneratedValue
    @Column(name = "game_id")
    private Long id;
    private String name;
    @Enumerated(EnumType.STRING)
    private GameType type;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "club_id")
    private ClubMst clubMst;
}
