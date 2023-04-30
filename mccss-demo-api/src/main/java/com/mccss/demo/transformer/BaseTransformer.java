package com.mccss.demo.transformer;

import org.hibernate.Session;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.EntityManager;
import java.io.IOException;
import java.sql.Blob;

@Component
public class BaseTransformer {

    private final EntityManager entityManager;

    public BaseTransformer(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    protected Blob createBlob(MultipartFile file) throws IOException {
        return entityManager.unwrap(Session.class).getLobHelper().createBlob(file.getInputStream(), file.getSize());
    }
}
