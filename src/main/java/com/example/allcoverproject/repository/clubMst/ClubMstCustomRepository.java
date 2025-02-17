package com.example.allcoverproject.repository.ClubMst;

import com.example.allcoverproject.entity.ClubMst;
import com.querydsl.core.Tuple;

import java.util.List;

public interface ClubMstCustomRepository {
    public List<Tuple> getClubList(int page, int count);
}
