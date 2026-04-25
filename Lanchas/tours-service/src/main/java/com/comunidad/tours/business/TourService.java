package com.comunidad.tours.business;

import com.comunidad.tours.dto.CreateTourRequest;
import com.comunidad.tours.model.Tour;
import com.comunidad.tours.repository.TourRepository;
import jakarta.inject.Singleton;

import java.util.List;

@Singleton
public class TourService {

    private final TourRepository tourRepository;

    public TourService(TourRepository tourRepository) {
        this.tourRepository = tourRepository;
    }

    // Convierte el request en entidad de dominio y persiste con repository.
    public Tour crearTour(CreateTourRequest request) {
        Tour tour = new Tour(request.nombre(), request.ubicacion(), request.precio());
        return tourRepository.save(tour);
    }

    // Lee todos los tours desde la BD del microservicio.
    public List<Tour> listarTours() {
        return (List<Tour>) tourRepository.findAll();
    }
}
