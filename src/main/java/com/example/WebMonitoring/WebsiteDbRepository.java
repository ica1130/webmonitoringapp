package com.example.WebMonitoring;

import org.springframework.data.jpa.repository.JpaRepository;

public interface WebsiteDbRepository extends JpaRepository<Website, Long>{
    Website findByUrl(String url);
}
