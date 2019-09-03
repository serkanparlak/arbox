package tr.com.aurora.arge.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;

/**
 * A ArbComment.
 */
@Entity
@Table(name = "arb_comment")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ArbComment implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "date")
    private Instant date;

    @Column(name = "content")
    private String content;

    @Column(name = "is_solution")
    private Boolean isSolution;

    @ManyToOne
    @JsonIgnoreProperties("arbComments")
    private ArbTicket ticket;

    @ManyToOne
    @JsonIgnoreProperties("arbComments")
    private User owner;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getDate() {
        return date;
    }

    public ArbComment date(Instant date) {
        this.date = date;
        return this;
    }

    public void setDate(Instant date) {
        this.date = date;
    }

    public String getContent() {
        return content;
    }

    public ArbComment content(String content) {
        this.content = content;
        return this;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Boolean isIsSolution() {
        return isSolution;
    }

    public ArbComment isSolution(Boolean isSolution) {
        this.isSolution = isSolution;
        return this;
    }

    public void setIsSolution(Boolean isSolution) {
        this.isSolution = isSolution;
    }

    public ArbTicket getTicket() {
        return ticket;
    }

    public ArbComment ticket(ArbTicket arbTicket) {
        this.ticket = arbTicket;
        return this;
    }

    public void setTicket(ArbTicket arbTicket) {
        this.ticket = arbTicket;
    }

    public User getOwner() {
        return owner;
    }

    public ArbComment owner(User user) {
        this.owner = user;
        return this;
    }

    public void setOwner(User user) {
        this.owner = user;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ArbComment)) {
            return false;
        }
        return id != null && id.equals(((ArbComment) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "ArbComment{" +
            "id=" + getId() +
            ", date='" + getDate() + "'" +
            ", content='" + getContent() + "'" +
            ", isSolution='" + isIsSolution() + "'" +
            "}";
    }
}
