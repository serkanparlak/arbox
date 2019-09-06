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

    Page<ArbTicket> findAllByStateOrderByDateDesc(Boolean state, Pageable pageable);

    Page<ArbTicket> findAllByOwnerIdOrderByDateDesc(Long ownerId ,Pageable pageable);

    Page<ArbTicket> findAllByAssigneeIdOrderByDateDesc(Long assigneeId ,Pageable pageable);

    String recentlyQuery = "select a.* from arb_ticket a inner join (select distinct on (c.ticket_id) c.ticket_id, c.date from (select * from arb_comment order by date) c) tids on a.id = tids.ticket_id order by tids.date desc";
    @Query(value = recentlyQuery, nativeQuery = true)
    Page<ArbTicket> findCommentedLatest(Pageable pageable);
}
