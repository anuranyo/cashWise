const BASE_URL = 'https://9aff-5-182-98-1.ngrok-free.app';

export async function fetchData(endpoint: string, options: RequestInit = {}) {
  try {
    const response = await fetch(`${BASE_URL}/${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true', // Add this header for ngrok
      },
      ...options,
    });

    // Handle errors
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || `Error: ${response.status}`);
    }

    // Parse JSON or return text response
    const contentType = response.headers.get('Content-Type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    } else {
      return { message: await response.text() };
    }
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}
