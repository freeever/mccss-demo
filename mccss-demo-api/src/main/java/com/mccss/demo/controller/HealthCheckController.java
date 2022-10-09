package com.mccss.demo.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
@RequestMapping
public class HealthCheckController {

    @GetMapping("/welcome")
    public String hello() {
        return "Welcome to MCCSS!";
    }
}
