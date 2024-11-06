package com.example.allcoverproject.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "club_dtl")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ClubDtl {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "no")
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "club_id")
    private ClubMst clubMst;

    private Integer grade;
    private Integer avg;
    private String role;

    private LocalDateTime createDate;
    private LocalDateTime updateDate;

    public ClubDtl(Member member, ClubMst clubMst, String role) {
        this.member = member;
        this.clubMst = clubMst;
        this.role = role;
        this.createDate = LocalDateTime.now();
        this.updateDate = LocalDateTime.now();
    }
}
