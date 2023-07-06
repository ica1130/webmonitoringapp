import { useEffect, useState } from 'react';
import { getAllWebsites, takeScreenshot } from './api';

function App() {
  const [websites, setWebsites] = useState<Website[]>([]);
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
      setWebsites(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    const fetchWebsites = async () => {
      try {
        const response = await getAllWebsites();
        setWebsites(response.data);
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
      <section className="gallery">
        {websites.map((website) => (
          <article key={website.id} className="article">
            <h2>{website.url}</h2>
            <div className="screenshot-links">
              {website.screenshotWidths.map((width) => (
                <a key={width} href={website.screenshotUrls[width]} target="_blank" rel="noopener noreferrer">
                  {width}
                </a>
              ))}
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}

export default App;
