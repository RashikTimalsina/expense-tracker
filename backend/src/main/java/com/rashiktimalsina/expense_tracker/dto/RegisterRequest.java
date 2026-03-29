package com.rashiktimalsina.expense_tracker.dto;

import lombok.Data;

/**
 * @author RashikTimalsina
 * @created 22/03/2026
 */

@Data
public class RegisterRequest {

    private String name;
    private String email;
    private String password;

}
