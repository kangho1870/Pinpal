package com.example.allcoverproject.entity;

import com.example.allcoverproject.dto.MemberReqDto;
import com.example.allcoverproject.dto.MemberRespDto;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

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

    @Id @GeneratedValue()
    @Column(name = "member_id")
    private Long id;
    private String name;
    private String email;
    private String password;

    @OneToMany(mappedBy = "member")
    @JsonIgnore
    List<Scoreboard> scoreboards = new ArrayList<>();

    @OneToOne(mappedBy = "member", fetch = FetchType.LAZY)
    @JsonIgnore
    private ClubDtl clubDtl;

    private int gender;

    private String roles;


    public Member(MemberReqDto memberReqDto) {
        this.name = memberReqDto.getName();
        this.email = memberReqDto.getEmail();
        this.password = memberReqDto.getPassword();
        this.gender = memberReqDto.getGender();
        this.roles = "ROLE_USER";
    }

    public MemberRespDto toMemberDto() {
        return MemberRespDto.builder()
                .memberId(id)
                .memberName(name)
                .build();
    }
}
