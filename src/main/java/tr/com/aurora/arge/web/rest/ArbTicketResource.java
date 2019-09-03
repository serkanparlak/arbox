package tr.com.aurora.arge.web.rest;

import tr.com.aurora.arge.service.ArbTicketService;
import tr.com.aurora.arge.web.rest.errors.BadRequestAlertException;
import tr.com.aurora.arge.service.dto.ArbTicketDTO;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link tr.com.aurora.arge.domain.ArbTicket}.
 */
@RestController
@RequestMapping("/api")
public class ArbTicketResource {

    private final Logger log = LoggerFactory.getLogger(ArbTicketResource.class);

    private static final String ENTITY_NAME = "arbTicket";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ArbTicketService arbTicketService;

    public ArbTicketResource(ArbTicketService arbTicketService) {
        this.arbTicketService = arbTicketService;
    }

    /**
     * {@code POST  /arb-tickets} : Create a new arbTicket.
     *
     * @param arbTicketDTO the arbTicketDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new arbTicketDTO, or with status {@code 400 (Bad Request)} if the arbTicket has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/arb-tickets")
    public ResponseEntity<ArbTicketDTO> createArbTicket(@RequestBody ArbTicketDTO arbTicketDTO) throws URISyntaxException {
        log.debug("REST request to save ArbTicket : {}", arbTicketDTO);
        if (arbTicketDTO.getId() != null) {
            throw new BadRequestAlertException("A new arbTicket cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ArbTicketDTO result = arbTicketService.save(arbTicketDTO);
        return ResponseEntity.created(new URI("/api/arb-tickets/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /arb-tickets} : Updates an existing arbTicket.
     *
     * @param arbTicketDTO the arbTicketDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated arbTicketDTO,
     * or with status {@code 400 (Bad Request)} if the arbTicketDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the arbTicketDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/arb-tickets")
    public ResponseEntity<ArbTicketDTO> updateArbTicket(@RequestBody ArbTicketDTO arbTicketDTO) throws URISyntaxException {
        log.debug("REST request to update ArbTicket : {}", arbTicketDTO);
        if (arbTicketDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ArbTicketDTO result = arbTicketService.save(arbTicketDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, arbTicketDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /arb-tickets} : get all the arbTickets.
     *

     * @param pageable the pagination information.

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of arbTickets in body.
     */
    @GetMapping("/arb-tickets")
    public ResponseEntity<List<ArbTicketDTO>> getAllArbTickets(Pageable pageable) {
        log.debug("REST request to get a page of ArbTickets");
        Page<ArbTicketDTO> page = arbTicketService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /arb-tickets/:id} : get the "id" arbTicket.
     *
     * @param id the id of the arbTicketDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the arbTicketDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/arb-tickets/{id}")
    public ResponseEntity<ArbTicketDTO> getArbTicket(@PathVariable Long id) {
        log.debug("REST request to get ArbTicket : {}", id);
        Optional<ArbTicketDTO> arbTicketDTO = arbTicketService.findOne(id);
        return ResponseUtil.wrapOrNotFound(arbTicketDTO);
    }

    /**
     * {@code DELETE  /arb-tickets/:id} : delete the "id" arbTicket.
     *
     * @param id the id of the arbTicketDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/arb-tickets/{id}")
    public ResponseEntity<Void> deleteArbTicket(@PathVariable Long id) {
        log.debug("REST request to delete ArbTicket : {}", id);
        arbTicketService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
