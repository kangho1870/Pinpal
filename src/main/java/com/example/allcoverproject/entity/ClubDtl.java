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

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "club_id")
    private ClubMst clubMst;

    private Integer grade;
    private Integer avg;
    private String role;

    private LocalDateTime createDate;
    private LocalDateTime updateDate;

    public ClubDtl(Member member, ClubMst clubMst, String role) {
        setMember(member);
        this.clubMst = clubMst;
        this.role = role;
        this.grade = 0;
        this.avg = 0;
        this.createDate = LocalDateTime.now();
        this.updateDate = LocalDateTime.now();
    }

    public void setMember(Member member) {
        if (this.member != null) {
            System.out.println("null이 아니야");
            this.member.setClubDtl(null);
        }
        System.out.println("null 이야");
        this.member = member;
        System.out.println("member.getName() = " + member.getName());
        member.setClubDtl(this);
        System.out.println("member.getClubDtl().getRole() = " + member.getClubDtl().getRole());
    }

}
