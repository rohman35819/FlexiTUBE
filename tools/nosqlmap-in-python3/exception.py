#!/usr/bin/python3
# -*- coding: utf-8 -*-

# NoSQLMap CouchDB Module

import logging

class NoSQLMapException(Exception):
    """Base exception class for NoSQLMap tool."""

    def __init__(self, message=None, error_code=None, details=None):
        """
        Initialize the exception.

        Args:
            message (str): Human-readable error message.
            error_code (int, optional): Numeric error code.
            details (any, optional): Additional error details.
        """
        super().__init__(message)
        self.message = message or "An unknown error occurred in NoSQLMap."
        self.error_code = error_code
        self.details = details

        # Log error when exception is created
        logging.error(self.__str__())

    def __str__(self):
        base_msg = "[NoSQLMapException]"
        if self.error_code:
            base_msg += f" Error Code {self.error_code}:"
        if self.message:
            base_msg += f" {self.message}"
        if self.details:
            base_msg += f" | Details: {self.details}"
        return base_msg

# Subclasses for more specific exception handling

class ConnectionException(NoSQLMapException):
    """Exception related to connection errors."""
    pass

class AttackException(NoSQLMapException):
    """Exception raised during attack execution."""
    pass

class ValidationException(NoSQLMapException):
    """Exception raised for invalid input or parameters."""
    pass

class ScanException(NoSQLMapException):
    """Exception related to scanning errors."""
    pass
