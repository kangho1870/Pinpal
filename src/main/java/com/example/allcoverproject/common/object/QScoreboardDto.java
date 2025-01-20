package com.example.allcoverproject.common.object;

import com.querydsl.core.types.ConstructorExpression;
import com.querydsl.core.types.Expression;
import com.querydsl.core.types.Path;

public class QScoreboardDto extends ConstructorExpression<ScoreboardDto> {

    private static final long serialVersionUID = 1L;

    public QScoreboardDto(Expression<Long> memberId,
                          Expression<String> memberName,
                          Expression<String> memberRole,
                          Expression<String> memberProfile,
                          Expression<Integer> grade,
                          Expression<Integer> game1,
                          Expression<Integer> game2,
                          Expression<Integer> game3,
                          Expression<Integer> game4,
                          Expression<String> gameName,
                          Expression<Boolean> confirmedJoin,
                          Expression<Boolean> sideAvg,
                          Expression<Boolean> sideGrade1,
                          Expression<Integer> teamNumber,
                          Expression<Integer> memberAvg) {
        super(ScoreboardDto.class, memberId, memberName, memberRole, memberProfile, grade, game1, game2, game3, game4, gameName, confirmedJoin, sideAvg, sideGrade1, teamNumber, memberAvg);
    }
}
