package com.example.myproject.controller;

import com.example.myproject.model.Account;
import com.example.myproject.model.Blogpost;
import com.example.myproject.repository.AccountRepository;
import com.example.myproject.repository.BlogRepository;
import com.example.myproject.service.AccountService;
import com.example.myproject.service.BlogService;
import com.example.myproject.service.PDFService;
import jakarta.servlet.http.HttpServletRequest;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import java.net.MalformedURLException;
import java.util.List;
import java.util.Map;
import java.util.Queue;

/**
 * Handles incoming HTTP requests for account management, blog operations,
 * and PDF downloads. This controller provides endpoints for registering,
 * logging in and out of accounts, retrieving account and blog information,
 * and downloading PDF resources.
 */
@RestController
@CrossOrigin(origins = { "https://cesarjaquiery.ch", "http://localhost:3000" })
@PropertySource("classpath:application.properties")
public class RequestHandler {

    private static final Logger logger = LogManager.getLogger(RequestHandler.class);
    private final AccountRepository accountRepository;
    private final AccountService accountService;
    private final BlogRepository blogRepository;
    private final PDFService pdfService;
    private final BlogService blogService;

    public RequestHandler(AccountRepository accountRepository,
            AccountService accountService,
            BlogRepository blogRepository,
            PDFService pdfService,
            BlogService blogService) {
        this.accountRepository = accountRepository;
        this.accountService = accountService;
        this.blogRepository = blogRepository;
        this.pdfService = pdfService;
        this.blogService = blogService;
    }

    @PostMapping(path = "api/register", produces = "application/json")
    public ResponseEntity<String> registerUser(@RequestBody Map<String, String> request) {
        logger.info("Registering new user.");
        return accountService.registerUser(request);
    }

    @PostMapping(path = "api/login", produces = "application/json")
    public ResponseEntity<String> loginUser(@RequestBody Map<String, String> request) {
        return accountService.loginUser(request);
    }

    @PostMapping(path = "api/logout", produces = "application/json")
    public ResponseEntity<Map<String, Object>> logoutUser(@RequestHeader("Authorization") String token) {
        return accountService.logoutUser(token);
    }

    @GetMapping(path = "api/account/{id}", produces = "application/json") // TODO: in getaccount umbenennen
    public Account getAccountById(@PathVariable String id) { // TODO: Logger?
        return accountRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    @GetMapping(path = "api/dashboard", produces = "application/json")
    public ResponseEntity<Account> getAccountInfoByToken(Authentication authentication) {
        return accountService.getAccountInfoByToken(authentication);
    }

    @GetMapping(path = "api/blogpost/{id}", produces = "application/json") // TODO: Logger? //TODO: in getblog
                                                                           // umbenennen
    public Blogpost getBlogpostById(@PathVariable String id) {
        return blogRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    @GetMapping(path = "api/getBlogposts", produces = "application/json") // TODO: Logger? TODO: Errorhandling
    public Queue<Blogpost> getBlogposts(HttpServletRequest request) {
        return blogService.getBlogposts(request);
    }

    @GetMapping(path = "api/downloadPDF/{fileName}", produces = "application/json")
    public ResponseEntity<Resource> downloadPDF(@PathVariable String fileName) throws MalformedURLException {
        return pdfService.downloadPDF(fileName);
    }

    @GetMapping("/api/contact/phone")
    public ResponseEntity<String> getPhoneNumber(Authentication authentication) {
        return ResponseEntity.ok("076 759 83 45");
    }

}
