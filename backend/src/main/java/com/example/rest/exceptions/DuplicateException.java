package com.example.rest.exceptions;

public class DuplicateException extends RuntimeException{
    public DuplicateException(String message) { super(message); }
}
