package com.example.allcoverproject.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "member")
@Getter
@Setter
public class Member {

    @Id @GeneratedValue
    @Column(name = "member_id")
    private Long id;
    private String name;

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    List<Scoreboard> scoreboards = new ArrayList<>();

}
