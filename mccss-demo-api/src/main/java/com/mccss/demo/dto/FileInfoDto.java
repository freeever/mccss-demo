package com.mccss.demo.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FileInfoDto {

    private Long id;

    private String fileName;

    private String contentType;

    @JsonIgnore
    private long fileSize;

    @JsonIgnore
    private byte[] file;
}
