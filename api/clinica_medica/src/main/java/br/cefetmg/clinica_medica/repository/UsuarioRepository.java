package br.cefetmg.clinica_medica.repository;

import br.cefetmg.clinica_medica.model.Usuario;
import org.jdbi.v3.sqlobject.config.RegisterBeanMapper;
import org.jdbi.v3.sqlobject.customizer.Bind;
import org.jdbi.v3.sqlobject.customizer.BindBean;
import org.jdbi.v3.sqlobject.statement.GetGeneratedKeys;
import org.jdbi.v3.sqlobject.statement.SqlQuery;
import org.jdbi.v3.sqlobject.statement.SqlUpdate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RegisterBeanMapper(Usuario.class)
public interface UsuarioRepository {

    @SqlQuery("select * from TbUsuario;")
    List<Usuario> findAll();

    @SqlQuery("select * from TbUsuario where CdUsuario = :CdUsuario;")
    Usuario findByCdUsuario(@Bind("CdUsuario") int CdUsuario);

    @SqlQuery("select * from TbUsuario where Email = :Email;")
    Usuario getByEmail(@Bind("Email") String Email);


    @SqlQuery("select * from TbUsuario where Email = :Email and Senha = :Senha;")
    Usuario auth(@Bind("Email") String email, @Bind("Senha") String senha);

    @SqlUpdate("""
        insert into TbUsuario (NmUsuario, CPF, email, senha)
        values (:NmUsuario, :CPF, :Email, :Senha);
    """)
    @GetGeneratedKeys
    int insert(@BindBean Usuario usuario);

    @SqlUpdate("""
        update TbUsuario
        set NmUsuario = :NmUsuario,
            CPF = :CPF,
            Email = :Email,
            Senha = :Senha
        where CdUsuario = :CdUsuario;
    """)
    int update(@BindBean Usuario usuario);

    @SqlUpdate("""
        delete from TbUsuario where CdUsuario = :CdUsuario;
    """)
    int delete(@Bind("CdUsuario") int CdUsuario);


}

