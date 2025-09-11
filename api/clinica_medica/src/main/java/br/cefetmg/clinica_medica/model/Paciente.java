package br.cefetmg.clinica_medica.model;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Paciente {
    private int CdPaciente;
    private String nome;
    private String email;
    private String endereço;
    private String senha;
    private String telefone;
}
