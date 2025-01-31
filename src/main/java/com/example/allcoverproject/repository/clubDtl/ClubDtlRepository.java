package com.example.allcoverproject.repository.clubDtl;

import com.example.allcoverproject.entity.ClubDtl;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClubDtlRepository extends JpaRepository<ClubDtl, Long>, ClubDtlCustomRepository {

    List<ClubDtl> findAllByClubMst_Id(Long clubId);
    ClubDtl findByMemberId(Long memberId);
    ClubDtl findByRoleEquals(String role);
}
