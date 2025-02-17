package com.example.allcoverproject.repository.ceremony;

import com.example.allcoverproject.common.object.CeremonyResp;
import com.example.allcoverproject.entity.Ceremony;

public interface CeremonyCustomRepository {
    public CeremonyResp findByGameId(Long gameId);
}
