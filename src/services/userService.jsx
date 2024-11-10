const API_URL = 'http://localhost:3000/api';

const searchUsers = async (searchTerm) => {
  const response = await fetch(`${API_URL}/search?term=${searchTerm}`);
  const data = await response.json();
  return data;
};

export default { searchUsers };
