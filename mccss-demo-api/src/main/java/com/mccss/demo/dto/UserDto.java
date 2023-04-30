package com.mccss.demo.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.mccss.demo.util.WhiteSpaceRemovalDeserializer;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import java.io.Serializable;
import java.util.List;

@Data
public class UserDto implements Serializable {

    private static final long serialVersionUID = 5393175783232800266L;

    private Long id;

    @JsonDeserialize(using = WhiteSpaceRemovalDeserializer.class)
    private String firstName;
    @JsonDeserialize(using = WhiteSpaceRemovalDeserializer.class)
    private String lastName;

    @JsonDeserialize(using = WhiteSpaceRemovalDeserializer.class)
    @NotBlank(message = "{err.email.required}")
    @Pattern(regexp = "(^$)|(^[a-zA-Z0-9_!#$%&'*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$)", message="{err.email.invalid}")
    private String email;

    @JsonDeserialize(using = WhiteSpaceRemovalDeserializer.class)
    @NotBlank(message = "{err.postal.code.required}")
    @Pattern(regexp = "(^$)|(^(?i)[ABCEGHJ-NPRSTVXY][0-9][ABCEGHJ-NPRSTV-Z][ -]?[0-9][ABCEGHJ-NPRSTV-Z][0-9]$)", message="{err.postal.code.invalid}")
    private String postalCode;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private MultipartFile avatar;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private List<MultipartFile> diplomas;

    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private FileInfoDto avatarFile;

    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private List<FileInfoDto> diplomaFiles;
}
