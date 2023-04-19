package com.mccss.demo.dto;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.mccss.demo.util.WhiteSpaceRemovalDeserializer;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import java.io.Serializable;

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

    private MultipartFile avatar;

    @JsonDeserialize(using = WhiteSpaceRemovalDeserializer.class)
    @NotBlank(message = "{err.postal.code.required}")
    @Pattern(regexp = "(^$)|(^(?i)[ABCEGHJ-NPRSTVXY][0-9][ABCEGHJ-NPRSTV-Z][ -]?[0-9][ABCEGHJ-NPRSTV-Z][0-9]$)", message="{err.postal.code.invalid}")
    private String postalCode;

    @NotBlank
    private String graduateFrom;

    @NotNull(message = "{err.diploma.required}")
    private MultipartFile degree;
    private MultipartFile diploma;

}
