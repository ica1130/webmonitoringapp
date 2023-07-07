import { useEffect, useState } from 'react';
import { getAllWebsites, takeScreenshot } from './api';
import './App.css';
import axios from 'axios';

interface Website {
  id: number;
  url: string;
  width: number;
  screenshotImage: string;
  delete: () => void;
}

interface WebsiteGallery {
  url: string;
  screenshots: { [key: string]: string };
}

function App() {
  const [websiteGalleries, setWebsiteGalleries] = useState<WebsiteGallery[]>([]);
  const [url, setUrl] = useState('');
  const [width, setWidth] = useState('1920');
  const BASE_URL = 'http://localhost:3000/api/websites';

  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  };

  const handleWidthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setWidth(event.target.value);
  };

  const handleGetScreenshot = async () => {
    try {
      await takeScreenshot(url, width);
      const response = await getAllWebsites();
      const websites: Website[] = response.data.map((website: Website) => {
        return {
          ...website,
          delete: () => handleDeleteScreenshot(website.id)
        };
      });
  
      // Group websites by URL and change the screenshots object keys to strings
      const groupedWebsites: { [key: string]: Website[] } = {};
      websites.forEach((website) => {
        if (groupedWebsites[website.url]) {
          groupedWebsites[website.url].push(website);
        } else {
          groupedWebsites[website.url] = [website];
        }
      });
  
      // Create website galleries
      const galleries: WebsiteGallery[] = [];
      for (const url in groupedWebsites) {
        const screenshots: { [key: string]: string } = {};
        groupedWebsites[url].forEach((website) => {
          screenshots[website.id.toString()] = website.screenshotImage;
        });
        galleries.push({ url, screenshots });
      }
  
      setWebsiteGalleries(galleries);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  useEffect(() => {
    const fetchWebsites = async () => {
      try {
        const response = await getAllWebsites();
        const websites: Website[] = response.data;

        // Group websites by URL
        const groupedWebsites: { [key: string]: Website[] } = {};
        websites.forEach((website) => {
          if (groupedWebsites[website.url]) {
            groupedWebsites[website.url].push(website);
          } else {
            groupedWebsites[website.url] = [website];
          }
        });

        // Create website galleries
        const galleries: WebsiteGallery[] = [];
        for (const url in groupedWebsites) {
          const screenshots: { [key: number]: string } = {};
          groupedWebsites[url].forEach((website) => {
            screenshots[website.width] = website.screenshotImage;
          });
          galleries.push({ url, screenshots });
        }

        setWebsiteGalleries(galleries);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchWebsites();
  }, []);

  const handleDeleteScreenshot = async (websiteId: number) => {
    try {
      // Send the delete request to the backend
      await axios.delete(`${BASE_URL}/${websiteId}`);
  
      // Remove the screenshot from the frontend
      setWebsiteGalleries(prevGalleries => {
        const updatedGalleries = prevGalleries.map(gallery => {
          const updatedScreenshots = { ...gallery.screenshots };
          delete updatedScreenshots[websiteId.toString()];
          return { ...gallery, screenshots: updatedScreenshots };
        });
        return updatedGalleries;
      });
    } catch (error) {
      console.error('Error deleting screenshot:', error);
    }
  };

  return (
    <div>
      <h1>WEB MONITOR APP</h1>
      <div>
        <input type="text" value={url} onChange={handleUrlChange} placeholder="Enter website URL" />
        <select value={width} onChange={handleWidthChange}>
          <option value="280">280</option>
          <option value="390">390</option>
          <option value="820">820</option>
          <option value="1280">1280</option>
          <option value="1920">1920</option>
        </select>
        <button onClick={handleGetScreenshot}>Get screenshot</button>
      </div>
      {websiteGalleries.map((gallery) => (
        <section key={gallery.url} className="gallery">
          <h2>{gallery.url}</h2>
          <div className="screenshot-links">
          {Object.entries(gallery.screenshots).map(([id, screenshotImage]) => (
            <div key={id}>
              <a href={screenshotImage} target="_blank" rel="noopener noreferrer">
                <img src={`data:image/png;base64,${screenshotImage}`} alt="Screenshot" />
              </a>
              <button onClick={() => handleDeleteScreenshot(parseInt(id))}>Delete</button>
            </div>
          ))}
          </div>
        </section>
      ))}
    </div>
  );
}
  
  export default App;
