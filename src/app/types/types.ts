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
  cookbook_id: number;
  sections: Section[];
}

export interface RecipeForm {
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
  cookbook_id: number;
  sections: SectionForm[];
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

export interface SectionForm {
  id?: string; // optional
  name: string;
  sort_number: number;
  steps_attributes: StepForm[];
  recipe_ingredients_attributes: RecipeIngredientForm[];
}

export interface Step {
  id: number;
  description: string;
  step_number: number;
  recipe_id: number;
  section_id: number;
}

export interface StepForm {
  id?: string; // optional
  description: string;
  step_number: number;
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

export interface RecipeIngredientForm {
  id?: string; // optional
  ingredient_id: number;
  uom_id: number;
  quantity: number;
}

export interface Cookbook {
  id: number;
  name: string;
}

export interface Category {
  id: number;
  name: string;
}

export interface Subcategory {
  id: number;
  name: string;
  category_id: number;
}

export interface Ingredient {
  id: number;
  name: string;
}

export interface Uom {
  id: number;
  name: string;
  base_unit: string;
  system: string;
  conversion: number;
  shortname: string;
}
