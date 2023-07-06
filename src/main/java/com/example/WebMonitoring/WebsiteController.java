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

    @Autowired
    private WebsiteDbRepository dbRepository;

    @GetMapping
    public ResponseEntity<List<Website>> getAllWebsites() {
        List<Website> websites = repo.findAll();
        return ResponseEntity.ok(websites);
    }

    @PostMapping
    public ResponseEntity<Website> takeScreenshot(@RequestBody WebsiteDTO websiteDTO) {
        try {
            String websiteUrl = websiteDTO.getWebsiteUrl();
            String screenWidth = websiteDTO.getScreenWidth();
            Website website = repo.getWebsiteScreenshot(websiteUrl, screenWidth);
            if (website != null) {
                return ResponseEntity.ok(website);
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            }
        } catch (Exception ex) {
            ex.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteWebsite(@PathVariable("id") Long id) {
        try {
            repo.deleteById(id);
            return ResponseEntity.ok("Screenshot deleted successfully");
        } catch (Exception ex) {
            ex.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
