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

    @SqlQuery("select * from TbUsuario where CdUsuario = :cdUsuario;")
    Usuario findByCdUsuario(@Bind("cdUsuario") int cdUsuario);

    @SqlQuery("select * from TbUsuario where Email = :email;")
    Usuario getByEmail(@Bind("email") String email);


    @SqlQuery("select * from TbUsuario where Email = :email and Senha = :senha;")
    Usuario auth(@Bind("email") String email, @Bind("senha") String senha);

    @SqlUpdate("""
        insert into TbUsuario (NmUsuario, CPF, email, senha)
        values (:nmUsuario, :cpf, :email, :senha);
    """)
    @GetGeneratedKeys
    int insert(@BindBean Usuario usuario);

    @SqlUpdate("""
        update TbUsuario
        set NmUsuario = :nmUsuario,
            CPF = :cpf,
            Email = :email,
            Senha = :senha
        where CdUsuario = :cdUsuario;
    """)
    int update(@BindBean Usuario usuario);

    @SqlUpdate("""
        delete from TbUsuario where CdUsuario = :CdUsuario;
    """)
    int delete(@Bind("CdUsuario") int CdUsuario);


}

