/*
 * Copyright (c): it@M - Dienstleister für Informations- und Telekommunikationstechnik
 * der Landeshauptstadt München, 2020
 */
package de.muenchen.beispielprojekt.rest;

import de.muenchen.beispielprojekt.domain.Team;
import java.util.Optional;
import java.util.UUID;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.security.access.prepost.PreAuthorize;

/**
 * Provides a Repository for {@link Team}. This Repository is exported as a REST resource.
 *
 * <p>
 * The Repository handles CRUD Operations. Every Operation is secured and takes care of the
 * tenancy. For specific Documentation on how the generated REST point behaves, please consider the
 * Spring Data Rest Reference <a href=
 * "http://docs.spring.io/spring-data/rest/docs/current/reference/html/">here</a>.
 */
@RepositoryRestResource
@PreAuthorize("hasAuthority(T(de.muenchen.beispielprojekt.security.AuthoritiesEnum).BEISPIELPROJEKT_BACKEND_READ_TEAM.name())")
public interface TeamRepository extends PagingAndSortingRepository<Team, UUID>, CrudRepository<Team, UUID> { // NOSONAR
    /** Name for the specific cache. */
    String CACHE = "Team_CACHE";

    /**
     * Get one specific {@link Team} by its unique id.
     *
     * @param id The identifier of the {@link Team}.
     * @return The {@link Team} with the requested id.
     */
    @Override
    @Cacheable(value = CACHE, key = "#p0")
    Optional<Team> findById(UUID id);

    /**
     * Create or update a {@link Team}.
     *
     * <p>
     * If the id already exists, the {@link Team} will be overridden, hence update. If the id
     * does not already exist, a new {@link Team} will be created, hence create.
     *
     * @param Team The {@link Team} that will be saved.
     * @return the saved {@link Team}.
     */
    @Override
    @CachePut(value = CACHE, key = "#p0.id")
    @PreAuthorize("hasAuthority(T(de.muenchen.beispielprojekt.security.AuthoritiesEnum).BEISPIELPROJEKT_BACKEND_WRITE_TEAM.name())")
    <S extends Team> S save(S Team);

    /**
     * Create or update a collection of {@link Team}.
     *
     * <p>
     * If the id already exists, the {@link Team}s will be overridden, hence update. If the id
     * does not already exist, the new {@link Team}s will be created, hence create.
     *
     * @param entities The {@link Team} that will be saved.
     * @return the collection saved {@link Team}.
     */
    @Override
    @PreAuthorize("hasAuthority(T(de.muenchen.beispielprojekt.security.AuthoritiesEnum).BEISPIELPROJEKT_BACKEND_WRITE_TEAM.name())")
    <S extends Team> Iterable<S> saveAll(Iterable<S> entities);

    /**
     * Delete the {@link Team} by a specified id.
     *
     * @param id the unique id of the {@link Team} that will be deleted.
     */
    @Override
    @CacheEvict(value = CACHE, key = "#p0")
    @PreAuthorize("hasAuthority(T(de.muenchen.beispielprojekt.security.AuthoritiesEnum).BEISPIELPROJEKT_BACKEND_DELETE_TEAM.name())")
    void deleteById(UUID id);

    /**
     * Delete a {@link Team} by entity.
     *
     * @param entity The {@link Team} that will be deleted.
     */
    @Override
    @CacheEvict(value = CACHE, key = "#p0.id")
    @PreAuthorize("hasAuthority(T(de.muenchen.beispielprojekt.security.AuthoritiesEnum).BEISPIELPROJEKT_BACKEND_DELETE_TEAM.name())")
    void delete(Team entity);

    /**
     * Delete multiple {@link Team} entities by their id.
     *
     * @param entities The Iterable of {@link Team} that will be deleted.
     */
    @Override
    @CacheEvict(value = CACHE, allEntries = true)
    @PreAuthorize("hasAuthority(T(de.muenchen.beispielprojekt.security.AuthoritiesEnum).BEISPIELPROJEKT_BACKEND_DELETE_TEAM.name())")
    void deleteAll(Iterable<? extends Team> entities);

    /** Delete all {@link Team} entities. */
    @Override
    @CacheEvict(value = CACHE, allEntries = true)
    @PreAuthorize("hasAuthority(T(de.muenchen.beispielprojekt.security.AuthoritiesEnum).BEISPIELPROJEKT_BACKEND_DELETE_TEAM.name())")
    void deleteAll();
}
