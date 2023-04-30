package com.mccss.demo.transformer;

import com.mccss.demo.dto.FileInfoDto;
import com.mccss.demo.dto.UserDto;
import com.mccss.demo.model.DiplomaFile;
import com.mccss.demo.model.User;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class UserEntityToDtoTransformer {

    public UserDto entityToDto(User entity) {
        if (entity == null) {
            return null;
        }

        UserDto dto = new UserDto();
        dto.setId(entity.getId());
        dto.setFirstName(entity.getFirstName());
        dto.setLastName(entity.getLastName());
        dto.setEmail(entity.getEmail());
        dto.setPostalCode(entity.getPostalCode());

        avatarEntityToDto(entity, dto);

        diplomasEntityToDto(entity, dto);

        return dto;
    }

    private static void diplomasEntityToDto(User entity, UserDto dto) {
        if (entity.getDiplomas() != null && !entity.getDiplomas().isEmpty()) {
            List<FileInfoDto> diplomaFileInfos = new ArrayList<>();
            for (DiplomaFile diploma : entity.getDiplomas()) {
                FileInfoDto diplomaFileInfo = new FileInfoDto();

                diplomaFileInfo.setId(diploma.getId());
                diplomaFileInfo.setFileName(diploma.getFileName());
                diplomaFileInfo.setContentType(diploma.getContentType());
                diplomaFileInfo.setFileSize(diploma.getFileSize());

                diplomaFileInfos.add(diplomaFileInfo);
            }
            dto.setDiplomaFiles(diplomaFileInfos);
        }
    }

    private static void avatarEntityToDto(User entity, UserDto dto) {
        if (entity.getAvatar() != null) {
            FileInfoDto avatarFileInfo = new FileInfoDto();
            avatarFileInfo.setId(entity.getAvatar().getUserId());
            avatarFileInfo.setFileName(entity.getAvatar().getFileName());
            avatarFileInfo.setContentType(entity.getAvatar().getContentType());
            avatarFileInfo.setFileSize(entity.getAvatar().getFileSize());

            dto.setAvatarFile(avatarFileInfo);
        }
    }
}
