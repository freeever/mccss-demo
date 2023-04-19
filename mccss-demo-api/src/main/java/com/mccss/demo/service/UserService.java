package com.mccss.demo.service;

import com.mccss.demo.common.MessageCode;
import com.mccss.demo.dto.UserDto;
import com.mccss.demo.exception.MccssValidationException;
import com.mccss.demo.model.User;
import com.mccss.demo.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@RequiredArgsConstructor
@Service
public class UserService {

    private final String DIR_UPLOAD = "uploads";

    private final UserRepository userRepository;
    private final ModelMapper modelMapper;

    /**
     * Create new user.
     * @param userDto Data of the new user
     * @return The created user
     */
    public UserDto create(UserDto userDto) throws MccssValidationException, IOException {
        log.info("Create new user [{}, {}]", userDto.getLastName(), userDto.getFirstName());
        User user = this.userRepository.findByEmail(userDto.getEmail());
        if (user == null) {
            user = this.modelMapper.map(userDto, User.class);
            user = this.userRepository.save(user);

            saveAllFiles(userDto);

            return this.modelMapper.map(user, UserDto.class);
        }

        throw new MccssValidationException(MessageCode.ERR_EMAIL_DUPLICATE, new String[]{ userDto.getEmail() });
    }

    /**
     * Find all users
     * @return List of all users
     */
    public List<UserDto> findAll() {
        log.info("Fina all users");
        List<User> users = this.userRepository.findAll();

        return users.stream()
                .map(user -> modelMapper.map(user, UserDto.class))
                .collect(Collectors.toList());
    }

    private void saveAllFiles(UserDto userDto) throws IOException {
        if (userDto.getAvatar() != null) {
            saveFile(userDto.getAvatar(), userDto.getAvatar().getOriginalFilename(), DIR_UPLOAD + "\\avator");
        }
        if (userDto.getDegree() != null) {
            saveFile(userDto.getDegree(), userDto.getDegree().getOriginalFilename(), DIR_UPLOAD + "\\degree");
        }
        if (userDto.getDiploma() != null) {
            saveFile(userDto.getDiploma(), userDto.getDiploma().getOriginalFilename(), DIR_UPLOAD + "\\diploma");
        }
    }

    private void saveFile(MultipartFile file, String filename, String folder) throws IOException {
        Path path = Paths.get(folder);
        if (!Files.exists(path)) {
            Files.createDirectories(path);
        }
        Path filepath = path.resolve(filename);
        Files.copy(file.getInputStream(), filepath, StandardCopyOption.REPLACE_EXISTING);
    }
}
