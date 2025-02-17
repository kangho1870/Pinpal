package com.example.allcoverproject.entity;

import com.example.allcoverproject.dto.request.club.AddClubReqDto;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

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

    @OneToMany(mappedBy = "clubMst")
    private List<ClubDtl> clubDtlList = new ArrayList<>();
    private String name;
    private String description;

    @OneToOne
    private BowlingCenter bowlingCenter;

    private LocalDateTime createDate;
    private LocalDateTime updateDate;

    public ClubMst(AddClubReqDto addClubReqDto) {
        this.name = addClubReqDto.getClubName();
        this.description = addClubReqDto.getClubDescription();
        this.createDate = LocalDateTime.now();
        this.updateDate = LocalDateTime.now();
    }
}
