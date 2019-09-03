package tr.com.aurora.arge.repository;

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

}
