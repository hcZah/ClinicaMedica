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

    @SqlQuery("select * from TbMedico where CdUsuario = :CdUsuario;")
    Medico findByCdUsuario(@Bind("CdUsuario") int CdUsuario);

    @SqlQuery("select * from TbMedico where CRM = :CRM;")
    Medico findByCRM(@Bind("CRM") String CRM);

    @SqlUpdate("""
        insert into TbMedico (CdUsuario, CRM)
        values (:CdUsuario, :CRM);
    """)
    @GetGeneratedKeys
    int insert(@BindBean Medico medico);

    @SqlUpdate("""
        update TbMedico
        set CRM = :CRM,
        where CdUsuario = :CdUsuario;
    """)
    int update(@BindBean Medico medico);

    @SqlUpdate("""
        delete from TbMedico where CdUsuario = :CdUsuario;
    """)
    int delete(@Bind("CdUsuario") int CdUsuario);

}
