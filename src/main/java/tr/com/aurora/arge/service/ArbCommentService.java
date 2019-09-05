package tr.com.aurora.arge.service;

import tr.com.aurora.arge.service.dto.ArbCommentDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link tr.com.aurora.arge.domain.ArbComment}.
 */
public interface ArbCommentService {

    /**
     * Save a arbComment.
     *
     * @param arbCommentDTO the entity to save.
     * @return the persisted entity.
     */
    ArbCommentDTO save(ArbCommentDTO arbCommentDTO);

    /**
     * Get all the arbComments.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<ArbCommentDTO> findAll(Pageable pageable);

    Page<ArbCommentDTO> getAllByTicketId(Long ticketId, Pageable pageable);

    /**
     * Get the "id" arbComment.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<ArbCommentDTO> findOne(Long id);

    /**
     * Delete the "id" arbComment.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);

}
