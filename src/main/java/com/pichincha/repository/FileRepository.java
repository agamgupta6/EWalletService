package com.pichincha.repository;

import com.pichincha.domain.File;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the File entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FileRepository extends JpaRepository<File, Long> {

    @Query("select file from File file where file.user.login = ?#{principal.username}")
    List<File> findByUserIsCurrentUser();

}
