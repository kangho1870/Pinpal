package com.example.allcoverproject.entity;

import com.example.allcoverproject.dto.request.club.AddClubReqDto;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "club_mst")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ClubMst {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "club_id")
    private Long id;
    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "member_id")
    private Member member;
    private String name;
    private String description;

    private LocalDateTime createDate;
    private LocalDateTime updateDate;

    public ClubMst(AddClubReqDto addClubReqDto, Member member) {
        this.name = addClubReqDto.getClubName();
        this.member = member;
        this.description = addClubReqDto.getClubDescription();
        this.createDate = LocalDateTime.now();
        this.updateDate = LocalDateTime.now();
    }
}
