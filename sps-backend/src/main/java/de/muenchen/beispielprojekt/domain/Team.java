package de.muenchen.beispielprojekt.domain;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@ToString(callSuper = true)
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
public class Team extends BaseEntity {
    private static final long serialVersionUID = 1L;

    @Column(name = "name")
    @NotNull
    private String name;

    @Column(name = "identifier_string")
    @NotNull
    private String identifierString;

    @ManyToOne(targetEntity = Person.class, cascade = CascadeType.DETACH)
    @JoinColumn(name = "teamleader_id")
    private Person teamleader;

    @OneToMany(fetch = FetchType.EAGER, mappedBy = "team", cascade = CascadeType.DETACH)
    private List<Person> members = new ArrayList<>();
}
