import React, { Dispatch, SetStateAction, useContext, useState } from "react";

interface ICategoryContext {
  selectedCategory: string;
  setSelectedCategory: Dispatch<SetStateAction<string>>;
}

const CategoryContext = React.createContext<ICategoryContext>({
  selectedCategory: "New",
  setSelectedCategory: () => {},
});

export const CategoryContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("New");
  return (
    <CategoryContext.Provider
      value={{
        selectedCategory: selectedCategory,
        setSelectedCategory: setSelectedCategory,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategoryContext = () => {
  const { selectedCategory, setSelectedCategory } = useContext(CategoryContext);
  return { selectedCategory, setSelectedCategory };
};

export default CategoryContext;
