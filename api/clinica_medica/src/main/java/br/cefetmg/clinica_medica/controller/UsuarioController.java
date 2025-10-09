package br.cefetmg.clinica_medica.controller;

import br.cefetmg.clinica_medica.model.Usuario;
import br.cefetmg.clinica_medica.repository.UsuarioRepository;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@CrossOrigin(origins ="localhost:8100")
@RestController
@RequestMapping("/api/usuario") //http://localhost:8080/api/usuario
public class UsuarioController {

private final UsuarioRepository usuarioRepository;

    public UsuarioController(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }
       @GetMapping("/{CdUsuario}")
    public ResponseEntity<Usuario> getByCdUsuario(@PathVariable int CdUsuario) {
        Usuario usuario = usuarioRepository.findByCdUsuario(CdUsuario);
        if (usuario != null) {
            return ResponseEntity.ok().body(usuario);
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @GetMapping({"","/"})
    public ResponseEntity<List<Usuario>> getAll() {
        List<Usuario> usuarios = usuarioRepository.findAll();
        return ResponseEntity.ok().body(usuarios);
    }
/*
    @PostMapping({"","/"})
    public ResponseEntity<Usuario> create(@RequestBody Usuario usuario) {
        int CdUsuario = usuarioRepository.insert(usuario);
        usuario.setCdUsuario(CdUsuario);
        return ResponseEntity.ok().body(usuario);
    }
*/
    @PutMapping({"","/"})
    public ResponseEntity<Usuario> update(@RequestBody Usuario usuario) {
        if (usuario.getCdUsuario() == 0) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuário não encontrado");
        }

        int qtd = usuarioRepository.update(usuario);

        if (qtd == 0) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Nenhum usuário foi alterado");
        }
        if (qtd > 1) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Foram alterados mais de 1 usuários.");
        }

        return ResponseEntity.ok().body(usuario);
    }

    @DeleteMapping("/{CdUsuario}")
    public ResponseEntity<Usuario> delete(@PathVariable int CdUsuario) {
        if (CdUsuario == 0) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "CdUsuario do usuário não encontrado");
        }

        Usuario usuario = usuarioRepository.findByCdUsuario(CdUsuario);
        if (usuario == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuário não encontrado");
        }

        int qtd = usuarioRepository.delete(CdUsuario);

        if (qtd == 0) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Nenhum usuário foi excluído.");
        }
        if (qtd > 1) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Foram excluídos mais de 1 usuários.");
        }

        return ResponseEntity.ok().body(usuario);
    }
}