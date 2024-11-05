package com.example.allcoverproject.common.object;


import com.example.allcoverproject.dto.response.ResponseCode;
import com.example.allcoverproject.dto.response.ResponseMessage;
import com.example.allcoverproject.entity.ClubDtl;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


import java.util.ArrayList;
import java.util.List;

@Getter
public class ClubDtlResp {

    private Long memberId;
    private String memberName;
    private String memberProfile;
    private String memberRole;
    private Integer memberAvg;

    private ClubDtlResp(ClubDtl clubDtl) {
        this.memberId = clubDtl.getMember().getId();
        this.memberName = clubDtl.getMember().getName();
        this.memberProfile = clubDtl.getMember().getProfile();
        this.memberRole = clubDtl.getRole();
        this.memberAvg = clubDtl.getAvg();
    }

    public static List<ClubDtlResp> getClubDtlList(List<ClubDtl> clubDtlList) {
        List<ClubDtlResp> clubDtlRespList = new ArrayList<>();
        for (ClubDtl clubDtl : clubDtlList) {
            clubDtlRespList.add(new ClubDtlResp(clubDtl));
        }
        return clubDtlRespList;
    }
}
