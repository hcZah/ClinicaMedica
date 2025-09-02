package br.cefetmg.clinica_medica.controller;

import br.cefetmg.clinica_medica.model.Consulta;
import br.cefetmg.clinica_medica.repository.ConsultaRepository;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/v1/consulta") //http://localhost:8080/api/v1/consulta
public class ConsultaController {
private final ConsultaRepository consultaRepository;

    public ConsultaController(ConsultaRepository consultaRepository) {
        this.consultaRepository = consultaRepository;
    }

    @GetMapping("/{CdConsulta}")
    public ResponseEntity<Consulta> getByCdConsulta(@PathVariable int CdConsulta) {
        Consulta consulta = consultaRepository.findByCdConsulta(CdConsulta);
        if (consulta != null) {
            return ResponseEntity.ok().body(consulta);
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @GetMapping({"","/"})
    public ResponseEntity<List<Consulta>> getAll() {
        List<Consulta> consultas = consultaRepository.findAll();
        return ResponseEntity.ok().body(consultas);
    }

    @PostMapping({"","/"})
    public ResponseEntity<Consulta> create(@RequestBody Consulta consulta) {
        int CdConsulta = consultaRepository.insert(consulta);
        consulta.setCdConsulta(CdConsulta);
        return ResponseEntity.ok().body(consulta);
    }

    @PutMapping({"","/"})
    public ResponseEntity<Consulta> update(@RequestBody Consulta consulta) {
        if (consulta.getCdConsulta() == 0) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "consulta not found");
        }

        int qtd = consultaRepository.update(consulta);

        if (qtd == 0) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Nenhuma consulta alterado");
        }
        if (qtd > 1) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Foi alterada mais de 1 consulta.");
        }

        return ResponseEntity.ok().body(consulta);
    }

    @DeleteMapping("/{CdConsulta}")
    public ResponseEntity<Consulta> delete(@PathVariable int CdConsulta) {
        if (CdConsulta == 0) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Id da consulta nao encontrado");
        }

        Consulta consulta = consultaRepository.findByCdConsulta(CdConsulta);
        if (consulta == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "consulta nao encontrada");
        }

        int qtd = consultaRepository.delete(CdConsulta);

        if (qtd == 0) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Nenhuma consulta excluCdConsultaa.");
        }
        if (qtd > 1) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Foi excluCdConsultaa mais de 1 consulta.");
        }

        return ResponseEntity.ok().body(consulta);
    }
}