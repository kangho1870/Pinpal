package com.example.allcoverproject.repository.clubMst;

import com.example.allcoverproject.entity.ClubMst;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClubMstRepository extends JpaRepository<ClubMst, Long>, ClubMstCustomRepository {
    List<ClubMst> findAllById(Long id);
}
