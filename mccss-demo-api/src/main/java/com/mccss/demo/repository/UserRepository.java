package com.mccss.demo.repository;

import com.mccss.demo.model.AvatarFile;
import com.mccss.demo.model.DiplomaFile;
import com.mccss.demo.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.sql.Blob;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    long countByEmail(String email);

    @Query("SELECT a FROM User u JOIN u.avatar a WHERE u.id = :userId")
    AvatarFile findAvatarFileByUserId(@Param("userId") Long userId);

    @Query("SELECT d FROM User u JOIN u.diplomas d WHERE u.id = :userId AND d.id = :diplomaId")
    DiplomaFile findDiplomaFileByUserIdAndDiplomaId(@Param("userId") Long userId, @Param("diplomaId") Long diplomaId);

}
