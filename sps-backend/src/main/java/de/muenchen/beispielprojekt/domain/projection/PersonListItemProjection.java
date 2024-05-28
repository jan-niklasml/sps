package de.muenchen.beispielprojekt.domain.projection;

import de.muenchen.beispielprojekt.domain.Person;
import de.muenchen.beispielprojekt.domain.Team;
import java.util.UUID;
import org.springframework.data.rest.core.config.Projection;

@Projection(name = "personListItem", types = { Person.class })
public interface PersonListItemProjection {
    public UUID getId();

    public String getFirstname();

    public String getLastname();

    public String getEmail();

    public Team getTeam();
}
