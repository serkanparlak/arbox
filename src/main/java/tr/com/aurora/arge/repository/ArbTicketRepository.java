package tr.com.aurora.arge.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import tr.com.aurora.arge.domain.ArbTicket;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the ArbTicket entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ArbTicketRepository extends JpaRepository<ArbTicket, Long> {

    @Query("select arbTicket from ArbTicket arbTicket where arbTicket.owner.login = ?#{principal.username}")
    List<ArbTicket> findByOwnerIsCurrentUser();

    @Query("select arbTicket from ArbTicket arbTicket where arbTicket.assignee.login = ?#{principal.username}")
    List<ArbTicket> findByAssigneeIsCurrentUser();

    Page<ArbTicket> findAllByState(Boolean state, Pageable pageable);

    Page<ArbTicket> findAllByOwnerId(Long ownerId ,Pageable pageable);

    Page<ArbTicket> findAllByAssigneeId(Long assigneeId ,Pageable pageable);

    @Query(value = "select t from ArbTicket t inner join ArbComment c on  c.ticket = t order by c.date desc")
    Page<ArbTicket> findCommentedLatest(Pageable pageable);
}
