package com.rashiktimalsina.expense_tracker.exception;

/**
 * @author RashikTimalsina
 * @created 24/03/2026
 */

public class UnauthorizedException extends RuntimeException {
    public UnauthorizedException(String message) {
        super(message);
    }
}

