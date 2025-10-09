package br.cefetmg.clinica_medica.model;

import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
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
    @JsonProperty("cdUsuario")
    private String cdUsuario;
    @JsonProperty("nmUsuario")
    private String nmUsuario;
    @JsonProperty("cpf")
    private String cpf;
    @JsonProperty("email")
    private String email;
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String senha;

    private String role;

    @JsonIgnore
    @Override
    public String getPassword() {
        return this.senha;
    }

    @JsonIgnore
    @Override
    public String getUsername() {
        return this.email;
    }


    public String getPrimeiroNome(){
        String [] nomes = this.nmUsuario.split(" ");
        if(nomes.length > 1){
            return nomes[0];
        }
        return this.nmUsuario;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        if (role == null) {
            return List.of(new SimpleGrantedAuthority("ROLE_PACIENTE"));
        }
        return List.of(new SimpleGrantedAuthority("ROLE_" + this.getRole()));
    }

    @JsonIgnore
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @JsonIgnore
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @JsonIgnore
    @Override
    public boolean isCredentialsNonExpired() {
        return UserDetails.super.isCredentialsNonExpired();
    }

    @JsonIgnore
    @Override
    public boolean isEnabled() {
        return true;
    }
}
