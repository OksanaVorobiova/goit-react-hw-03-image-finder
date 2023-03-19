import axios from 'axios';

const ENDPOINT = `https://pixabay.com/api/`;
const API_KEY = `33272979-e2ed5d1fd8a361bfa8249b6ef`;
let paginationPage = 2;

export const getImages = async query => {
  try {
    const response = await axios.get(
      `${ENDPOINT}?q=${query}&page=1&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
    );

    return response;
  } catch (error) {
    console.log(error);
  }
};

export const loadMore = async query => {
  try {
    const biggerResponse = await axios.get(`
    ${ENDPOINT}?q=${query}&page=${paginationPage}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`);

    paginationPage += 1;
    return biggerResponse;
  } catch (error) {
    console.log(error.message);
  }
};
