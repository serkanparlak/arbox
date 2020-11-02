package tr.com.aurora.arge.service.mapper;

import tr.com.aurora.arge.domain.*;
import tr.com.aurora.arge.service.dto.ArbCommentDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link ArbComment} and its DTO {@link ArbCommentDTO}.
 */
@Mapper(componentModel = "spring", uses = {ArbTicketMapper.class, UserMapper.class})
public interface ArbCommentMapper extends EntityMapper<ArbCommentDTO, ArbComment> {

    @Mapping(source = "ticket.id", target = "ticketId")
    @Mapping(source = "owner.id", target = "ownerId")
    @Mapping(source = "owner.login", target = "ownerUsername")
    ArbCommentDTO toDto(ArbComment arbComment);

    @Mapping(source = "ticketId", target = "ticket")
    @Mapping(source = "ownerId", target = "owner")
    ArbComment toEntity(ArbCommentDTO arbCommentDTO);

    default ArbComment fromId(Long id) {
        if (id == null) {
            return null;
        }
        ArbComment arbComment = new ArbComment();
        arbComment.setId(id);
        return arbComment;
    }
}
