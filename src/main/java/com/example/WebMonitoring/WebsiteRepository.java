package com.example.WebMonitoring;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.io.ByteArrayOutputStream;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.URL;
import java.net.URLEncoder;
import java.util.List;

@Repository
public class WebsiteRepository {

    private final WebsiteDbRepository repo;

    @Autowired
    public WebsiteRepository(WebsiteDbRepository repo) {
        this.repo = repo;
    }

    public List<Website> findAll(){
        return repo.findAll();
    }

    public Website getWebsiteScreenshot(String websiteUrl, String screenWidth) {
        try {
            // @param {String} $token - String containing your API Key
            // @param {String} $url - Encoded URI string container the URI you're targeting
            // @param {Integer} $width - Integer indicating the width of your target render
            String token = "A9TW0M3-VGGMX8G-GQ2QEQZ-Q7X0ERA";
            String url = URLEncoder.encode(websiteUrl, "UTF-8");
            String width = screenWidth;

            // Construct the query params and URL
            String query = "https://shot.screenshotapi.net/screenshot";
            query += String.format("?token=%s&url=%s&width=%d&output=image&file_type=png&wait_for_event=load&delay=2000",
                    token, url, width);
            URL apiUrl = new URL(query);

            // Call the API and save the screenshot
            InputStream inputStream = apiUrl.openStream();
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            byte[] buffer = new byte[4096];
            int bytesRead;
            while ((bytesRead = inputStream.read(buffer)) != -1) {
                outputStream.write(buffer, 0, bytesRead);
            }

            byte[] screenshotBytes = outputStream.toByteArray();
            inputStream.close();
            outputStream.close();

            Website website = new Website();
            website.setUrl(websiteUrl);
            website.setScreenshotImage(screenshotBytes);
            repo.save(website);

            return website;

        } catch (Exception ex) {
            ex.printStackTrace();
            return null;
        }
    }
}
