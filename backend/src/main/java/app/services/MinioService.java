package app.services;

import io.minio.*;
import io.minio.http.Method;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.ErrorResponseException;
import org.springframework.web.multipart.MultipartFile;

import java.util.Objects;
import java.util.UUID;

import static com.google.common.io.Files.getFileExtension;

@Service
public class MinioService {

    @Autowired
    private MinioClient minioClient;

    @Value("${minio.bucket.books-cover}")
    private String bucketBooksCover;

    @PostConstruct
    public void init() {
        try {
            boolean exists = minioClient.bucketExists(
                    BucketExistsArgs.builder().bucket(this.bucketBooksCover).build()
            );

            if (!exists) {
                minioClient.makeBucket(
                        MakeBucketArgs.builder().bucket(this.bucketBooksCover).build()
                );
            }
        } catch (Exception e) {
            throw new RuntimeException("Impossible de créer le bucket");
        }
    }


    public String updateCover(String oldCoverPath, MultipartFile file) throws Exception {
        String uniqueFileName = this.uploadFile(this.bucketBooksCover, file);

        if (oldCoverPath != null) {
            this.deleteImage(this.bucketBooksCover, oldCoverPath);
        }
        return uniqueFileName;
    }

    public String getCover(String fileName) throws Exception {
        return this.getFileUrl(this.bucketBooksCover, fileName);
    }

    public String uploadFile(String bucketName, MultipartFile file) throws Exception {
        String uniqueFileName = generateUniqueFileName(file);
        minioClient.putObject(
                PutObjectArgs.builder()
                        .bucket(bucketName)
                        .object(uniqueFileName)
                        .stream(file.getInputStream(), file.getSize(), -1)
                        .contentType(file.getContentType())
                        .build()
        );

        return uniqueFileName;
    }


    public void deleteImage(String bucketName, String fileName) throws Exception {
        if (this.isFileExist(bucketName, fileName)) {
            minioClient.removeObject(
                    RemoveObjectArgs.builder()
                            .bucket(bucketName)
                            .object(fileName)
                            .build()
            );
        }
    }

    public boolean isFileExist(String bucketName, String fileName) throws Exception {
        try {
            minioClient.statObject(
                    StatObjectArgs.builder()
                            .bucket(bucketName)
                            .object(fileName)
                            .build()
            );
            return true;
        } catch (ErrorResponseException e) {
            return false;
        }
    }

    public String getFileUrl(String bucketName, String fileName) throws Exception {
        if (fileName != null && this.isFileExist(bucketName, fileName)) {
            return minioClient.getPresignedObjectUrl(
                    GetPresignedObjectUrlArgs.builder()
                            .method(Method.GET)
                            .bucket(bucketName)
                            .object(fileName)
                            .expiry(60 * 60 * 24)
                            .build()
            );
        }
        return null;
    }

    private String generateUniqueFileName(MultipartFile file) {
        String extension = getFileExtension(Objects.requireNonNull(file.getOriginalFilename()));
        String uniqueId = UUID.randomUUID().toString();
        return uniqueId + extension;
    }
}
