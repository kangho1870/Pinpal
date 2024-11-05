package com.example.allcoverproject.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "club_dtl")
@Getter
@Setter
public class ClubDtl {

    @Id
    @Column(name = "no")
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "club_id")
    private ClubMst clubMst;

    private Integer avg;
    private String role;

    private LocalDateTime createDate;
    private LocalDateTime updateDate;
}
