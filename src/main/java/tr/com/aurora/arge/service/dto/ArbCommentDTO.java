package tr.com.aurora.arge.service.dto;
import java.time.Instant;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link tr.com.aurora.arge.domain.ArbComment} entity.
 */
public class ArbCommentDTO implements Serializable {

    private Long id;

    private Instant date;

    private String content;

    private Boolean isSolution;


    private Long ticketId;

    private Long ownerId;

    private String ownerUsername;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getDate() {
        return date;
    }

    public void setDate(Instant date) {
        this.date = date;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Boolean isIsSolution() {
        return isSolution;
    }

    public void setIsSolution(Boolean isSolution) {
        this.isSolution = isSolution;
    }

    public Long getTicketId() {
        return ticketId;
    }

    public void setTicketId(Long arbTicketId) {
        this.ticketId = arbTicketId;
    }

    public Long getOwnerId() {
        return ownerId;
    }

    public void setOwnerId(Long userId) {
        this.ownerId = userId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        ArbCommentDTO arbCommentDTO = (ArbCommentDTO) o;
        if (arbCommentDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), arbCommentDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ArbCommentDTO{" +
            "id=" + getId() +
            ", date='" + getDate() + "'" +
            ", content='" + getContent() + "'" +
            ", isSolution='" + isIsSolution() + "'" +
            ", ticket=" + getTicketId() +
            ", owner=" + getOwnerId() +
            "}";
    }

    public String getOwnerUsername() {
        return ownerUsername;
    }

    public void setOwnerUsername(String ownerUsername) {
        this.ownerUsername = ownerUsername;
    }
}
