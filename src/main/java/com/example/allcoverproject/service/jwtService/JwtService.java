package com.example.allcoverproject.service.jwtService;

public interface JwtService {
    String getJwt(String id);
    String validateJwt(String jwt);
}
