package tr.com.aurora.arge.service.mapper;

import tr.com.aurora.arge.domain.*;
import tr.com.aurora.arge.service.dto.ArbTicketDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link ArbTicket} and its DTO {@link ArbTicketDTO}.
 */
@Mapper(componentModel = "spring", uses = {UserMapper.class})
public interface ArbTicketMapper extends EntityMapper<ArbTicketDTO, ArbTicket> {

    @Mapping(source = "owner.id", target = "ownerId")
    @Mapping(source = "assignee.id", target = "assigneeId")
    ArbTicketDTO toDto(ArbTicket arbTicket);

    @Mapping(source = "ownerId", target = "owner")
    @Mapping(source = "assigneeId", target = "assignee")
    ArbTicket toEntity(ArbTicketDTO arbTicketDTO);

    default ArbTicket fromId(Long id) {
        if (id == null) {
            return null;
        }
        ArbTicket arbTicket = new ArbTicket();
        arbTicket.setId(id);
        return arbTicket;
    }
}
