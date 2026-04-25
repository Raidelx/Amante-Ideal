package com.comunidad.tours.controller;

import com.comunidad.tours.business.TourService;
import com.comunidad.tours.dto.CreateTourRequest;
import com.comunidad.tours.model.Tour;
import io.micronaut.http.HttpResponse;
import io.micronaut.http.annotation.Body;
import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Get;
import io.micronaut.http.annotation.Post;
import io.micronaut.validation.Validated;
import jakarta.validation.Valid;

import java.util.List;

@Validated
@Controller("/tours")
public class TourController {

    private final TourService tourService;

    public TourController(TourService tourService) {
        this.tourService = tourService;
    }

    // Endpoint de escritura: recibe un tour nuevo y lo guarda en la BD del servicio.
    @Post
    public HttpResponse<Tour> crearTour(@Body @Valid CreateTourRequest request) {
        Tour tourCreado = tourService.crearTour(request);
        return HttpResponse.created(tourCreado);
    }

    // Endpoint de lectura: devuelve todos los tours publicados.
    @Get
    public List<Tour> listarTours() {
        return tourService.listarTours();
    }
}
