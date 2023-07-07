Web Monitor

The Web Monitor App is a web application that allows users to capture screenshots of websites and monitor changes in their appearance. 
It provides a user-friendly interface to input website URLs, select the desired width for the screenshot, and retrieve and manage the captured screenshots.

Features:

Capture screenshots of websites at different widths using the ScreenshotAPI.
Store the captured screenshots in a PostgreSQL database.
Display website galleries grouped by URL, showcasing the captured screenshots.
You can delete individual screenshots within a gallery.

Technologies Used

Front-end: React
Back-end: Java (REST API)
Database: PostgreSQL
External API: ScreenshotAPI

Configuration

Before running the application, make sure to set up the following:

ScreenshotAPI: Obtain an API key from the ScreenshotAPI website and configure it in the back-end.
PostgreSQL Database: Set up a PostgreSQL database and update the connection details in the back-end configuration.

The back-end API provides the following endpoints:

GET /api/websites: Retrieve all websites and their associated screenshots.
POST /api/websites: Add a new website and capture its screenshot.
DELETE /api/websites/:id: Delete a screenshot for a specific website.
