package com.example.allcoverproject.entity;

import com.example.allcoverproject.dto.request.SignUpReqDto;
import com.example.allcoverproject.dto.response.member.MemberRespDto;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "member")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Member {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private Long id;
    private String name;
    private String email;
    private String password;

    @OneToMany(mappedBy = "member")
    @JsonIgnore
    private List<Scoreboard> scoreboards = new ArrayList<>();

    @OneToOne(mappedBy = "member", fetch = FetchType.LAZY)
    private ClubDtl clubDtl;

    private int gender;

    private String roles;

    @Column(name = "sns_id")
    private String snsId;

    private String joinPath;

    private String birth;

    private String status;

    private String profile;

    private LocalDateTime createDate;

    private LocalDateTime updateDate;


    public Member(SignUpReqDto signUpReqDto) {
        this.name = signUpReqDto.getMemberName();
        this.email = signUpReqDto.getMemberId();
        this.gender = signUpReqDto.getGender();
        this.birth = signUpReqDto.getMemberBirth();
        this.roles = "ROLE_USER";
        this.snsId = signUpReqDto.getSnsId();
        this.joinPath = signUpReqDto.getJoinPath();
        this.createDate = LocalDateTime.now();
        this.updateDate = LocalDateTime.now();
        this.profile = signUpReqDto.getProfileImageUrl();
    }

    public MemberRespDto toMemberDto() {
        return MemberRespDto.builder()
                .memberId(id)
                .memberName(name)
                .build();
    }
}
