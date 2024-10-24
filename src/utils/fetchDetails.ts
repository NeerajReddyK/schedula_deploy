import axios from 'axios';

const fetchDetails = async () => {
  try {
    const response = await axios.get('https://run.mocky.io/v3/472fe4a0-0b44-421f-8e7b-5a708fafa854');
    return response.data;
  } catch (error) {
    console.error('Error: ', error);
  }
};

export default fetchDetails;
