package com.example.allcoverproject.handler;

import com.example.allcoverproject.common.object.*;
import com.example.allcoverproject.dto.response.ResponseMessage;
import com.example.allcoverproject.entity.Scoreboard;
import com.example.allcoverproject.repository.scoreboard.ScoreboardRepository;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.hibernate5.Hibernate5Module;
import lombok.RequiredArgsConstructor;
import org.springframework.http.converter.json.Jackson2ObjectMapperBuilder;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@Component
@RequiredArgsConstructor
public class WebSocketHandler extends TextWebSocketHandler {

    private static final ConcurrentHashMap<String, Set<WebSocketSession>> CLIENTS = new ConcurrentHashMap<String, Set<WebSocketSession>>();
    private final ScoreboardRepository scoreboardRepository;

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        String scoreboardId = (String) session.getAttributes().get("scoreboardId");
        CLIENTS.computeIfAbsent(scoreboardId, key -> ConcurrentHashMap.newKeySet()).add(session);
        String scoreboardData = loadScoreboardData(session);

        session.sendMessage(new TextMessage(scoreboardData));
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        String scoreboardId = (String) session.getAttributes().get("scoreboardId");

        // `scoreboardId`에 해당하는 세션 집합에서 세션 제거
        Set<WebSocketSession> sessions = CLIENTS.get(scoreboardId);
        if (sessions != null) {
            sessions.remove(session);
            if (sessions.isEmpty()) {
                CLIENTS.remove(scoreboardId);
            }
        }
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        String payload = message.getPayload();

        ObjectMapper mapper = new ObjectMapper();
        Map<String, Object> receivedData = mapper.readValue(payload, Map.class);

        String action = (String) receivedData.get("action");
        if (action.equals("updateScore")) {
            ScoreboardUpdate scoreboard = mapper.convertValue(receivedData, ScoreboardUpdate.class);
            ScoreUpdateDto score = scoreboard.getScore();

            Optional<Scoreboard> memberOpt = scoreboardRepository.findByGameIdAndMemberId(score.getGameId(), score.getMemberId());
            Scoreboard member = memberOpt.orElse(null);
            if (member == null) return;
            member.setGame_1(score.getGame1Score());
            member.setGame_2(score.getGame2Score());
            member.setGame_3(score.getGame3Score());
            member.setGame_4(score.getGame4Score());
            scoreboardRepository.save(member);
        }else if (action.equals("updateGrade")) {
            GradeUpdateRequestDto requestDTO = mapper.readValue(payload, GradeUpdateRequestDto.class);
            List<MemberGradeUpdateDto> members = requestDTO.getMembers();

            for (MemberGradeUpdateDto member : members) {
                Long memberId = member.getMemberId();
                Integer grade = member.getGrade();

                scoreboardRepository.findByGameIdAndMemberId(requestDTO.getGameId(), memberId).ifPresent(scoreboard -> {
                    scoreboard.setGrade(grade);
                    scoreboardRepository.save(scoreboard);
                });
            }
        }else if (action.equals("updateTeamNumber")) {
            TeamNumberUpdateRequestDto requestDto = mapper.readValue(payload, TeamNumberUpdateRequestDto.class);
            List<MemberTeamUpdateDto> members = requestDto.getMembers();

            for (MemberTeamUpdateDto member : members) {
                Long memberId = member.getMemberId();
                Integer teamNumber = member.getTeamNumber();

                scoreboardRepository.findByGameIdAndMemberId(requestDto.getGameId(), memberId).ifPresent(scoreboard -> {
                    scoreboard.setTeam_number(teamNumber);
                    scoreboardRepository.save(scoreboard);
                });
            }
        }else if (action.equals("updateSide")) {
            SideJoinRequestDto requestDto = mapper.readValue(payload, SideJoinRequestDto.class);

            scoreboardRepository.findByGameIdAndMemberId(requestDto.getGameId(), requestDto.getMemberId()).ifPresent(scoreboard -> {
                if(requestDto.getSideType().equals("grade1")) {
                    scoreboard.setSide_grade1(!scoreboard.getSide_grade1());
                }else if(requestDto.getSideType().equals("avg")) {
                    scoreboard.setSide_avg(!scoreboard.getSide_avg());
                }
                scoreboardRepository.save(scoreboard);
            });
        }else if (action.equals("updateConfirm")) {
            ConfirmCheckRequestDto requestDto = mapper.readValue(payload, ConfirmCheckRequestDto.class);

            scoreboardRepository.findByGameIdAndMemberId(requestDto.getGameId(), requestDto.getMemberId()).ifPresent(scoreboard -> {
                if(scoreboard.getGame().getConfirmedCode().equals(requestDto.getCode())) {
                    scoreboard.setConfirmedJoin(true);
                }
                scoreboardRepository.save(scoreboard);
            });
        }


        sendScoreboardData(session);
    }

    public void sendScoreboardData(WebSocketSession session) throws Exception {
        String scoreboardId = (String) session.getAttributes().get("scoreboardId");
        String scoreboardData = loadScoreboardData(session);

        CLIENTS.get(scoreboardId).forEach(s -> {
            try {
                s.sendMessage(new TextMessage(scoreboardData));
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        });
    }

    public String loadScoreboardData(WebSocketSession session) throws Exception {
        List<Map<String, Object>> data = new ArrayList<>();

        Long scoreboardId = Long.parseLong((String) session.getAttributes().get("scoreboardId"));

        List<Scoreboard> allMembers = scoreboardRepository.findAllMembers(scoreboardId);
        if (allMembers == null) return ResponseMessage.NO_FOUND_GAME;
        for (Scoreboard scoreboard : allMembers) {
            Map<String, Object> memberData = new HashMap<>();
            memberData.put("game1", scoreboard.getGame_1());
            memberData.put("game2", scoreboard.getGame_2());
            memberData.put("game3", scoreboard.getGame_3());
            memberData.put("game4", scoreboard.getGame_4());
            memberData.put("confirmedJoin", scoreboard.getConfirmedJoin());
            memberData.put("grade", scoreboard.getGrade());
            memberData.put("sideAvg", scoreboard.getSide_avg());
            memberData.put("sideGrade1", scoreboard.getSide_grade1());
            memberData.put("teamNumber", scoreboard.getTeam_number());
            memberData.put("memberId", scoreboard.getMember().getId());
            memberData.put("gameName", scoreboard.getGame().getName());
            memberData.put("memberName", scoreboard.getMember().getName());
            memberData.put("memberRole", scoreboard.getMember().getClubDtl().getRole());
            memberData.put("memberProfile", scoreboard.getMember().getProfile());
            memberData.put("memberAvg", scoreboard.getMember_avg());

            data.add(memberData);
        }
        ObjectMapper mapper = new ObjectMapper();
//        mapper.registerModule(new Hibernate5Module());
        String jsonData = mapper.writeValueAsString(data);
        return jsonData;
    }
}
