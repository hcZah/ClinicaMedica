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
@RequestMapping("/api/v1/medico") //http://localhost:8080/api/v1/medico
public class MedicoController {

private final MedicoRepository medicoRepository;

    public MedicoController(MedicoRepository medicoRepository) {
        this.medicoRepository = medicoRepository;
    }
       @GetMapping("/{CdMedico}")
    public ResponseEntity<Medico> getByCdMedico(@PathVariable int CdMedico) {
        Medico medico = medicoRepository.findByCdMedico(CdMedico);
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
        int CdMedico = medicoRepository.insert(medico);
        medico.setCdMedico(CdMedico);
        return ResponseEntity.ok().body(medico);
    }

    @PutMapping({"","/"})
    public ResponseEntity<Medico> update(@RequestBody Medico medico) {
        if (medico.getCdMedico() == 0) {
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

    @DeleteMapping("/{CdMedico}")
    public ResponseEntity<Medico> delete(@PathVariable int CdMedico) {
        if (CdMedico == 0) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "CdMedico do Medico nao encontrado");
        }

        Medico medico = medicoRepository.findByCdMedico(CdMedico);
        if (medico == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Medico nao encontrado");
        }

        int qtd = medicoRepository.delete(CdMedico);

        if (qtd == 0) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Nenhum Medico excluCdMedicoo.");
        }
        if (qtd > 1) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Foi excluCdMedicoo mais de 1 Medico.");
        }

        return ResponseEntity.ok().body(medico);
    }
}