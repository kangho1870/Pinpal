package com.example.allcoverproject.entity;

import com.example.allcoverproject.repository.member.MemberRepository;
import com.example.allcoverproject.repository.scoreboard.ScoreboardRepository;
import com.example.allcoverproject.type.GameType;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Commit;

import java.util.Optional;

@SpringBootTest
@Transactional
@Commit
class EntityTest {

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private ScoreboardRepository scoreboardRepository;

    @Autowired
    private EntityManager em;

    @BeforeEach
    void setUp() {
        Game game = new Game();
        game.setType(GameType.정기모임);
        game.setName("제 1회 정모");

        Member member = new Member();
        Member member2 = new Member();

        member.setName("test");
        member2.setName("test2");

        em.persist(game);

        em.persist(member);
        em.persist(member2);

        Scoreboard scoreboard = new Scoreboard();
        scoreboard.setGame(game);
        scoreboard.setMember(member);

        Scoreboard scoreboard2 = new Scoreboard();
        scoreboard2.setGame(game);
        scoreboard2.setMember(member2);

        em.persist(scoreboard);
        em.persist(scoreboard2);

        em.flush();
        em.clear();
    }

    @Test
    public void findMember() {
        Member member = new Member();
        member.setName("강호");
        memberRepository.save(member);
        Optional<Member> optionalMember = memberRepository.findById(member.getId());
        Member member1 = optionalMember.orElse(null);

//        Optional<Scoreboard> foundScoreboard = scoreboardRepository.findById(1L);
//        foundScoreboard.orElse(null).setMember(member1);
//        Scoreboard scoreboard = scoreboardRepository.saveAndFlush(foundScoreboard.get());
//        System.out.println("foundScoreboard = " + scoreboard);
    }
}
