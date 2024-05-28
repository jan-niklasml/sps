/*
 * Copyright (c): it@M - Dienstleister für Informations- und Telekommunikationstechnik
 * der Landeshauptstadt München, 2023
 */
package de.muenchen.beispielprojekt.security;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.security.access.prepost.PreAuthorize;

/**
 * Each possible authority in this project is represented by an enum. The enums are used within the
 * {@link PagingAndSortingRepository} in the annotation e.g. {@link PreAuthorize}.
 */
public enum AuthoritiesEnum {
    BEISPIELPROJEKT_BACKEND_READ_PERSON, BEISPIELPROJEKT_BACKEND_WRITE_PERSON, BEISPIELPROJEKT_BACKEND_DELETE_PERSON, BEISPIELPROJEKT_BACKEND_READ_TEAM, BEISPIELPROJEKT_BACKEND_WRITE_TEAM, BEISPIELPROJEKT_BACKEND_DELETE_TEAM
    // add your authorities here and also add these new authorities to
    // sso-authorisation.json.
}
