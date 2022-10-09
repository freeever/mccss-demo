package com.mccss.demo.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@AllArgsConstructor
public class ErrorInfo implements Serializable {

    private static final long serialVersionUID = -8761656852402150451L;

    private int httpStatusCode;
    private String message;
}
