package tr.com.aurora.arge.web.rest;

import tr.com.aurora.arge.ArboxApp;
import tr.com.aurora.arge.domain.ArbComment;
import tr.com.aurora.arge.repository.ArbCommentRepository;
import tr.com.aurora.arge.service.ArbCommentService;
import tr.com.aurora.arge.service.dto.ArbCommentDTO;
import tr.com.aurora.arge.service.mapper.ArbCommentMapper;
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

/**
 * Integration tests for the {@link ArbCommentResource} REST controller.
 */
@SpringBootTest(classes = ArboxApp.class)
public class ArbCommentResourceIT {

    private static final Instant DEFAULT_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);
    private static final Instant SMALLER_DATE = Instant.ofEpochMilli(-1L);

    private static final String DEFAULT_CONTENT = "AAAAAAAAAA";
    private static final String UPDATED_CONTENT = "BBBBBBBBBB";

    private static final Boolean DEFAULT_IS_SOLUTION = false;
    private static final Boolean UPDATED_IS_SOLUTION = true;

    @Autowired
    private ArbCommentRepository arbCommentRepository;

    @Autowired
    private ArbCommentMapper arbCommentMapper;

    @Autowired
    private ArbCommentService arbCommentService;

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

    private MockMvc restArbCommentMockMvc;

    private ArbComment arbComment;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ArbCommentResource arbCommentResource = new ArbCommentResource(arbCommentService);
        this.restArbCommentMockMvc = MockMvcBuilders.standaloneSetup(arbCommentResource)
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
    public static ArbComment createEntity(EntityManager em) {
        ArbComment arbComment = new ArbComment()
            .date(DEFAULT_DATE)
            .content(DEFAULT_CONTENT)
            .isSolution(DEFAULT_IS_SOLUTION);
        return arbComment;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ArbComment createUpdatedEntity(EntityManager em) {
        ArbComment arbComment = new ArbComment()
            .date(UPDATED_DATE)
            .content(UPDATED_CONTENT)
            .isSolution(UPDATED_IS_SOLUTION);
        return arbComment;
    }

    @BeforeEach
    public void initTest() {
        arbComment = createEntity(em);
    }

    @Test
    @Transactional
    public void createArbComment() throws Exception {
        int databaseSizeBeforeCreate = arbCommentRepository.findAll().size();

        // Create the ArbComment
        ArbCommentDTO arbCommentDTO = arbCommentMapper.toDto(arbComment);
        restArbCommentMockMvc.perform(post("/api/arb-comments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(arbCommentDTO)))
            .andExpect(status().isCreated());

        // Validate the ArbComment in the database
        List<ArbComment> arbCommentList = arbCommentRepository.findAll();
        assertThat(arbCommentList).hasSize(databaseSizeBeforeCreate + 1);
        ArbComment testArbComment = arbCommentList.get(arbCommentList.size() - 1);
        assertThat(testArbComment.getDate()).isEqualTo(DEFAULT_DATE);
        assertThat(testArbComment.getContent()).isEqualTo(DEFAULT_CONTENT);
        assertThat(testArbComment.isIsSolution()).isEqualTo(DEFAULT_IS_SOLUTION);
    }

    @Test
    @Transactional
    public void createArbCommentWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = arbCommentRepository.findAll().size();

        // Create the ArbComment with an existing ID
        arbComment.setId(1L);
        ArbCommentDTO arbCommentDTO = arbCommentMapper.toDto(arbComment);

        // An entity with an existing ID cannot be created, so this API call must fail
        restArbCommentMockMvc.perform(post("/api/arb-comments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(arbCommentDTO)))
            .andExpect(status().isBadRequest());

        // Validate the ArbComment in the database
        List<ArbComment> arbCommentList = arbCommentRepository.findAll();
        assertThat(arbCommentList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllArbComments() throws Exception {
        // Initialize the database
        arbCommentRepository.saveAndFlush(arbComment);

        // Get all the arbCommentList
        restArbCommentMockMvc.perform(get("/api/arb-comments?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(arbComment.getId().intValue())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())))
            .andExpect(jsonPath("$.[*].content").value(hasItem(DEFAULT_CONTENT.toString())))
            .andExpect(jsonPath("$.[*].isSolution").value(hasItem(DEFAULT_IS_SOLUTION.booleanValue())));
    }
    
    @Test
    @Transactional
    public void getArbComment() throws Exception {
        // Initialize the database
        arbCommentRepository.saveAndFlush(arbComment);

        // Get the arbComment
        restArbCommentMockMvc.perform(get("/api/arb-comments/{id}", arbComment.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(arbComment.getId().intValue()))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()))
            .andExpect(jsonPath("$.content").value(DEFAULT_CONTENT.toString()))
            .andExpect(jsonPath("$.isSolution").value(DEFAULT_IS_SOLUTION.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingArbComment() throws Exception {
        // Get the arbComment
        restArbCommentMockMvc.perform(get("/api/arb-comments/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateArbComment() throws Exception {
        // Initialize the database
        arbCommentRepository.saveAndFlush(arbComment);

        int databaseSizeBeforeUpdate = arbCommentRepository.findAll().size();

        // Update the arbComment
        ArbComment updatedArbComment = arbCommentRepository.findById(arbComment.getId()).get();
        // Disconnect from session so that the updates on updatedArbComment are not directly saved in db
        em.detach(updatedArbComment);
        updatedArbComment
            .date(UPDATED_DATE)
            .content(UPDATED_CONTENT)
            .isSolution(UPDATED_IS_SOLUTION);
        ArbCommentDTO arbCommentDTO = arbCommentMapper.toDto(updatedArbComment);

        restArbCommentMockMvc.perform(put("/api/arb-comments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(arbCommentDTO)))
            .andExpect(status().isOk());

        // Validate the ArbComment in the database
        List<ArbComment> arbCommentList = arbCommentRepository.findAll();
        assertThat(arbCommentList).hasSize(databaseSizeBeforeUpdate);
        ArbComment testArbComment = arbCommentList.get(arbCommentList.size() - 1);
        assertThat(testArbComment.getDate()).isEqualTo(UPDATED_DATE);
        assertThat(testArbComment.getContent()).isEqualTo(UPDATED_CONTENT);
        assertThat(testArbComment.isIsSolution()).isEqualTo(UPDATED_IS_SOLUTION);
    }

    @Test
    @Transactional
    public void updateNonExistingArbComment() throws Exception {
        int databaseSizeBeforeUpdate = arbCommentRepository.findAll().size();

        // Create the ArbComment
        ArbCommentDTO arbCommentDTO = arbCommentMapper.toDto(arbComment);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restArbCommentMockMvc.perform(put("/api/arb-comments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(arbCommentDTO)))
            .andExpect(status().isBadRequest());

        // Validate the ArbComment in the database
        List<ArbComment> arbCommentList = arbCommentRepository.findAll();
        assertThat(arbCommentList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteArbComment() throws Exception {
        // Initialize the database
        arbCommentRepository.saveAndFlush(arbComment);

        int databaseSizeBeforeDelete = arbCommentRepository.findAll().size();

        // Delete the arbComment
        restArbCommentMockMvc.perform(delete("/api/arb-comments/{id}", arbComment.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ArbComment> arbCommentList = arbCommentRepository.findAll();
        assertThat(arbCommentList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ArbComment.class);
        ArbComment arbComment1 = new ArbComment();
        arbComment1.setId(1L);
        ArbComment arbComment2 = new ArbComment();
        arbComment2.setId(arbComment1.getId());
        assertThat(arbComment1).isEqualTo(arbComment2);
        arbComment2.setId(2L);
        assertThat(arbComment1).isNotEqualTo(arbComment2);
        arbComment1.setId(null);
        assertThat(arbComment1).isNotEqualTo(arbComment2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ArbCommentDTO.class);
        ArbCommentDTO arbCommentDTO1 = new ArbCommentDTO();
        arbCommentDTO1.setId(1L);
        ArbCommentDTO arbCommentDTO2 = new ArbCommentDTO();
        assertThat(arbCommentDTO1).isNotEqualTo(arbCommentDTO2);
        arbCommentDTO2.setId(arbCommentDTO1.getId());
        assertThat(arbCommentDTO1).isEqualTo(arbCommentDTO2);
        arbCommentDTO2.setId(2L);
        assertThat(arbCommentDTO1).isNotEqualTo(arbCommentDTO2);
        arbCommentDTO1.setId(null);
        assertThat(arbCommentDTO1).isNotEqualTo(arbCommentDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(arbCommentMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(arbCommentMapper.fromId(null)).isNull();
    }
}
