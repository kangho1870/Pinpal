package com.example.allcoverproject.repository.clubMst;

import com.querydsl.core.Tuple;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClubMstCustomRepository {
    public List<Tuple> getClubList(int page, int count);
}
