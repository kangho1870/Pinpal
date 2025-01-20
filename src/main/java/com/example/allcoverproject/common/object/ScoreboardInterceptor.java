package com.example.allcoverproject.common.object;

import com.example.allcoverproject.provider.JwtProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.HandshakeInterceptor;

import java.util.List;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class ScoreboardInterceptor implements HandshakeInterceptor {
    private final JwtProvider jwtProvider;
    @Override
    public boolean beforeHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler, Map<String, Object> attributes) throws Exception {

        String path = request.getURI().getPath();
        String scoreboardId = path.substring(path.lastIndexOf("/") + 1);
        attributes.put("scoreboardId", scoreboardId);
        return true;
    }

    @Override
    public void afterHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler, Exception exception) {
//        List<String> authHeaders = request.getHeaders().get("Authorization");
//        if (authHeaders == null || authHeaders.get(0).startsWith("Bearer ") || jwtProvider.validate(authHeaders.get(0)) == null) {
//            throw new SecurityException("Unauthorized WebSocket connection");
//        }
    }
}
