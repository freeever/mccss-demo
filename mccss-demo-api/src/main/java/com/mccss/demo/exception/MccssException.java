package com.mccss.demo.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MccssException extends Exception {

    private String messageCode;
    private Object[] arguments;

    public MccssException() {
        super();
    }

    public MccssException(String messageCode, Object[] arguments) {
        this.messageCode = messageCode;
        this.arguments = arguments;
    }
}
