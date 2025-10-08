package br.cefetmg.clinica_medica.controller;

import br.cefetmg.clinica_medica.model.Paciente;
import br.cefetmg.clinica_medica.repository.PacienteRepository;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@CrossOrigin(origins ="localhost:8100")
@RestController
@RequestMapping("/paciente") //http://localhost:8080/api/v1/paciente
public class PacienteController {

private final PacienteRepository pacienteRepository;

    public PacienteController(PacienteRepository pacienteRepository) {
        this.pacienteRepository = pacienteRepository;
    }
       @GetMapping("/{CdUsuario}")
    public ResponseEntity<Paciente> getByCdUsuario(@PathVariable int CdUsuario) {
        Paciente paciente = pacienteRepository.findByCdUsuario(CdUsuario);
        if (paciente != null) {
            return ResponseEntity.ok().body(paciente);
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @GetMapping({"","/"})
    public ResponseEntity<List<Paciente>> getAll() {
        List<Paciente> pacientes = pacienteRepository.findAll();
        return ResponseEntity.ok().body(pacientes);
    }

    @PostMapping({"","/"})
    public ResponseEntity<Paciente> create(@RequestBody Paciente paciente) {
        int CdUsuario = pacienteRepository.insert(paciente);
        paciente.setCdUsuario(CdUsuario);
        return ResponseEntity.ok().body(paciente);
    }

    @PutMapping({"","/"})
    public ResponseEntity<Paciente> update(@RequestBody Paciente paciente) {
        if (paciente.getCdUsuario() == 0) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Paciente not found");
        }

        int qtd = pacienteRepository.update(paciente);

        if (qtd == 0) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Nenhum Paciente alterado");
        }
        if (qtd > 1) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Foi alterado mais de 1 Paciente.");
        }

        return ResponseEntity.ok().body(paciente);
    }

    @DeleteMapping("/{CdUsuario}")
    public ResponseEntity<Paciente> delete(@PathVariable int CdUsuario) {
        if (CdUsuario == 0) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "CdUsuario do Paciente nao encontrado");
        }

        Paciente paciente = pacienteRepository.findByCdUsuario(CdUsuario);
        if (paciente == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Paciente nao encontrado");
        }

        int qtd = pacienteRepository.delete(CdUsuario);

        if (qtd == 0) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Nenhum Paciente excluido.");
        }
        if (qtd > 1) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Foi excluido mais de 1 Paciente.");
        }

        return ResponseEntity.ok().body(paciente);
    }
}