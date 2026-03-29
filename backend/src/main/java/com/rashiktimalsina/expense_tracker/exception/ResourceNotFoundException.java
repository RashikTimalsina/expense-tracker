package com.rashiktimalsina.expense_tracker.exception;

/**
 * @author RashikTimalsina
 * @created 24/03/2026
 */

public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String message) {
        super(message);
    }
}
