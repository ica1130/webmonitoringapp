import { useEffect, useState } from 'react';
import { getAllWebsites, takeScreenshot } from './api';

interface Website {
  id: number;
  url: string;
  width: number;
  screenshotImage: string;
}

interface WebsiteGallery {
  url: string;
  screenshots: { [key: number]: string };
}

function App() {
  const [websiteGalleries, setWebsiteGalleries] = useState<WebsiteGallery[]>([]);
  const [url, setUrl] = useState('');
  const [width, setWidth] = useState('1920');

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
            {Object.entries(gallery.screenshots).map(([width, screenshotImage]) => (
              <a
                key={width}
                href={screenshotImage}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={`data:image/png;base64,${screenshotImage}`} alt="Screenshot" />
              </a>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
  
  export default App;
