package tr.com.aurora.arge.web.rest;

import tr.com.aurora.arge.service.ArbCommentService;
import tr.com.aurora.arge.web.rest.errors.BadRequestAlertException;
import tr.com.aurora.arge.service.dto.ArbCommentDTO;

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
 * REST controller for managing {@link tr.com.aurora.arge.domain.ArbComment}.
 */
@RestController
@RequestMapping("/api")
public class ArbCommentResource {

    private final Logger log = LoggerFactory.getLogger(ArbCommentResource.class);

    private static final String ENTITY_NAME = "arbComment";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ArbCommentService arbCommentService;

    public ArbCommentResource(ArbCommentService arbCommentService) {
        this.arbCommentService = arbCommentService;
    }

    /**
     * {@code POST  /arb-comments} : Create a new arbComment.
     *
     * @param arbCommentDTO the arbCommentDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new arbCommentDTO, or with status {@code 400 (Bad Request)} if the arbComment has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/arb-comments")
    public ResponseEntity<ArbCommentDTO> createArbComment(@RequestBody ArbCommentDTO arbCommentDTO) throws URISyntaxException {
        log.debug("REST request to save ArbComment : {}", arbCommentDTO);
        if (arbCommentDTO.getId() != null) {
            throw new BadRequestAlertException("A new arbComment cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ArbCommentDTO result = arbCommentService.save(arbCommentDTO);
        return ResponseEntity.created(new URI("/api/arb-comments/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /arb-comments} : Updates an existing arbComment.
     *
     * @param arbCommentDTO the arbCommentDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated arbCommentDTO,
     * or with status {@code 400 (Bad Request)} if the arbCommentDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the arbCommentDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/arb-comments")
    public ResponseEntity<ArbCommentDTO> updateArbComment(@RequestBody ArbCommentDTO arbCommentDTO) throws URISyntaxException {
        log.debug("REST request to update ArbComment : {}", arbCommentDTO);
        if (arbCommentDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ArbCommentDTO result = arbCommentService.save(arbCommentDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, arbCommentDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /arb-comments} : get all the arbComments.
     *

     * @param pageable the pagination information.

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of arbComments in body.
     */
    @GetMapping("/arb-comments")
    public ResponseEntity<List<ArbCommentDTO>> getAllArbComments(Pageable pageable) {
        log.debug("REST request to get a page of ArbComments");
        Page<ArbCommentDTO> page = arbCommentService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /arb-comments/:id} : get the "id" arbComment.
     *
     * @param id the id of the arbCommentDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the arbCommentDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/arb-comments/{id}")
    public ResponseEntity<ArbCommentDTO> getArbComment(@PathVariable Long id) {
        log.debug("REST request to get ArbComment : {}", id);
        Optional<ArbCommentDTO> arbCommentDTO = arbCommentService.findOne(id);
        return ResponseUtil.wrapOrNotFound(arbCommentDTO);
    }

    /**
     * {@code DELETE  /arb-comments/:id} : delete the "id" arbComment.
     *
     * @param id the id of the arbCommentDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/arb-comments/{id}")
    public ResponseEntity<Void> deleteArbComment(@PathVariable Long id) {
        log.debug("REST request to delete ArbComment : {}", id);
        arbCommentService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
