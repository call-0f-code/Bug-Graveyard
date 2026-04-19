package com.example.buggraveyard.entity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import java.util.Collection;
import java.util.List;
import java.util.Date;
//UserDetails inbuilt interface with methods like getUsername(),getpassword(),etc
@Document(collection = "users")
public class User implements UserDetails {
    @Id private String id;
    private String name;

    @Indexed(unique = true)
    private String email;
    @JsonIgnore
    private String password_hash;
    private Role role = Role.USER;
    private Status status = Status.ACTIVE;
    private Stats stats = new Stats();

    @CreatedDate private Date createdAt;
    @LastModifiedDate private Date updatedAt;

    public enum Role { USER, ADMIN }
    public enum Status { ACTIVE, SUSPENDED, BANNED }

    public static class Stats {
        private int bugsPosted = 0;

    }
    //<? extends GrantedAuthority> any class that implements Granted Authority
    //GrantedAuthority is an interface in Spring Security that represents
    //what this user is allowed to do
    @Override
    @JsonIgnore
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("ROLE_" + role.name()));
    }
    // username is just a unique field not username
    @Override
    @JsonIgnore
    public String getUsername() { return email; }
    @Override
    @JsonIgnore
    public String getPassword() { return password_hash; }
    @Override
    @JsonIgnore
    public boolean isEnabled() { return status == Status.ACTIVE; }
    //not necessary but have to implement all methods of UserDetails to avoid errors
    @Override @JsonIgnore public boolean isAccountNonExpired() { return true; }
    @Override @JsonIgnore public boolean isAccountNonLocked() { return true; }
    @Override @JsonIgnore public boolean isCredentialsNonExpired() { return true; }

    public String getId() { return id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPassword_hash() { return password_hash; }
    public void setPassword_hash(String password_hash) { this.password_hash = password_hash; }
    public Role getRole() { return role; }
    public void setRole(Role role) { this.role = role; }
    public Status getStatus() { return status; }
    public void setStatus(Status status) { this.status = status; }
}
