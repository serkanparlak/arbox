package tr.com.aurora.arge.web.rest;

import tr.com.aurora.arge.ArboxApp;
import tr.com.aurora.arge.domain.ArbTicket;
import tr.com.aurora.arge.repository.ArbTicketRepository;
import tr.com.aurora.arge.service.ArbTicketService;
import tr.com.aurora.arge.service.dto.ArbTicketDTO;
import tr.com.aurora.arge.service.mapper.ArbTicketMapper;
import tr.com.aurora.arge.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static tr.com.aurora.arge.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import tr.com.aurora.arge.domain.enumeration.Priority;
/**
 * Integration tests for the {@link ArbTicketResource} REST controller.
 */
@SpringBootTest(classes = ArboxApp.class)
public class ArbTicketResourceIT {

    private static final Priority DEFAULT_PRIORITY = Priority.High;
    private static final Priority UPDATED_PRIORITY = Priority.Medium;

    private static final Boolean DEFAULT_STATE = false;
    private static final Boolean UPDATED_STATE = true;

    private static final String DEFAULT_SUBJECT = "AAAAAAAAAA";
    private static final String UPDATED_SUBJECT = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final Instant DEFAULT_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);
    private static final Instant SMALLER_DATE = Instant.ofEpochMilli(-1L);

    @Autowired
    private ArbTicketRepository arbTicketRepository;

    @Autowired
    private ArbTicketMapper arbTicketMapper;

    @Autowired
    private ArbTicketService arbTicketService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restArbTicketMockMvc;

    private ArbTicket arbTicket;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ArbTicketResource arbTicketResource = new ArbTicketResource(arbTicketService);
        this.restArbTicketMockMvc = MockMvcBuilders.standaloneSetup(arbTicketResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ArbTicket createEntity(EntityManager em) {
        ArbTicket arbTicket = new ArbTicket()
            .priority(DEFAULT_PRIORITY)
            .state(DEFAULT_STATE)
            .subject(DEFAULT_SUBJECT)
            .description(DEFAULT_DESCRIPTION)
            .date(DEFAULT_DATE);
        return arbTicket;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ArbTicket createUpdatedEntity(EntityManager em) {
        ArbTicket arbTicket = new ArbTicket()
            .priority(UPDATED_PRIORITY)
            .state(UPDATED_STATE)
            .subject(UPDATED_SUBJECT)
            .description(UPDATED_DESCRIPTION)
            .date(UPDATED_DATE);
        return arbTicket;
    }

    @BeforeEach
    public void initTest() {
        arbTicket = createEntity(em);
    }

    @Test
    @Transactional
    public void createArbTicket() throws Exception {
        int databaseSizeBeforeCreate = arbTicketRepository.findAll().size();

        // Create the ArbTicket
        ArbTicketDTO arbTicketDTO = arbTicketMapper.toDto(arbTicket);
        restArbTicketMockMvc.perform(post("/api/arb-tickets")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(arbTicketDTO)))
            .andExpect(status().isCreated());

        // Validate the ArbTicket in the database
        List<ArbTicket> arbTicketList = arbTicketRepository.findAll();
        assertThat(arbTicketList).hasSize(databaseSizeBeforeCreate + 1);
        ArbTicket testArbTicket = arbTicketList.get(arbTicketList.size() - 1);
        assertThat(testArbTicket.getPriority()).isEqualTo(DEFAULT_PRIORITY);
        assertThat(testArbTicket.isState()).isEqualTo(DEFAULT_STATE);
        assertThat(testArbTicket.getSubject()).isEqualTo(DEFAULT_SUBJECT);
        assertThat(testArbTicket.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testArbTicket.getDate()).isEqualTo(DEFAULT_DATE);
    }

    @Test
    @Transactional
    public void createArbTicketWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = arbTicketRepository.findAll().size();

        // Create the ArbTicket with an existing ID
        arbTicket.setId(1L);
        ArbTicketDTO arbTicketDTO = arbTicketMapper.toDto(arbTicket);

        // An entity with an existing ID cannot be created, so this API call must fail
        restArbTicketMockMvc.perform(post("/api/arb-tickets")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(arbTicketDTO)))
            .andExpect(status().isBadRequest());

        // Validate the ArbTicket in the database
        List<ArbTicket> arbTicketList = arbTicketRepository.findAll();
        assertThat(arbTicketList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllArbTickets() throws Exception {
        // Initialize the database
        arbTicketRepository.saveAndFlush(arbTicket);

        // Get all the arbTicketList
        restArbTicketMockMvc.perform(get("/api/arb-tickets?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(arbTicket.getId().intValue())))
            .andExpect(jsonPath("$.[*].priority").value(hasItem(DEFAULT_PRIORITY.toString())))
            .andExpect(jsonPath("$.[*].state").value(hasItem(DEFAULT_STATE.booleanValue())))
            .andExpect(jsonPath("$.[*].subject").value(hasItem(DEFAULT_SUBJECT.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())));
    }
    
    @Test
    @Transactional
    public void getArbTicket() throws Exception {
        // Initialize the database
        arbTicketRepository.saveAndFlush(arbTicket);

        // Get the arbTicket
        restArbTicketMockMvc.perform(get("/api/arb-tickets/{id}", arbTicket.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(arbTicket.getId().intValue()))
            .andExpect(jsonPath("$.priority").value(DEFAULT_PRIORITY.toString()))
            .andExpect(jsonPath("$.state").value(DEFAULT_STATE.booleanValue()))
            .andExpect(jsonPath("$.subject").value(DEFAULT_SUBJECT.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingArbTicket() throws Exception {
        // Get the arbTicket
        restArbTicketMockMvc.perform(get("/api/arb-tickets/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateArbTicket() throws Exception {
        // Initialize the database
        arbTicketRepository.saveAndFlush(arbTicket);

        int databaseSizeBeforeUpdate = arbTicketRepository.findAll().size();

        // Update the arbTicket
        ArbTicket updatedArbTicket = arbTicketRepository.findById(arbTicket.getId()).get();
        // Disconnect from session so that the updates on updatedArbTicket are not directly saved in db
        em.detach(updatedArbTicket);
        updatedArbTicket
            .priority(UPDATED_PRIORITY)
            .state(UPDATED_STATE)
            .subject(UPDATED_SUBJECT)
            .description(UPDATED_DESCRIPTION)
            .date(UPDATED_DATE);
        ArbTicketDTO arbTicketDTO = arbTicketMapper.toDto(updatedArbTicket);

        restArbTicketMockMvc.perform(put("/api/arb-tickets")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(arbTicketDTO)))
            .andExpect(status().isOk());

        // Validate the ArbTicket in the database
        List<ArbTicket> arbTicketList = arbTicketRepository.findAll();
        assertThat(arbTicketList).hasSize(databaseSizeBeforeUpdate);
        ArbTicket testArbTicket = arbTicketList.get(arbTicketList.size() - 1);
        assertThat(testArbTicket.getPriority()).isEqualTo(UPDATED_PRIORITY);
        assertThat(testArbTicket.isState()).isEqualTo(UPDATED_STATE);
        assertThat(testArbTicket.getSubject()).isEqualTo(UPDATED_SUBJECT);
        assertThat(testArbTicket.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testArbTicket.getDate()).isEqualTo(UPDATED_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingArbTicket() throws Exception {
        int databaseSizeBeforeUpdate = arbTicketRepository.findAll().size();

        // Create the ArbTicket
        ArbTicketDTO arbTicketDTO = arbTicketMapper.toDto(arbTicket);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restArbTicketMockMvc.perform(put("/api/arb-tickets")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(arbTicketDTO)))
            .andExpect(status().isBadRequest());

        // Validate the ArbTicket in the database
        List<ArbTicket> arbTicketList = arbTicketRepository.findAll();
        assertThat(arbTicketList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteArbTicket() throws Exception {
        // Initialize the database
        arbTicketRepository.saveAndFlush(arbTicket);

        int databaseSizeBeforeDelete = arbTicketRepository.findAll().size();

        // Delete the arbTicket
        restArbTicketMockMvc.perform(delete("/api/arb-tickets/{id}", arbTicket.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ArbTicket> arbTicketList = arbTicketRepository.findAll();
        assertThat(arbTicketList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ArbTicket.class);
        ArbTicket arbTicket1 = new ArbTicket();
        arbTicket1.setId(1L);
        ArbTicket arbTicket2 = new ArbTicket();
        arbTicket2.setId(arbTicket1.getId());
        assertThat(arbTicket1).isEqualTo(arbTicket2);
        arbTicket2.setId(2L);
        assertThat(arbTicket1).isNotEqualTo(arbTicket2);
        arbTicket1.setId(null);
        assertThat(arbTicket1).isNotEqualTo(arbTicket2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ArbTicketDTO.class);
        ArbTicketDTO arbTicketDTO1 = new ArbTicketDTO();
        arbTicketDTO1.setId(1L);
        ArbTicketDTO arbTicketDTO2 = new ArbTicketDTO();
        assertThat(arbTicketDTO1).isNotEqualTo(arbTicketDTO2);
        arbTicketDTO2.setId(arbTicketDTO1.getId());
        assertThat(arbTicketDTO1).isEqualTo(arbTicketDTO2);
        arbTicketDTO2.setId(2L);
        assertThat(arbTicketDTO1).isNotEqualTo(arbTicketDTO2);
        arbTicketDTO1.setId(null);
        assertThat(arbTicketDTO1).isNotEqualTo(arbTicketDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(arbTicketMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(arbTicketMapper.fromId(null)).isNull();
    }
}
