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
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    // Check if the product belongs to the selected category
    const categoryMatch = selectedCategory
      ? product.category === selectedCategory
      : true;

    // Check if the product has the selected tag
    const tagMatch = selectedTag ? product.tags.includes(selectedTag) : true;

    // Return true if the product matches all filters, otherwise return false
    return nameMatch || descriptionMatch || categoryMatch || tagMatch;
  });
};

const Store = ({ products }) => {
  const router = useRouter();
  const { searchTerm, selectedCategory, selectedTag } = router.query;

  // Filter the products based on the search term, selected category, and selected tag
  const filteredProducts = filterProducts(
    products,
    searchTerm,
    selectedCategory,
    selectedTag
  );

  return (
    <div>
      {filteredProducts.map((product) => (
        <div key={product.id}>
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <p>Category: {product.category}</p>
          <p>Tags: {product.tags.join(", ")}</p>
        </div>
      ))}
    </div>
  );
};

export default Store;
