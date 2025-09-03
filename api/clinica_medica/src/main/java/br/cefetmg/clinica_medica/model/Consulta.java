package br.cefetmg.clinica_medica.model;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Consulta {
    private int cdConsulta;
    private int cdAgendamento;
    private String descricao;
}
