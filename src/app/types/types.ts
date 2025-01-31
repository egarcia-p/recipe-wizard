export interface Recipe {
  id: number;
  title: string;
  subtitle: string | null;
  author: string;
  servings: number;
  total_time: number;
  created_at: string;
  updated_at: string;
  category_id: number;
  subcategory_id: number;
  sections: Section[];
}

export interface Section {
  id: number;
  name: string;
  recipe_id: number;
  sort_number: number;
  created_at: string;
  updated_at: string;
  steps: Step[];
  recipe_ingredients: RecipeIngredient[];
}

export interface Step {
  id: number;
  description: string;
  step_number: number;
  recipe_id: number;
  section_id: number;
}

export interface RecipeIngredient {
  id: number;
  recipe_id: number;
  ingredient_id: number;
  name: string;
  uom_id: number;
  uom_name: string;
  short_name: string | null;
  quantity: number;
  section_id: number;
  created_at: string;
  updated_at: string;
}
