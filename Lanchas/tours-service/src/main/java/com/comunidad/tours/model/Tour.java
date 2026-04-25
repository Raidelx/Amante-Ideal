package com.comunidad.tours.model;

import io.micronaut.serde.annotation.Serdeable;
import io.micronaut.data.annotation.GeneratedValue;
import io.micronaut.data.annotation.Id;
import io.micronaut.data.annotation.MappedEntity;

import java.math.BigDecimal;

@Serdeable
@MappedEntity("tours")
public class Tour {

    @Id
    @GeneratedValue
    private Long id;

    private String nombre;
    private String ubicacion;
    private BigDecimal precio;

    public Tour() {
    }

    public Tour(String nombre, String ubicacion, BigDecimal precio) {
        this.nombre = nombre;
        this.ubicacion = ubicacion;
        this.precio = precio;
    }

    public Long getId() {
        return id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getUbicacion() {
        return ubicacion;
    }

    public void setUbicacion(String ubicacion) {
        this.ubicacion = ubicacion;
    }

    public BigDecimal getPrecio() {
        return precio;
    }

    public void setPrecio(BigDecimal precio) {
        this.precio = precio;
    }
}
