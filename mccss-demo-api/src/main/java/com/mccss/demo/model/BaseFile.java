package com.mccss.demo.model;

import lombok.Data;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.FetchType;
import javax.persistence.Lob;
import javax.persistence.MappedSuperclass;
import java.sql.Blob;

@Data
@MappedSuperclass
public class BaseFile extends AuditableEntity {

    @Column(name = "file_name")
    private String fileName;

    @Column(name = "content_type")
    private String contentType;

    @Column(name = "file_size")
    private long fileSize;

    // Please note originally this uses byte[] which is also working fine.
    // Use @Lob and Blob for lazy load test. Don't want to change it back to byte[] though
    @Lob
    @Basic(fetch = FetchType.LAZY)
    @Column(name = "file")
    private Blob file;
}
