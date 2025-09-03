package br.cefetmg.clinica_medica.repository;

import br.cefetmg.clinica_medica.model.Consulta;
import org.jdbi.v3.sqlobject.config.RegisterBeanMapper;
import org.jdbi.v3.sqlobject.customizer.Bind;
import org.jdbi.v3.sqlobject.customizer.BindBean;
import org.jdbi.v3.sqlobject.statement.GetGeneratedKeys;
import org.jdbi.v3.sqlobject.statement.SqlQuery;
import org.jdbi.v3.sqlobject.statement.SqlUpdate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RegisterBeanMapper(Consulta.class)
public interface ConsultaRepository {

    @SqlQuery("select * from TbConsulta;")
    List<Consulta> findAll();

    @SqlQuery("select * from TbConsulta where CdConsulta = :cdConsulta;")
    Consulta findByCdConsulta(@Bind("cdConsulta") int cdConsulta);

    @SqlUpdate("""
        insert into TbConsulta (CdAgendamento, Descricao)
        values (:cdAgendamento, :descricao);
    """)
    @GetGeneratedKeys
    int insert(@BindBean Consulta consulta);

    @SqlUpdate("""
        update TbConsulta
        set CdAgendamento = :cdAgendamento,
            Descricao = :descricao
        where CdConsulta = :cdConsulta;
    """)
    int update(@BindBean Consulta consulta);

    @SqlUpdate("""
        delete from TbConsulta where CdConsulta = :cdConsulta;
    """)
    int delete(@Bind("cdConsulta") int cdConsulta);

}

