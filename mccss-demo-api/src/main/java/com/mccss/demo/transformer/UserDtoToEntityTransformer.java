package com.mccss.demo.transformer;

import com.mccss.demo.dto.UserDto;
import com.mccss.demo.model.AvatarFile;
import com.mccss.demo.model.DiplomaFile;
import com.mccss.demo.model.User;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.EntityManager;
import java.io.IOException;
import java.util.HashSet;
import java.util.Set;

@Component
public class UserDtoToEntityTransformer extends BaseTransformer {

    public UserDtoToEntityTransformer(EntityManager entityManager) {
        super(entityManager);
    }

    public User dtoToEntity(UserDto dto) throws IOException {
        if (dto == null) {
            return null;
        }

        User entity = new User();
        entity.setId(dto.getId());
        entity.setFirstName(dto.getFirstName());
        entity.setLastName(dto.getLastName());
        entity.setEmail(dto.getEmail());
        entity.setPostalCode(dto.getPostalCode());

        avatarDtoToEntity(dto, entity);

        diplomasDtoToEntity(dto, entity);

        return entity;
    }

    private void diplomasDtoToEntity(UserDto dto, User entity) throws IOException {
        if (dto.getDiplomas() != null && !dto.getDiplomas().isEmpty()) {
            Set<DiplomaFile> diplomas = new HashSet<>();
            for (MultipartFile diploma : dto.getDiplomas()) {
                DiplomaFile diplomaFile = new DiplomaFile();
                diplomaFile.setUser(entity);
                diplomaFile.setFileName(diploma.getOriginalFilename());
                diplomaFile.setContentType(diploma.getContentType());
                diplomaFile.setFileSize(diploma.getSize());

                diplomaFile.setFile(createBlob(diploma));

                diplomaFile.setUser(entity);

                diplomas.add(diplomaFile);
            }
            entity.setDiplomas(diplomas);
        }
    }

    private void avatarDtoToEntity(UserDto dto, User entity) throws IOException {
        if (dto.getAvatar() != null) {
            AvatarFile avatarFile = new AvatarFile();
            avatarFile.setFileName(dto.getAvatar().getOriginalFilename());
            avatarFile.setContentType(dto.getAvatar().getContentType());
            avatarFile.setFile(createBlob(dto.getAvatar()));
            avatarFile.setFileSize(dto.getAvatar().getSize());
            avatarFile.setUser(entity);
//            avatar.setUserId(entity.getId());  // Since AvatarFile OneToOne is with annotation "MapsId" together, manually setId is not needed.

            entity.setAvatar(avatarFile);
        }
    }
}
