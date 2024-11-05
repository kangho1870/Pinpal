package com.example.allcoverproject.handler;

import com.example.allcoverproject.dto.response.CodeMessageRespDto;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class CustomExceptionHandler {

    //HttpMessageNotReadableException : Request Body가 없어서 읽지 못할때 발생
    // MethodArgumentNotValidException : 유효성 검사 실패

    @ExceptionHandler({HttpMessageNotReadableException.class, MethodArgumentNotValidException.class})
    public ResponseEntity<CodeMessageRespDto> validExceptionHandler(Exception e) {
        e.printStackTrace();
        return CodeMessageRespDto.validationFail();
    }
}
