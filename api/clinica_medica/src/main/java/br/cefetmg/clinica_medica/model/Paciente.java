package br.cefetmg.clinica_medica.model;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Paciente {
    private int cdUsuario;
    private String Endereco;
    private String Telefone;
}
