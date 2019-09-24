package tr.com.aurora.arge.service;

import tr.com.aurora.arge.service.dto.ArbTicketDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import tr.com.aurora.arge.web.rest.vm.TicketVM;

import java.util.Optional;

/**
 * Service Interface for managing {@link tr.com.aurora.arge.domain.ArbTicket}.
 */
public interface ArbTicketService {

    /**
     * Save a arbTicket.
     *
     * @param arbTicketDTO the entity to save.
     * @return the persisted entity.
     */
    ArbTicketDTO save(ArbTicketDTO arbTicketDTO);

    /**
     * Get all the arbTickets.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<ArbTicketDTO> findAll(Pageable pageable);

    Page<ArbTicketDTO> getAllByState(Boolean state ,Pageable pageable);

    Page<ArbTicketDTO> getAllRecentlyAnswered(Pageable pageable);

    Page<ArbTicketDTO> getAllCreatedByMe(Long ownerId, Pageable pageable);

    Page<ArbTicketDTO> getAllAssignedToMe(Long assigneeId, Pageable pageable);

    /**
     * Get the "id" arbTicket.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<ArbTicketDTO> findOne(Long id);

    /**
     * Delete the "id" arbTicket.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);


    /**
     *
     * @param pageable
     * @return
     */
    Page<TicketVM> findAllVM(Pageable pageable);

}
