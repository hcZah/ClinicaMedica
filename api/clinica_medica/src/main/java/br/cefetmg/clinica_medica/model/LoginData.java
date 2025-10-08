package br.cefetmg.clinica_medica.model;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoginData {
    private String email;
    private String senha;
}
