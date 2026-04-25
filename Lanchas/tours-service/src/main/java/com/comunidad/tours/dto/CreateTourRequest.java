package com.comunidad.tours.dto;

import io.micronaut.serde.annotation.Serdeable;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

@Serdeable
public record CreateTourRequest(
        @NotBlank String nombre,
        @NotBlank String ubicacion,
        @NotNull @DecimalMin("0.0") BigDecimal precio
) {
}
