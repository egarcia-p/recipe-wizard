"use server";

const SERVER_URL = process.env.API_SERVER_URL;
const USDA_API_KEY = process.env.USDA_API_KEY;
const USDA_API = process.env.USDA_API;

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

export async function fetchRecipesByUSer(accessToken: string) {
  const response = await fetch(SERVER_URL + "/api/v1/recipes/recipes_by_user", {
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

export async function fetchCookbooks(accessToken: string) {
  const url = `${SERVER_URL}/api/v1/cookbooks/index`;
  console.log(`[Content Fetch] Fetching cookbooks from: ${url}`);
  
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  const text = await response.text();
  
  try {
    const result = JSON.parse(text);
    return result;
  } catch (error) {
    console.error(`[Content Fetch Error] Failed to parse JSON from ${url}`);
    console.error(`Status: ${response.status} ${response.statusText}`);
    console.error(`Response Body Preview: ${text.substring(0, 500)}`); // Log first 500 chars
    throw new Error(`JSON Parse Error: ${error}. Status: ${response.status}. Body: ${text.substring(0, 100)}...`);
  }
}

export async function fetchRecipesForCookbook(accessToken: string, id: string) {
  const response = await fetch(
    SERVER_URL + `/api/v1/recipes/recipes_by_cookbook/${id}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    }
  );
  const result = await response.json();
  return result;
}

export async function fetchCategories(accessToken: string) {
  const response = await fetch(SERVER_URL + "/api/v1/categories/index", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });
  const result = await response.json();
  return result;
}

export async function fetchSubcategories(accessToken: string) {
  const response = await fetch(SERVER_URL + "/api/v1/subcategories/index", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });
  const result = await response.json();
  return result;
}

export async function fetchIngredients(accessToken: string) {
  const response = await fetch(SERVER_URL + "/api/v1/ingredients/index", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });
  const result = await response.json();
  return result;
}

export async function fetchUoms(accessToken: string) {
  const response = await fetch(SERVER_URL + "/api/v1/uoms/index", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });
  const result = await response.json();
  return result;
}

export async function fetchUser(accessToken: string) {
  const response = await fetch(SERVER_URL + "/api/v1/users/show", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });
  const result = await response.json();
  return result;
}

export async function searchUSDAIngredients(
  query: string,
  dataType: string = "Foundation"
) {
  const response = await fetch(
    USDA_API +
      `/foods/search?query=description=${query}&dataType=${dataType}&pageSize=25&sortBy=fdcId&sortOrder=asc&api_key=${USDA_API_KEY}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const result = await response.json();
  return result;
}
