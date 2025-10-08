package br.cefetmg.clinica_medica.controller;

import br.cefetmg.clinica_medica.model.Medico;
import br.cefetmg.clinica_medica.repository.MedicoRepository;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@CrossOrigin(origins ="localhost:8100")
@RestController
@RequestMapping("/medico") //http://localhost:8080/api/v1/medico
public class MedicoController {

private final MedicoRepository medicoRepository;

    public MedicoController(MedicoRepository medicoRepository) {
        this.medicoRepository = medicoRepository;
    }
    @GetMapping("/{CdUsuario}")
    public ResponseEntity<Medico> getByCdUsuario(@PathVariable int CdUsuario) {
        Medico medico = medicoRepository.findByCdUsuario(CdUsuario);

        if (medico != null) {
            return ResponseEntity.ok().body(medico);
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @GetMapping({"","/"})
    public ResponseEntity<List<Medico>> getAll() {
        List<Medico> medicos = medicoRepository.findAll();
        return ResponseEntity.ok().body(medicos);
    }

    @PostMapping({"","/"})
    public ResponseEntity<Medico> create(@RequestBody Medico medico) {
        int CdUsuario = medicoRepository.insert(medico);
        medico.setCdUsuario(CdUsuario);
        return ResponseEntity.ok().body(medico);
    }

    @PutMapping({"","/"})
    public ResponseEntity<Medico> update(@RequestBody Medico medico) {
        if (medico.getCdUsuario() == 0) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Medico not found");
        }

        int qtd = medicoRepository.update(medico);

        if (qtd == 0) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Nenhum Medico alterado");
        }
        if (qtd > 1) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Foi alterado mais de 1 Medico.");
        }

        return ResponseEntity.ok().body(medico);
    }

    @DeleteMapping("/{CdUsuario}")
    public ResponseEntity<Medico> delete(@PathVariable int CdUsuario) {
        if (CdUsuario == 0) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "CdUsuario do Medico nao encontrado");
        }

        Medico medico = medicoRepository.findByCdUsuario(CdUsuario);
        if (medico == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Medico nao encontrado");
        }

        int qtd = medicoRepository.delete(CdUsuario);

        if (qtd == 0) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Nenhum Medico excluido.");
        }
        if (qtd > 1) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Foi excluido mais de 1 Medico.");
        }

        return ResponseEntity.ok().body(medico);
    }
}