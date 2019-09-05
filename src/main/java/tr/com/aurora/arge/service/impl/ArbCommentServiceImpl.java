package tr.com.aurora.arge.service.impl;

import tr.com.aurora.arge.service.ArbCommentService;
import tr.com.aurora.arge.domain.ArbComment;
import tr.com.aurora.arge.repository.ArbCommentRepository;
import tr.com.aurora.arge.service.dto.ArbCommentDTO;
import tr.com.aurora.arge.service.mapper.ArbCommentMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link ArbComment}.
 */
@Service
@Transactional
public class ArbCommentServiceImpl implements ArbCommentService {

    private final Logger log = LoggerFactory.getLogger(ArbCommentServiceImpl.class);

    private final ArbCommentRepository arbCommentRepository;

    private final ArbCommentMapper arbCommentMapper;

    public ArbCommentServiceImpl(ArbCommentRepository arbCommentRepository, ArbCommentMapper arbCommentMapper) {
        this.arbCommentRepository = arbCommentRepository;
        this.arbCommentMapper = arbCommentMapper;
    }

    /**
     * Save a arbComment.
     *
     * @param arbCommentDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public ArbCommentDTO save(ArbCommentDTO arbCommentDTO) {
        log.debug("Request to save ArbComment : {}", arbCommentDTO);
        ArbComment arbComment = arbCommentMapper.toEntity(arbCommentDTO);
        arbComment = arbCommentRepository.save(arbComment);
        return arbCommentMapper.toDto(arbComment);
    }

    /**
     * Get all the arbComments.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<ArbCommentDTO> findAll(Pageable pageable) {
        log.debug("Request to get all ArbComments");
        return arbCommentRepository.findAll(pageable)
            .map(arbCommentMapper::toDto);
    }

    @Override
    public Page<ArbCommentDTO> getAllByTicketId(Long ticketId, Pageable pageable) {
        return arbCommentRepository.findAllByTicketIdOrderByDateDesc(ticketId, pageable)
            .map(arbCommentMapper::toDto);
    }


    /**
     * Get one arbComment by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<ArbCommentDTO> findOne(Long id) {
        log.debug("Request to get ArbComment : {}", id);
        return arbCommentRepository.findById(id)
            .map(arbCommentMapper::toDto);
    }

    /**
     * Delete the arbComment by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete ArbComment : {}", id);
        arbCommentRepository.deleteById(id);
    }
}
