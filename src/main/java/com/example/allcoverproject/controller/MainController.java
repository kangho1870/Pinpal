package com.example.allcoverproject.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MainController {

    @GetMapping("/auth")
    public String main() {
        return "Server on...";
        // 9/10 오후 1:24:55
    }
}
