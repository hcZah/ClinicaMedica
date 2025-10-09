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

    @SqlQuery("select * from TbPaciente where CdUsuario = :CdUsuario;")
    Paciente findByCdUsuario(@Bind("CdUsuario") int CdUsuario);

    @SqlUpdate("""
        insert into TbPaciente (CdUsuario, Endereco, Telefone)
        values (:CdUsuario, :Endereco, :Telefone);
    """)
    @GetGeneratedKeys
    int insert(@BindBean Paciente paciente);

    @SqlUpdate("""
        update TbPaciente
        set Endereco = :Endereco,
            Telefone = :Telefone,
        where CdUsuario = :CdUsuario;
    """)
    int update(@BindBean Paciente paciente);

    @SqlUpdate("""
        delete from TbPaciente where CdUsuario = :CdUsuario;
    """)
    int delete(@Bind("CdUsuario") int CdUsuario);

}

