package com.example.allcoverproject.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class ScoreboardRepository {

    @Autowired
    private JPAQueryFactory queryFactory;


}
