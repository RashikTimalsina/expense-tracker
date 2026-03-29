package com.rashiktimalsina.expense_tracker.repository;

import com.rashiktimalsina.expense_tracker.model.Expense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * @author RashikTimalsina
 * @created 24/03/2026
 */
public interface ExpenseRepository extends JpaRepository<Expense, Long> {

    @Query("SELECT e FROM Expense e WHERE e.user.id = :userId ORDER BY e.expenseDate DESC")
    List<Expense> findByUserIdOrderByExpenseDateDesc(@Param("userId") Long userId);

}
