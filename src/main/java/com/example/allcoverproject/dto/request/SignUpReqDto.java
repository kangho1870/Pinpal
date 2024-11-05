package com.example.allcoverproject.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

@Getter
@Setter
@NoArgsConstructor
public class SignUpReqDto {

    @NotBlank
    @Length(max = 5)
    private String memberName;
    @NotBlank
    @Length(max = 30)
    private String memberId;
    @NotBlank
    @Length(max = 8)
    private String memberBirth;
    @NotNull
    private int gender;
    private String snsId;
    @NotBlank
    private String joinPath;
    private String profileImageUrl;
}
