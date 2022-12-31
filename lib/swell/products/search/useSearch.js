import { useEffect, useState } from "react";
import getAllProducts from "../getAllProducts";

// Define a function to filter store products
const filterProducts = (
  products,
  searchTerm,
  selectedCategory,
  selectedTag
) => {
  // Filter products by search term, category, and tag
  return products.filter((product) => {
    // Check if the product name or description matches the search term
    const nameMatch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const descriptionMatch = product.description
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());

    // We handle this with swell, because the categories are not provided with the projects. TODO Edit the backend API so we have the categories.
    const categoryMatch = true;

    // Check if the product has the selected tag
    const tagMatch = selectedTag ? product.tags.includes(selectedTag) : true;
    // Return true if the product matches all filters, otherwise return false
    return (nameMatch || descriptionMatch) && tagMatch;
  });
};
export default function useSearch(defaultProducts, defaultCategory = "") {
  const [products, setProducts] = useState(defaultProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(defaultCategory);
  const [selectedTag, setSelectedTag] = useState("");
  const filterLength = selectedTag.length + selectedCategory.length;
  const filteredProducts = filterProducts(
    products,
    searchTerm,
    selectedCategory,
    selectedTag
  );
  const resetProjects = () => {
    // if (filterLength === 0) {
    //   alert("reset");
    //   getNewProducts();
    // }
  };
  const resetFilters = () => {
    alert("reset filters");
    setSelectedTag("");
    setSelectedCategory("");
    setSearchTerm("");
    setProducts(defaultProducts);
  };
  const handleTerm = (e) => {
    searchTerm === e ? setSearchTerm("") : setSearchTerm(e);
  };
  useEffect(() => {
    if (selectedCategory === "products") {
      getNewProducts();
    }
  }, [selectedCategory]);
  const handleCategory = async (e) => {
    setSelectedCategory((c) => (c !== e ? e : ""));
    // router.push("/?counter=10", undefined, { shallow: true });

    if (!e && e.length === 0) return resetProjects();

    if (e === "products") {
      // reset filters based on all-products
      getNewProducts();
    } else {
      const [newCategories] = await getAllProducts([e]);
      if (newCategories) {
        if (selectedCategory === e) {
          setProducts(defaultProducts);
        } else {
          setProducts((c) => newCategories.results);
        }
      }
    }
  };
  const getNewProducts = async () => {
    const [newProducts] = await getAllProducts([]);
    setProducts(newProducts.results);
  };
  const handleTag = (e) => {
    selectedTag === e ? setSelectedTag("") : setSelectedTag(e);
  };
  const filter = {
    search: handleTerm,
    category: handleCategory,
    tag: handleTag,
    resetFilters,
    getNewProducts,
  };
  const active = {
    search: searchTerm,
    category: selectedCategory,
    tag: selectedTag,
  };
  return { active, filter, filteredProducts };
}
