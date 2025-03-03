const SERVER_URL = process.env.API_SERVER_URL;

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
  const response = await fetch(SERVER_URL + "/api/v1/cookbooks/index", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });
  const result = await response.json();
  return result;
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
