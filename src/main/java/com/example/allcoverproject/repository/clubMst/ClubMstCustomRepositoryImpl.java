package com.example.allcoverproject.repository.ClubMst;

import com.example.allcoverproject.entity.ClubMst;
import com.example.allcoverproject.entity.QClubDtl;
import com.example.allcoverproject.entity.QClubMst;
import com.querydsl.core.Tuple;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ClubMstCustomRepositoryImpl implements ClubMstCustomRepository{

    private JPAQueryFactory queryFactory;

    @Autowired
    public ClubMstCustomRepositoryImpl(JPAQueryFactory queryFactory) {
        this.queryFactory = queryFactory;
    }

    @Override
    public List<Tuple> getClubList(int page, int count) {
        QClubMst qClubMst = QClubMst.clubMst;
        QClubDtl qClubDtl = QClubDtl.clubDtl;

        return queryFactory
                .select(qClubMst, qClubDtl.count())
                .from(qClubMst)
                .leftJoin(qClubDtl).on(qClubDtl.clubMst.id.eq(qClubMst.id))
                .offset((page - 1) * count)
                .limit(count)
                .fetch();
    }
}
