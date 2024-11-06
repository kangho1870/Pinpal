package com.example.allcoverproject.service.member;

import com.example.allcoverproject.dto.response.CodeMessageRespDto;
import com.example.allcoverproject.dto.response.member.GetSignInRespDto;
import com.example.allcoverproject.entity.ClubDtl;
import com.example.allcoverproject.entity.Member;
import com.example.allcoverproject.repository.clubDtl.ClubDtlRepository;
import com.example.allcoverproject.repository.member.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService{

    private final MemberRepository memberRepository;
    private final ClubDtlRepository clubDtlRepository;

    @Override
    public ResponseEntity<? super GetSignInRespDto> getSignIn(String memberId) {
        Member member = null;
        ClubDtl clubDtl = null;
        try {

            Member memberByEmail = memberRepository.findMemberByEmail(memberId);
            if(memberByEmail == null) return CodeMessageRespDto.noExistMemberId();
            member = memberByEmail;
            clubDtl = clubDtlRepository.findByMemberId(member.getId());
            System.out.println("member.getClubDtl() = " + clubDtl);

        } catch (Exception e) {
            e.printStackTrace();
            return CodeMessageRespDto.databaseError();
        }
        return GetSignInRespDto.success(member, clubDtl);
    }
}
