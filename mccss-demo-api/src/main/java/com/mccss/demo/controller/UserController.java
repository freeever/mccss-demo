package com.mccss.demo.controller;

import com.mccss.demo.dto.FileInfoDto;
import com.mccss.demo.dto.UserDto;
import com.mccss.demo.exception.MccssValidationException;
import com.mccss.demo.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.io.IOException;
import java.sql.SQLException;
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

    @DeleteMapping("/v1/users/{id}")
    public ResponseEntity<Boolean> delete(@PathVariable() Long id) {
        log.info("Delete user [id={}]", id);
        this.userService.delete(id);
        return ResponseEntity.ok(true);
    }

    /**
     * Retrieve the avatar file.
     * @param id User Id
     * @return avatar file
     */
    @GetMapping("/v1/users/avatar/{id}")
    public ResponseEntity<byte[]> findAvatar(@PathVariable("id") Long id)
            throws SQLException {
        log.info("Getting avatar file...");

        FileInfoDto file = this.userService.findAvatar(id);

        return returnFile(file);
    }

    /**
     * Retrieve the diploma file.
     * @param id Registration form Id
     * @param diplomaId File Id
     * @return diploma file
     */
    @GetMapping("/v1/users/diploma/{id}/{diplomaId}")
    public ResponseEntity<byte[]> findDiploma(@PathVariable("id") Long id, @PathVariable("diplomaId") Long diplomaId)
            throws SQLException {
        log.info("Getting diploma file...");

        FileInfoDto file = this.userService.findDiploma(id, diplomaId);

        return returnFile(file);
    }

    private static ResponseEntity<byte[]> returnFile(FileInfoDto file) {
        if (file != null) {
            HttpHeaders headers = new HttpHeaders();
            headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + file.getFileName());

            return ResponseEntity.ok()
                    .headers(headers)
                    .contentLength(file.getFileSize())
                    .contentType(MediaType.parseMediaType(file.getContentType()))
                    .body(file.getFile());
        }

        return ResponseEntity.ok().body(null);
    }
}

