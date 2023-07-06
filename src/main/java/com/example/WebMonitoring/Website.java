package com.example.WebMonitoring;

import jakarta.persistence.*;

import java.util.Base64;

@Entity
public class Website {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "url")
    private String url;

    @Lob
    @Column(name = "screenshot_image")
    private byte[] screenshotImage;

    public Website() {
    }

    public String getScreenshotImageBase64() {
        return Base64.getEncoder().encodeToString(screenshotImage);
    }

    public Long getId() {
        return id;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public byte[] getScreenshotImage() {
        return screenshotImage;
    }

    public void setScreenshotImage(byte[] screenshotImage) {
        this.screenshotImage = screenshotImage;
    }
}