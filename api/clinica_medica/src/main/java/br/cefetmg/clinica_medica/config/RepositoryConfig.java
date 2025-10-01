package br.cefetmg.clinica_medica.config;

import br.cefetmg.clinica_medica.repository.MedicoRepository;
import br.cefetmg.clinica_medica.repository.ConsultaRepository;
import org.jdbi.v3.core.Jdbi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RepositoryConfig {
    @Bean
    public MedicoRepository getMedico(Jdbi jdbi) {
        return jdbi.onDemand(MedicoRepository.class);
    }
    
    @Bean
    public ConsultaRepository getConsulta(Jdbi jdbi) {
        return jdbi.onDemand(ConsultaRepository.class);
    }
}
