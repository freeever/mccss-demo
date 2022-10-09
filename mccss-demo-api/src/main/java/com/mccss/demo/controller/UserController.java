package com.mccss.demo.controller;

import com.mccss.demo.dto.UserDto;
import com.mccss.demo.exception.MccssValidationException;
import com.mccss.demo.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.List;

@Slf4j
@CrossOrigin
@RequiredArgsConstructor
@RestController
@RequestMapping("/api")
public class UserController {

    private final UserService userService;

    /**
     * Create new user.
     * @param userDto Data of the new user
     * @return The created user
     */
    @PostMapping("/v1/users")
    public ResponseEntity<UserDto> create(@Valid @RequestBody UserDto userDto)
        throws MccssValidationException {
        log.info("Create new user [{}, {}]", userDto.getLastName(), userDto.getFirstName());
        UserDto user = this.userService.create(userDto);
        return ResponseEntity.ok().body(user);
    }

    /**
     * Find all users
     * @return List of all users
     */
    @GetMapping("/v1/users")
    public ResponseEntity<List<UserDto>> findAll() {
        log.info("Fina all users");
        List<UserDto> users = this.userService.findAll();
        return ResponseEntity.ok(users);
    }
}

