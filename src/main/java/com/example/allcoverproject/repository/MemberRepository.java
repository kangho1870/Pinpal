package com.example.allcoverproject.repository;

import com.example.allcoverproject.entity.Member;
import com.example.allcoverproject.entity.QMember;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class MemberRepository {

    @Autowired
    private JPAQueryFactory queryFactory;

    public Member findMemberById(Long id) {
        QMember member = QMember.member;

        return queryFactory
                .selectFrom(member)
                .where(member.id.eq(id))
                .fetchOne();
    }
    public List<Member> findMembersById(List<Long> ids) {
        QMember member = QMember.member;

        return queryFactory
                .selectFrom(member)
                .where(member.id.in(ids))
                .fetch();
    }
}
