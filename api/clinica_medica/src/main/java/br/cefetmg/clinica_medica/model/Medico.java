package br.cefetmg.clinica_medica.model;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Medico {
    private int CdMedico;
    private String nome;
    private String email;
    private String endereço;
    private String senha;
}
