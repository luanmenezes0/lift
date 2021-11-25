export async function client(
  endpoint: string,
  { body, ...customConfig }: RequestInit = {}
) {
  const config = {
    method: body ? "POST" : "GET",
    body: body,
    ...customConfig,
    headers: {
      "Content-Type": "application/json",
      ...customConfig.headers,
    },
  };

  const response = await window.fetch(
    `http://localhost:1337/${endpoint}`,
    config
  );

  if (response.ok) {
    return await response.json();
  } else {
    const errorMessage = await response.text();
    console.error(errorMessage);
    return Promise.reject(new Error(errorMessage));
  }
}
