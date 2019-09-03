package tr.com.aurora.arge.repository;

import tr.com.aurora.arge.domain.ArbComment;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the ArbComment entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ArbCommentRepository extends JpaRepository<ArbComment, Long> {

    @Query("select arbComment from ArbComment arbComment where arbComment.owner.login = ?#{principal.username}")
    List<ArbComment> findByOwnerIsCurrentUser();

}
