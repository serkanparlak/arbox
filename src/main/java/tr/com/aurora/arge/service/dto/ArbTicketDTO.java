package tr.com.aurora.arge.service.dto;
import java.time.Instant;
import java.io.Serializable;
import java.util.Objects;
import tr.com.aurora.arge.domain.enumeration.Priority;

/**
 * A DTO for the {@link tr.com.aurora.arge.domain.ArbTicket} entity.
 */
public class ArbTicketDTO implements Serializable {

    private Long id;

    private Priority priority;

    private Boolean state;

    private String subject;

    private String description;

    private Instant date;


    private Long ownerId;

    private String ownerUsername; // user.login

    private Long assigneeId;

    private String assigneeUsername; // user.login

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Priority getPriority() {
        return priority;
    }

    public void setPriority(Priority priority) {
        this.priority = priority;
    }

    public Boolean isState() {
        return state;
    }

    public void setState(Boolean state) {
        this.state = state;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Instant getDate() {
        return date;
    }

    public void setDate(Instant date) {
        this.date = date;
    }

    public Long getOwnerId() {
        return ownerId;
    }

    public void setOwnerId(Long userId) {
        this.ownerId = userId;
    }

    public Long getAssigneeId() {
        return assigneeId;
    }

    public void setAssigneeId(Long userId) {
        this.assigneeId = userId;
    }

    public String getOwnerUsername() {
        return ownerUsername;
    }

    public void setOwnerUsername(String ownerUsername) {
        this.ownerUsername = ownerUsername;
    }

    public String getAssigneeUsername() {
        return assigneeUsername;
    }

    public void setAssigneeUsername(String assigneeUsername) {
        this.assigneeUsername = assigneeUsername;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        ArbTicketDTO arbTicketDTO = (ArbTicketDTO) o;
        if (arbTicketDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), arbTicketDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ArbTicketDTO{" +
            "id=" + getId() +
            ", priority='" + getPriority() + "'" +
            ", state='" + isState() + "'" +
            ", subject='" + getSubject() + "'" +
            ", description='" + getDescription() + "'" +
            ", date='" + getDate() + "'" +
            ", owner=" + getOwnerId() +
            ", assignee=" + getAssigneeId() +
            "}";
    }
}
