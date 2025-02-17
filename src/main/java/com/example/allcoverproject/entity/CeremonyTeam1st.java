package com.example.allcoverproject.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "ceremony_team_1st")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CeremonyTeam1st {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "ceremony_id")
    private Long ceremonyId;

    @Column(name = "team_1st_id")
    private Long team1stId;

}
