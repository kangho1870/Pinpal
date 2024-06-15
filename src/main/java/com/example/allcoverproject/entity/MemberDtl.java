package com.example.allcoverproject.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "member_dtl")
@Getter
@Setter
public class MemberDtl {

    @Id
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    private String phone;
}
