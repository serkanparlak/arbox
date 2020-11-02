package tr.com.aurora.arge.web.rest.vm;

import java.util.Objects;

public class TicketVM {

    private Long Id;
    private String name;

    public TicketVM(){
    }

    public TicketVM(Long id, String name) {
        Id = id;
        this.name = name;
    }


    public Long getId() {
        return Id;
    }

    public void setId(Long id) {
        Id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof TicketVM)) return false;
        TicketVM ticketVM = (TicketVM) o;
        return Objects.equals(getId(), ticketVM.getId()) &&
            Objects.equals(getName(), ticketVM.getName());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getName());
    }

    @Override
    public String toString() {
        return "TicketVM{" +
            "Id=" + Id +
            ", name='" + name + '\'' +
            '}';
    }
}
