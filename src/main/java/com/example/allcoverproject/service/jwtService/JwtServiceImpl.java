package com.example.allcoverproject.service.jwtService;

import com.example.allcoverproject.provider.JwtProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class JwtServiceImpl implements JwtService {

    private final JwtProvider jwtProvider;

    @Override
    public String getJwt(String id) {
        String jwt = jwtProvider.create(id);

        return jwt;
    }

    @Override
    public String validateJwt(String jwt) {
        String subject = jwtProvider.validate(jwt);

        return subject;
    }
}
