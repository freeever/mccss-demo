package com.mccss.demo.model;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.MappedSuperclass;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import java.time.LocalDateTime;

@Getter
@Setter
@MappedSuperclass
public class AuditableEntity {

    @Column(name = "created_on")
    private LocalDateTime createdOn;

    @Column(name = "updated_on")
    private LocalDateTime updatedOn;

    @PrePersist
    public void prePersist() {
        this.setCreatedOn(LocalDateTime.now());
    }

    @PreUpdate
    public void preUpdate() {
        this.setUpdatedOn(LocalDateTime.now());
    }
}
