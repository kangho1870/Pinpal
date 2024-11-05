package com.example.allcoverproject.repository.member;

import com.example.allcoverproject.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;


public interface MemberRepository extends JpaRepository<Member, Long> {
    Member findMemberById(Long id);
    boolean existsByEmail(String email);
    Member findMemberByEmail(String email);
    Member findBySnsIdAndJoinPath(String snsId, String joinPath);
}
