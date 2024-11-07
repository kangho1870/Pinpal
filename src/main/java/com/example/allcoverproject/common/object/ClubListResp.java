package com.example.allcoverproject.common.object;

import com.example.allcoverproject.entity.ClubDtl;
import com.example.allcoverproject.entity.ClubMst;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Getter
public class ClubListResp {

    private String clubName;
    private String clubDescription;
    private Long clubCount;

    private ClubListResp(ClubMst clubMst, Long clubCount) {
        this.clubName = clubMst == null ? null : clubMst.getName();
        this.clubDescription = clubMst == null ? null : clubMst.getDescription();
        this.clubCount = clubCount;
    }

    public static List<ClubListResp> getClubList(List<ClubMst> clubMstList, List<Long> count) {
        List<ClubListResp> clubListRespList = new ArrayList<ClubListResp>();
        for(int i = 0; i < clubMstList.size(); i++) {
            clubListRespList.add(new ClubListResp(clubMstList.get(i), count.get(i)));
        }
        return clubListRespList;
    }
}
