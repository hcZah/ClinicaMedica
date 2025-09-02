package br.cefetmg.clinica_medica.repository;

import br.cefetmg.clinica_medica.model.Medico;
import org.jdbi.v3.sqlobject.config.RegisterBeanMapper;
import org.jdbi.v3.sqlobject.customizer.Bind;
import org.jdbi.v3.sqlobject.customizer.BindBean;
import org.jdbi.v3.sqlobject.statement.GetGeneratedKeys;
import org.jdbi.v3.sqlobject.statement.SqlQuery;
import org.jdbi.v3.sqlobject.statement.SqlUpdate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RegisterBeanMapper(Medico.class)
public interface MedicoRepository {

    @SqlQuery("select * from TbMedico;")
    List<Medico> findAll();

    @SqlQuery("select * from TbMedico where CdMedico = :CdMedico;")
    Medico findByCdMedico(@Bind("CdMedico") int CdMedico);

    @SqlUpdate("""
        insert into TbMedico (nome, cpf, email, senha)
        values (:NmMedico, :CPF, :Email, :Senha);
    """)
    @GetGeneratedKeys
    int insert(@BindBean Medico medico);

    @SqlUpdate("""
        update TbMedico
        set nome = :NmMedico,
            cpf = :CPF,
            email = :Email,
            senha = :Senha
        where CdMedico = :CdMedico;
    """)
    int update(@BindBean Medico medico);

    @SqlUpdate("""
        delete from TbMedico where CdMedico = :CdMedico;
    """)
    int delete(@Bind("CdMedico") int CdMedico);

}
