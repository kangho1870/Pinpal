package com.example.allcoverproject.common.object;


import com.example.allcoverproject.dto.response.CodeMessageRespDto;
import com.example.allcoverproject.dto.response.ResponseCode;
import com.example.allcoverproject.dto.response.ResponseMessage;
import lombok.Getter;
import lombok.Setter;


import java.time.LocalDateTime;

@Getter
@Setter
public class ClubDtlResp extends CodeMessageRespDto {

    private Long memberId;
    private String memberName;
    private String memberProfile;
    private String memberRole;
    private Integer memberAvg;
    private Integer memberGrade;
    private LocalDateTime createTime;

    public ClubDtlResp(Long memberId, String memberName, String memberProfile, String memberRole, Integer memberAvg, Integer memberGrade, LocalDateTime createTime) {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
        this.memberId = memberId;
        this.memberName = memberName;
        this.memberProfile = memberProfile;
        this.memberRole = memberRole;
        this.memberAvg = memberAvg;
        this.memberGrade = memberGrade;
        this.createTime = createTime;
    }

}
