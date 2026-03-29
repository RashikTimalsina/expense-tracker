package com.rashiktimalsina.expense_tracker.service;

import com.rashiktimalsina.expense_tracker.dto.request.ExpenseRequest;
import com.rashiktimalsina.expense_tracker.dto.response.ExpenseResponse;
import com.rashiktimalsina.expense_tracker.exception.ResourceNotFoundException;
import com.rashiktimalsina.expense_tracker.exception.UnauthorizedException;
import com.rashiktimalsina.expense_tracker.model.Expense;
import com.rashiktimalsina.expense_tracker.model.User;
import com.rashiktimalsina.expense_tracker.repository.ExpenseRepository;
import com.rashiktimalsina.expense_tracker.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author RashikTimalsina
 * @created 24/03/2026
 */

@Service
@RequiredArgsConstructor
public class ExpenseService {

    private final ExpenseRepository expenseRepository;
    private final UserRepository userRepository;

    //fetch user by email, if not found throw exception
   private User getUser(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    //convert expense to response
    private ExpenseResponse toResponse(Expense expense) {
        return ExpenseResponse.builder()
                .id(expense.getId())
                .title(expense.getTitle())
                .amount(expense.getAmount())
                .category(expense.getCategory())
                .description(expense.getDescription())
                .expenseDate(expense.getExpenseDate())
                .createdAt(expense.getCreatedAt())
                .build();
    }

    //fetch all expenses for a user
    public List<ExpenseResponse> getAllExpenses(String email) {
        User user = getUser(email);
        return expenseRepository.findByUserIdOrderByExpenseDateDesc(user.getId())
                .stream()
                .map(this::toResponse)
                .toList();
    }

    //create new expense for a user
    public ExpenseResponse createExpense(String email, ExpenseRequest request) {
        User user = getUser(email);
        Expense expense = new Expense();
        expense.setTitle(request.getTitle());
        expense.setAmount(request.getAmount());
        expense.setCategory(request.getCategory());
        expense.setDescription(request.getDescription());
        expense.setExpenseDate(request.getExpenseDate());
        expense.setUser(user);
        return toResponse(expenseRepository.save(expense));
    }

    //update existing expense for a user with authorization check
    public ExpenseResponse updateExpense(String email, Long id, ExpenseRequest request) {
        User user = getUser(email);
        Expense expense = expenseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Expense not found with id: " + id));

        if (!expense.getUser().getId().equals(user.getId())) {
            throw new UnauthorizedException("You are not allowed to update this expense");
        }

        expense.setTitle(request.getTitle());
        expense.setAmount(request.getAmount());
        expense.setCategory(request.getCategory());
        expense.setDescription(request.getDescription());
        expense.setExpenseDate(request.getExpenseDate());
        return toResponse(expenseRepository.save(expense));
    }

    //delete existing expense for a user with authorization check
    public void deleteExpense(String email, Long id) {
        User user = getUser(email);
        Expense expense = expenseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Expense not found with id: " + id));

        if (!expense.getUser().getId().equals(user.getId())) {
            throw new UnauthorizedException("You are not allowed to delete this expense");
        }

        expenseRepository.delete(expense);
    }


}
