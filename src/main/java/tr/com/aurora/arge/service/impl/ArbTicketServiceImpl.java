package tr.com.aurora.arge.service.impl;

import tr.com.aurora.arge.service.ArbTicketService;
import tr.com.aurora.arge.domain.ArbTicket;
import tr.com.aurora.arge.repository.ArbTicketRepository;
import tr.com.aurora.arge.service.dto.ArbTicketDTO;
import tr.com.aurora.arge.service.mapper.ArbTicketMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link ArbTicket}.
 */
@Service
@Transactional
public class ArbTicketServiceImpl implements ArbTicketService {

    private final Logger log = LoggerFactory.getLogger(ArbTicketServiceImpl.class);

    private final ArbTicketRepository arbTicketRepository;

    private final ArbTicketMapper arbTicketMapper;

    public ArbTicketServiceImpl(ArbTicketRepository arbTicketRepository, ArbTicketMapper arbTicketMapper) {
        this.arbTicketRepository = arbTicketRepository;
        this.arbTicketMapper = arbTicketMapper;
    }

    /**
     * Save a arbTicket.
     *
     * @param arbTicketDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public ArbTicketDTO save(ArbTicketDTO arbTicketDTO) {
        log.debug("Request to save ArbTicket : {}", arbTicketDTO);
        ArbTicket arbTicket = arbTicketMapper.toEntity(arbTicketDTO);
        arbTicket = arbTicketRepository.save(arbTicket);
        return arbTicketMapper.toDto(arbTicket);
    }

    /**
     * Get all the arbTickets.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<ArbTicketDTO> findAll(Pageable pageable) {
        log.debug("Request to get all ArbTickets");
        return arbTicketRepository.findAll(pageable)
            .map(arbTicketMapper::toDto);
    }


    /**
     * Get one arbTicket by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<ArbTicketDTO> findOne(Long id) {
        log.debug("Request to get ArbTicket : {}", id);
        return arbTicketRepository.findById(id)
            .map(arbTicketMapper::toDto);
    }

    /**
     * Delete the arbTicket by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete ArbTicket : {}", id);
        arbTicketRepository.deleteById(id);
    }
}
