package com.example.allcoverproject.controller;

import com.example.allcoverproject.service.jwtService.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class JwtController {

    private final JwtService jwtService;

    @GetMapping("/jwt/{id}")
    public String getJwt(@PathVariable String id) {
        System.out.println("name = " + id);
        String jwt = jwtService.getJwt(id);

        return jwt;
    }

    @PostMapping("/jwt")
    public String validateJwt(@RequestBody String jwt) {
        String response = jwtService.validateJwt(jwt);
        return response;
    }
}
