package br.cefetmg.clinica_medica.controller;

import br.cefetmg.clinica_medica.model.LoginRequest;
import br.cefetmg.clinica_medica.model.LoginResponse;
import br.cefetmg.clinica_medica.model.Usuario;
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
public class AuthController {
    private final AuthenticationManager authenticationManager;
    private final AuthorizationService authorizationService;
    private final PasswordEncoder passwordEncoder;

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

}
