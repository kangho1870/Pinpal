package com.example.allcoverproject.repository.ceremony;

import com.example.allcoverproject.entity.Ceremony;
import com.example.allcoverproject.entity.Game;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CeremonyRepository extends JpaRepository<Ceremony, Long>, CeremonyCustomRepository {

}
