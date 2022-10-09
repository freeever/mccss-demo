package com.mccss.demo.exception;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public class MccssValidationException extends MccssException {

    public MccssValidationException(String messageCode, Object[] arguments) {
        super(messageCode, arguments);
    }
}
