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

//    String recentlyQuery = "select a.* from arb_ticket a inner join (select distinct on (c.ticket_id) c.ticket_id, c.date from (select * from arb_comment order by date) c) tids on a.id = tids.ticket_id order by tids.date desc";
    String recentlyQueryHakanAbi = "select art.* from arb_comment arc, arb_ticket art where arc.ticket_id = art.id group by art.id order by max(arc.date) desc --#pageable\n";
    String recentlyQueryHakanAbiCount = "select count(distinct arc.ticket_id) from arb_comment arc";
    @Query(value = recentlyQueryHakanAbi, countQuery = recentlyQueryHakanAbiCount, nativeQuery = true)
    Page<ArbTicket> findCommentedLatest(Pageable pageable);
}

//    select art.* from arb_comment arc, arb_ticket art
//    where arc.ticket_id = art.id
//    group by art.id
//    order by max(arc.date) desc;
//
//    //veya
//
//    select art.* from arb_comment arc
//    left join arb_ticket art on arc.ticket_id = art.id
//    group by art.id
//    order by max(arc.date) desc;
