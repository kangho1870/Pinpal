package com.example.allcoverproject.common.object;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ScoreboardDto {
    private Long memberId;
    private String memberName;
    private String memberRole;
    private String memberProfile;
    private Integer grade;
    private Integer game1;
    private Integer game2;
    private Integer game3;
    private Integer game4;
    private String gameName;
    private Boolean confirmedJoin;
    private Boolean sideAvg;
    private Boolean sideGrade1;
    private Integer teamNumber;
    private Integer memberAvg;


    public ScoreboardDto(Long memberId, String memberName, String memberRole, String memberProfile, Integer grade, Integer game1, Integer game2, Integer game3, Integer game4, String gameName, Boolean confirmedJoin, Boolean sideAvg, Boolean sideGrade1, Integer teamNumber, Integer memberAvg) {
        this.memberId = memberId;
        this.memberName = memberName;
        this.memberRole = memberRole;
        this.memberProfile = memberProfile;
        this.grade = grade;
        this.game1 = game1;
        this.game2 = game2;
        this.game3 = game3;
        this.game4 = game4;
        this.gameName = gameName;
        this.confirmedJoin = confirmedJoin;
        this.sideAvg = sideAvg;
        this.sideGrade1 = sideGrade1;
        this.teamNumber = teamNumber;
        this.memberAvg = memberAvg;
    }
}
