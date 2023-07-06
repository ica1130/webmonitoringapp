import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api/websites';


export const getAllWebsites = async () => {
  try {
    const response = await axios.get(`${BASE_URL}`);
    return response;
  } catch (error) {
    throw new Error('Failed to fetch websites');
  }
};

export const takeScreenshot = async (url: string, width: string) => {
  try {
    await axios.post(`${BASE_URL}`, { websiteUrl: url, screenWidth: width });
  } catch (error) {
    throw new Error('Failed to take screenshot');
  }
};

