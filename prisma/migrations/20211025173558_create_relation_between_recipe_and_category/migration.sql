-- CreateTable
CREATE TABLE "RecipesOnCategories" (
    "recipeId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "RecipesOnCategories_pkey" PRIMARY KEY ("recipeId","categoryId")
);

-- AddForeignKey
ALTER TABLE "RecipesOnCategories" ADD CONSTRAINT "RecipesOnCategories_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipesOnCategories" ADD CONSTRAINT "RecipesOnCategories_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
