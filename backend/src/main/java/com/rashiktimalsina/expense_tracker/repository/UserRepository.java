package com.rashiktimalsina.expense_tracker.repository;

import com.rashiktimalsina.expense_tracker.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

/**
 * @author RashikTimalsina
 * @created 22/03/2026
 */

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);

}


