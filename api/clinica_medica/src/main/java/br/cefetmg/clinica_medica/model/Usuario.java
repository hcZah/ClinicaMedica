package br.cefetmg.clinica_medica.model;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Usuario implements UserDetails {
    private int CdUsuario;
    private String NmUsuario;
    private String CPF;
    private String Email;
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String Senha;

     @JsonIgnore
    @Override
    public String getPassword() {
        return this.Senha;
    }

    @JsonIgnore
    @Override
    public String getUsername() {
        return this.Email;
    }


    public String getPrimeiroNome(){
        String [] nomes = this.NmUsuario.split(" ");
        if(nomes.length > 1){
            return nomes[0];
        }
        return this.NmUsuario;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        throw new UnsupportedOperationException("Unimplemented method 'getAuthorities'");
    }
}
