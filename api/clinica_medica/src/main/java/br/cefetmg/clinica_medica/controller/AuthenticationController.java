package br.cefetmg.clinica_medica.controller;

import br.cefetmg.clinica_medica.model.LoginRequest;
import br.cefetmg.clinica_medica.model.LoginResponse;
import br.cefetmg.clinica_medica.model.Usuario;
import br.cefetmg.clinica_medica.repository.MedicoRepository;
import br.cefetmg.clinica_medica.repository.PacienteRepository;
import br.cefetmg.clinica_medica.service.AuthorizationService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/auth")
@RequiredArgsConstructor
public class AuthenticationController {
    private final AuthenticationManager authenticationManager;
    private final AuthorizationService authorizationService;
    private final PasswordEncoder passwordEncoder;
    private final MedicoRepository medicoRepository;
    private final PacienteRepository pacienteRepository;

    @PostMapping(value = "/login", consumes = {"application/json"})
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest data, HttpServletRequest request) {
        LoginResponse loginResponse = authorizationService.login(data, request, authenticationManager);
        return ResponseEntity.ok().body(loginResponse);
    }


    @PostMapping(value = "/register", consumes = {"application/json"})
    public ResponseEntity<Usuario> register(@RequestBody Usuario data) {
        Usuario usuario = authorizationService.register(data);
        return ResponseEntity.ok().body(usuario);
    }

    @PostMapping(value = "/encodepwd/{pwd}")
    public ResponseEntity<String> getEncondePwd(@PathVariable String pwd){
        var password = passwordEncoder.encode(pwd);
        return ResponseEntity.ok().body(password);
    }

    @GetMapping(value="/getType/{cdUsuario}")
    public ResponseEntity<String> getTipoUsuario(@PathVariable int cdUsuario) {
        var testeMedico = medicoRepository.findByCdUsuario(cdUsuario);
        if (testeMedico != null)
            return ResponseEntity.ok().body("medico");

        var testePaciente = pacienteRepository.findByCdUsuario(cdUsuario);
        if (testePaciente != null)
            return ResponseEntity.ok().body("paciente");

        return ResponseEntity.ok().body("admin");
    }
}
