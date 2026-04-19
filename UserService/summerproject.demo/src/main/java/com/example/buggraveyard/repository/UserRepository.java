//creating an interface so that springboot can write implementation for us and we do not have to do that manually

package com.example.buggraveyard.repository;

import com.example.buggraveyard.entity.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
//MongoRepository<EntityType, IDType(P Key)> basic syntax
@Repository
public interface UserRepository extends MongoRepository<User, String> {
    //to just find the user
    Optional<User> findByEmail(String email);

    // Added for  duplicate checks because above method gives whole object
    boolean existsByEmail(String email);
}