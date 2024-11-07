ALTER TABLE ceremony
DROP
FOREIGN KEY FKno1ucrp7ynftyycxbca3rld9e;

ALTER TABLE club_dtl
    ADD create_date datetime NULL;

ALTER TABLE club_dtl
    ADD grade INT NULL;

ALTER TABLE club_dtl
    ADD update_date datetime NULL;

ALTER TABLE club_mst
    ADD create_date datetime NULL;

ALTER TABLE club_mst
    ADD member_id BIGINT NULL;

ALTER TABLE club_mst
    ADD update_date datetime NULL;

ALTER TABLE ceremony
    ADD high_score_girl BIGINT NULL;

ALTER TABLE ceremony
    ADD high_score_man BIGINT NULL;

ALTER TABLE scoreboard
    ADD member_profile VARCHAR(255) NULL;

ALTER TABLE game
    ADD status VARCHAR(255) NULL;

ALTER TABLE ceremony
    ADD CONSTRAINT uc_ceremony_club UNIQUE (club_id);

ALTER TABLE ceremony
    ADD CONSTRAINT uc_ceremony_game UNIQUE (game_id);

ALTER TABLE club_dtl
    ADD CONSTRAINT uc_club_dtl_club UNIQUE (club_id);

ALTER TABLE club_dtl
    ADD CONSTRAINT uc_club_dtl_member UNIQUE (member_id);

ALTER TABLE club_mst
    ADD CONSTRAINT uc_club_mst_member UNIQUE (member_id);

ALTER TABLE club_mst
    ADD CONSTRAINT FK_CLUB_MST_ON_MEMBER FOREIGN KEY (member_id) REFERENCES member (member_id);

DROP TABLE ceremony_seq;

DROP TABLE club_mst_seq;

DROP TABLE game_seq;

DROP TABLE member_seq;

DROP TABLE scoreboard_seq;

ALTER TABLE game
DROP
COLUMN join_count;

ALTER TABLE game
DROP
COLUMN start_time;

ALTER TABLE member
DROP
COLUMN member_email;

ALTER TABLE ceremony
DROP
COLUMN member_id;

ALTER TABLE ceremony
DROP
COLUMN team_1st;

ALTER TABLE ceremony
DROP
COLUMN avg_1st;

ALTER TABLE ceremony
DROP
COLUMN grade1_1st;

ALTER TABLE ceremony
DROP
COLUMN grade2_1st;

ALTER TABLE ceremony
DROP
COLUMN grade3_1st;

ALTER TABLE ceremony
DROP
COLUMN grade4_1st;

ALTER TABLE ceremony
DROP
COLUMN total_1st;

ALTER TABLE ceremony
    ADD avg_1st BIGINT NULL;

ALTER TABLE ceremony
    MODIFY ceremony_id BIGINT AUTO_INCREMENT;

ALTER TABLE club_mst
    MODIFY club_id BIGINT AUTO_INCREMENT;

ALTER TABLE scoreboard
    ALTER game_1 SET DEFAULT 0;

ALTER TABLE scoreboard
    ALTER game_2 SET DEFAULT 0;

ALTER TABLE scoreboard
    ALTER game_3 SET DEFAULT 0;

ALTER TABLE scoreboard
    ALTER game_4 SET DEFAULT 0;

ALTER TABLE game
    MODIFY game_id BIGINT AUTO_INCREMENT;

ALTER TABLE ceremony
    ADD grade1_1st BIGINT NULL;

ALTER TABLE ceremony
    ADD grade2_1st BIGINT NULL;

ALTER TABLE ceremony
    ADD grade3_1st BIGINT NULL;

ALTER TABLE ceremony
    ADD grade4_1st BIGINT NULL;

ALTER TABLE member
    MODIFY member_id BIGINT AUTO_INCREMENT;

ALTER TABLE club_dtl
    MODIFY no BIGINT AUTO_INCREMENT;

ALTER TABLE scoreboard
    MODIFY scoreboard_id BIGINT AUTO_INCREMENT;

ALTER TABLE ceremony
    ADD total_1st BIGINT NULL;