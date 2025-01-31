const SERVER_URL = "http://localhost:3300";

export async function fetchAllRecipes(accessToken: string) {
  const response = await fetch(SERVER_URL + "/api/v1/recipes/index", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });
  const result = await response.json();
  return result;
}

export async function fetchReciepeById(accessToken: string, id: string) {
  const response = await fetch(SERVER_URL + `/api/v1/recipes/show/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });
  const result = await response.json();
  return result;
}
