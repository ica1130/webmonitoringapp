package com.example.WebMonitoring;

public class WebsiteDTO {
    private String websiteUrl;
    private String screenWidth;

    public WebsiteDTO(String websiteUrl, String screenWidth) {
        this.websiteUrl = websiteUrl;
        this.screenWidth = screenWidth;
    }

    public WebsiteDTO() {
    }

    public String getWebsiteUrl() {
        return websiteUrl;
    }

    public void setWebsiteUrl(String websiteUrl) {
        this.websiteUrl = websiteUrl;
    }

    public String getScreenWidth() {
        return screenWidth;
    }

    public void setScreenWidth(String screenWidth) {
        this.screenWidth = screenWidth;
    }
}
