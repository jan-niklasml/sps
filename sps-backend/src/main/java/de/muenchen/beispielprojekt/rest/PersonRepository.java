/*
 * Copyright (c): it@M - Dienstleister für Informations- und Telekommunikationstechnik
 * der Landeshauptstadt München, 2020
 */
package de.muenchen.beispielprojekt.rest;

import de.muenchen.beispielprojekt.domain.Person;
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
 * Provides a Repository for {@link Person}. This Repository is exported as a REST resource.
 *
 * <p>
 * The Repository handles CRUD Operations. Every Operation is secured and takes care of the
 * tenancy. For specific Documentation on how the generated REST point behaves, please consider the
 * Spring Data Rest Reference <a href=
 * "http://docs.spring.io/spring-data/rest/docs/current/reference/html/">here</a>.
 */
@RepositoryRestResource(path = "people", collectionResourceRel = "people")
@PreAuthorize("hasAuthority(T(de.muenchen.beispielprojekt.security.AuthoritiesEnum).BEISPIELPROJEKT_BACKEND_READ_PERSON.name())")
public interface PersonRepository extends PagingAndSortingRepository<Person, UUID>, CrudRepository<Person, UUID> { // NOSONAR
    /** Name for the specific cache. */
    String CACHE = "Person_CACHE";

    /**
     * Get one specific {@link Person} by its unique id.
     *
     * @param id The identifier of the {@link Person}.
     * @return The {@link Person} with the requested id.
     */
    @Override
    @Cacheable(value = CACHE, key = "#p0")
    Optional<Person> findById(UUID id);

    /**
     * Create or update a {@link Person}.
     *
     * <p>
     * If the id already exists, the {@link Person} will be overridden, hence update. If the id
     * does not already exist, a new {@link Person} will be created, hence create.
     *
     * @param Person The {@link Person} that will be saved.
     * @return the saved {@link Person}.
     */
    @Override
    @CachePut(value = CACHE, key = "#p0.id")
    @PreAuthorize("hasAuthority(T(de.muenchen.beispielprojekt.security.AuthoritiesEnum).BEISPIELPROJEKT_BACKEND_WRITE_PERSON.name())")
    <S extends Person> S save(S Person);

    /**
     * Create or update a collection of {@link Person}.
     *
     * <p>
     * If the id already exists, the {@link Person}s will be overridden, hence update. If the id does
     * not already exist, the new {@link Person}s will be
     * created, hence create.
     *
     * @param entities The {@link Person} that will be saved.
     * @return the collection saved {@link Person}.
     */
    @Override
    @PreAuthorize("hasAuthority(T(de.muenchen.beispielprojekt.security.AuthoritiesEnum).BEISPIELPROJEKT_BACKEND_WRITE_PERSON.name())")
    <S extends Person> Iterable<S> saveAll(Iterable<S> entities);

    /**
     * Delete the {@link Person} by a specified id.
     *
     * @param id the unique id of the {@link Person} that will be deleted.
     */
    @Override
    @CacheEvict(value = CACHE, key = "#p0")
    @PreAuthorize("hasAuthority(T(de.muenchen.beispielprojekt.security.AuthoritiesEnum).BEISPIELPROJEKT_BACKEND_DELETE_PERSON.name())")
    void deleteById(UUID id);

    /**
     * Delete a {@link Person} by entity.
     *
     * @param entity The {@link Person} that will be deleted.
     */
    @Override
    @CacheEvict(value = CACHE, key = "#p0.id")
    @PreAuthorize("hasAuthority(T(de.muenchen.beispielprojekt.security.AuthoritiesEnum).BEISPIELPROJEKT_BACKEND_DELETE_PERSON.name())")
    void delete(Person entity);

    /**
     * Delete multiple {@link Person} entities by their id.
     *
     * @param entities The Iterable of {@link Person} that will be deleted.
     */
    @Override
    @CacheEvict(value = CACHE, allEntries = true)
    @PreAuthorize("hasAuthority(T(de.muenchen.beispielprojekt.security.AuthoritiesEnum).BEISPIELPROJEKT_BACKEND_DELETE_PERSON.name())")
    void deleteAll(Iterable<? extends Person> entities);

    /** Delete all {@link Person} entities. */
    @Override
    @CacheEvict(value = CACHE, allEntries = true)
    @PreAuthorize("hasAuthority(T(de.muenchen.beispielprojekt.security.AuthoritiesEnum).BEISPIELPROJEKT_BACKEND_DELETE_PERSON.name())")
    void deleteAll();
}
