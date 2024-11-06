package com.example.allcoverproject.repository.clubDtl;

import com.example.allcoverproject.entity.ClubDtl;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClubDtlRepository extends JpaRepository<ClubDtl, Long>, ClubDtlCustomRepository {

    List<ClubDtl> findAllByClubMst(Long clubId);
    ClubDtl findByMemberId(Long memberId);
}
