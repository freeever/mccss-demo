package com.mccss.demo.service;

import com.mccss.demo.common.MessageCode;
import com.mccss.demo.dto.FileInfoDto;
import com.mccss.demo.dto.UserDto;
import com.mccss.demo.exception.MccssValidationException;
import com.mccss.demo.model.AvatarFile;
import com.mccss.demo.model.BaseFile;
import com.mccss.demo.model.DiplomaFile;
import com.mccss.demo.model.User;
import com.mccss.demo.repository.UserRepository;
import com.mccss.demo.transformer.UserDtoToEntityTransformer;
import com.mccss.demo.transformer.UserEntityToDtoTransformer;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
public class UserService {

    private final UserRepository userRepository;
    private final UserDtoToEntityTransformer dtoToEntityTransformer;

    private final UserEntityToDtoTransformer entityToDtoTransformer;

    public UserService(UserRepository userRepository,
                       UserDtoToEntityTransformer dtoToEntityTransformer,
                       UserEntityToDtoTransformer entityToDtoTransformer) {
        this.userRepository = userRepository;
        this.dtoToEntityTransformer = dtoToEntityTransformer;
        this.entityToDtoTransformer = entityToDtoTransformer;
    }

    /**
     * Create new user.
     * @param userDto Data of the new user
     * @return The created user
     */
    public UserDto create(UserDto userDto)
            throws MccssValidationException, IOException {
        log.info("Create new user [{}, {}]", userDto.getLastName(), userDto.getFirstName());
        long countByEmail = this.userRepository.countByEmail(userDto.getEmail());
        if (countByEmail == 0) {
            User user = this.dtoToEntityTransformer.dtoToEntity(userDto);
            user = this.userRepository.save(user);

            return this.entityToDtoTransformer.entityToDto(user);
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
                .map(this.entityToDtoTransformer::entityToDto)
                .collect(Collectors.toList());
    }

    public void delete(Long id) {
        log.info("Delete user [id={}]", id);

        this.userRepository.deleteById(id);
    }

    public FileInfoDto findAvatar(Long id) throws SQLException {
        AvatarFile avatarFile = this.userRepository.findAvatarFileByUserId(id);
        return buildFileInfo(avatarFile);
    }

    public FileInfoDto findDiploma(Long id, Long diplomaId) throws SQLException {
        DiplomaFile diplomaFile = this.userRepository.findDiplomaFileByUserIdAndDiplomaId(id, diplomaId);
        return buildFileInfo(diplomaFile);
    }

    private FileInfoDto buildFileInfo(BaseFile file) throws SQLException {
        if (file != null) {
            FileInfoDto fileInfo = new FileInfoDto();
            fileInfo.setFileName(file.getFileName());
            fileInfo.setContentType(file.getContentType());
            fileInfo.setFileSize(file.getFileSize());
            fileInfo.setFile(file.getFile().getBytes(1, (int)(file.getFile().length())));

            return fileInfo;
        }

        return null;
    }
}
