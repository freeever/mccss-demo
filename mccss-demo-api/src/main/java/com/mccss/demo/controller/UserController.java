package com.mccss.demo.controller;

import com.mccss.demo.dto.UserDto;
import com.mccss.demo.exception.MccssValidationException;
import com.mccss.demo.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
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
    public ResponseEntity<UserDto> create(@Valid @ModelAttribute UserDto userDto)
            throws MccssValidationException, IOException {
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

    @GetMapping("/v1/cookie/add/{key}/{value}")
    public ResponseEntity<List<String>> addCookie(HttpServletResponse response,
                                                  @PathVariable String key, @PathVariable String value) {
        List<String> cookies = new ArrayList<>();
        Cookie newCookie = new Cookie(key, value);
        newCookie.setMaxAge(600);
        response.addCookie(newCookie);

        return ResponseEntity.ok(cookies);
    }

    @GetMapping("/v1/cookie")
    public ResponseEntity<List<String>> getAllCookies(HttpServletRequest request) {
        List<String> cookies = new ArrayList<>();
        Arrays.stream(request.getCookies())
                .forEach(cookie -> {
                    cookies.add(cookie.getName() + "==" + cookie.getValue());
                });

        return ResponseEntity.ok(cookies);
    }

    @GetMapping("/v1/cookie/delete/{key}")
    public ResponseEntity<List<String>> deleteCookie(HttpServletResponse response, @PathVariable String key) {
        List<String> cookies = new ArrayList<>();
        Cookie newCookie = new Cookie(key, null);
        newCookie.setMaxAge(0);
        response.addCookie(newCookie);

        return ResponseEntity.ok(cookies);
    }
}

