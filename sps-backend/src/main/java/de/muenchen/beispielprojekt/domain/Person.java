package de.muenchen.beispielprojekt.domain;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Transient;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
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
public class Person extends BaseEntity {
    private static final long serialVersionUID = 1L;

    @Column(name = "firstname", nullable = false)
    @NotNull
    private String firstname;

    @Column(name = "lastname", nullable = false)
    @NotNull
    private String lastname;

    @Column(name = "email", nullable = false)
    @NotNull
    @Email
    private String email;

    @ManyToOne(cascade = CascadeType.DETACH)
    @JoinColumn(name = "team_id")
    private Team team;

    @Transient
    public String getFullname() {
        return this.firstname + " " + this.lastname;
    }
}
