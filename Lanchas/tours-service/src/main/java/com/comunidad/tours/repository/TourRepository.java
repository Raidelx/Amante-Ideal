package com.comunidad.tours.repository;

import com.comunidad.tours.model.Tour;
import io.micronaut.data.jdbc.annotation.JdbcRepository;
import io.micronaut.data.model.query.builder.sql.Dialect;
import io.micronaut.data.repository.CrudRepository;

@JdbcRepository(dialect = Dialect.POSTGRES)
public interface TourRepository extends CrudRepository<Tour, Long> {
}
