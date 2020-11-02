package tr.com.aurora.arge.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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

    @Query(value = "select arbComment from ArbComment arbComment where arbComment.owner.login = ?#{principal.username}")
    List<ArbComment> findByOwnerIsCurrentUser();

    Page<ArbComment> findAllByTicketIdOrderByDate(Long ticketId, Pageable pageable);

    void deleteAllByTicketId(Long ticketId);


}
