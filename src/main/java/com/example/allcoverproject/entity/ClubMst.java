package com.example.allcoverproject.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "club_mst")
@Getter
@Setter
public class ClubMst {

    @Id @GeneratedValue
    @Column(name = "club_id")
    private Long id;
    private String name;
    private String description;

    private LocalDateTime createDate;
    private LocalDateTime updateDate;

}
