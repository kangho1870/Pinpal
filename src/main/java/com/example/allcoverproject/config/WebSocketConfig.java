package com.example.allcoverproject.config;

import com.example.allcoverproject.common.object.ScoreboardInterceptor;
import com.example.allcoverproject.handler.WebSocketHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@Configuration
@EnableWebSocket
@RequiredArgsConstructor
public class WebSocketConfig implements WebSocketConfigurer {

    private final WebSocketHandler webSocketHandler;
    private final ScoreboardInterceptor scoreboardInterceptor;

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(webSocketHandler, "/scoreboard/{scoreboardId}")
                .setAllowedOrigins("*")
                .addInterceptors(scoreboardInterceptor);
    }
}
