import { useEffect } from "react";
import CategoryFilters from "./CategoryFilters";
import NoMatchingResults from "./NoMatchingResults";
import ProductsList from "./ProductsList";

export default function SearchPage({
  filter,
  products,
  active,
  categories,
  tags,
}) {
  return (
    <div>
      <CategoryFilters
        categories={categories}
        filter={filter}
        active={active}
        tags={tags}
      />
      {products.length === 0 ? (
        <NoMatchingResults resetFilters={filter.resetFilters} />
      ) : (
        <ProductsList products={products} />
      )}
    </div>
  );
}
