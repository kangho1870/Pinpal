package com.example.allcoverproject.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "bowling_center")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BowlingCenter {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "bowling_center_id")
    private int bowlingCenterId;

    private String name;

    private String address;

    private String description;
}
