package br.cefetmg.clinica_medica.repository;

import br.cefetmg.clinica_medica.model.Paciente;
import org.jdbi.v3.sqlobject.config.RegisterBeanMapper;
import org.jdbi.v3.sqlobject.customizer.Bind;
import org.jdbi.v3.sqlobject.customizer.BindBean;
import org.jdbi.v3.sqlobject.statement.GetGeneratedKeys;
import org.jdbi.v3.sqlobject.statement.SqlQuery;
import org.jdbi.v3.sqlobject.statement.SqlUpdate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RegisterBeanMapper(Paciente.class)
public interface PacienteRepository {

    @SqlQuery("select * from TbPaciente;")
    List<Paciente> findAll();

    @SqlQuery("select * from TbPaciente where CdPaciente = :CdPaciente;")
    Paciente findByCdPaciente(@Bind("CdPaciente") int CdPaciente);

    @SqlUpdate("""
        insert into TbPaciente (nome, cpf, email, senha)
        values (:NmPaciente, :CPF, :Email, :Senha);
    """)
    @GetGeneratedKeys
    int insert(@BindBean Paciente paciente);

    @SqlUpdate("""
        update TbPaciente
        set nome = :NmPaciente,
            cpf = :CPF,
            email = :Email,
            senha = :Senha
        where CdPaciente = :CdPaciente;
    """)
    int update(@BindBean Paciente paciente);

    @SqlUpdate("""
        delete from TbPaciente where CdPaciente = :CdPaciente;
    """)
    int delete(@Bind("CdPaciente") int CdPaciente);

}

