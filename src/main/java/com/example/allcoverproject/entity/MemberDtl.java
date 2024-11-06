package com.example.allcoverproject.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "member_dtl")
@Getter
@Setter
public class MemberDtl {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "member_id")
    private Member member;

    private String phone;
}
