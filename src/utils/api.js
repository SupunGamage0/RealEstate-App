export const fetchProperties = async () => {
  try {
    const response = await fetch('/data/properties.json'); // Correct path to properties.json
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching properties:', error);
    return []; // Return an empty array on error
  }
};