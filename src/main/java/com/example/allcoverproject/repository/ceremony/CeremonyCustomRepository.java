package com.example.allcoverproject.repository.ceremony;

import com.example.allcoverproject.entity.Ceremony;

public interface CeremonyCustomRepository {
    public Ceremony findByGameId(Long gameId);
}
