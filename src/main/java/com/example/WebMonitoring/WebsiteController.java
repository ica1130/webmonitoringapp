package com.example.WebMonitoring;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/websites")
@CrossOrigin(origins = "http://localhost:5173/", allowedHeaders = "*")
public class WebsiteController {
    private final WebsiteRepository repo;

    public WebsiteController(@Autowired WebsiteRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public ResponseEntity<List<Website>> getAllWebsites() {
        List<Website> websites = repo.findAll();
        return ResponseEntity.ok(websites);
    }

    @PostMapping
    public ResponseEntity<Website> takeScreenshot(@RequestBody String websiteUrl, @RequestParam String screenWidth) {
        try {
            Website website = repo.getWebsiteScreenshot(websiteUrl, screenWidth);
            return ResponseEntity.ok(website);
        } catch (Exception ex) {
            ex.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

}
