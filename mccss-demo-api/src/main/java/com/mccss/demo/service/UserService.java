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

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@RequiredArgsConstructor
@Service
public class UserService {

    private final UserRepository userRepository;
    private final ModelMapper modelMapper;

    /**
     * Create new user.
     * @param userDto Data of the new user
     * @return The created user
     */
    public UserDto create(UserDto userDto) throws MccssValidationException {
        log.info("Create new user [{}, {}]", userDto.getLastName(), userDto.getFirstName());
        User user = this.userRepository.findByEmail(userDto.getEmail());
        if (user == null) {
            user = this.modelMapper.map(userDto, User.class);
            user = this.userRepository.save(user);
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
}
