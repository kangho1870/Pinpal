package com.example.allcoverproject.repository.ClubMst;

import com.example.allcoverproject.entity.ClubMst;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ClubMstRepository extends JpaRepository<ClubMst, Long> {
    List<ClubMst> findAllById(Long id);
}
