const BASE_URL = 'https://d561-5-182-98-1.ngrok-free.app';

export async function fetchData(endpoint: string, options: RequestInit = {}) {
  try {
    const url = `${BASE_URL}/${endpoint}`;
    console.log(`Fetching from: ${url}`); // Log the full URL

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true',
      },
      ...options,
    });

    console.log('Raw response:', response); // Debugging the raw response

    // Check for HTTP errors
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Response error text:', errorText);
      throw new Error(errorText || `Error: ${response.status}`);
    }

    // Parse JSON or handle non-JSON responses
    const contentType = response.headers.get('Content-Type');
    if (contentType && contentType.includes('application/json')) {
      const json = await response.json();
      console.log('Parsed JSON:', json); // Debugging parsed JSON
      return json;
    } else {
      const text = await response.text();
      console.warn('Non-JSON response received:', text);
      return { message: text };
    }
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}
