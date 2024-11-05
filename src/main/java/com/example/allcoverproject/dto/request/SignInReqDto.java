package com.example.allcoverproject.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class SignInReqDto {

    @NotBlank
    private String email;
    @NotBlank
    private String password;
}
