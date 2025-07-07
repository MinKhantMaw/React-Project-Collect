import React, { useEffect, useState } from "react";

const LoadMore = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);

  const PRODUCTS_PER_PAGE = 20;

  const fetchProducts = async (isLoadMore = false) => {
    setLoading(true);
    setError(null);

    try {
      const skip = isLoadMore ? count * PRODUCTS_PER_PAGE : 0;
      const response = await fetch(
        `https://dummyjson.com/products?limit=${PRODUCTS_PER_PAGE}&skip=${skip}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result && result.products) {
        if (isLoadMore) {
          // Append new products to existing ones
          setProducts((prevProducts) => [...prevProducts, ...result.products]);
        } else {
          // Initial load - replace products
          setProducts(result.products);
        }

        // Check if there are more products to load
        setHasMore(result.products.length === PRODUCTS_PER_PAGE);

        if (isLoadMore) {
          setCount((prevCount) => prevCount + 1);
        }
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Failed to load products. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      fetchProducts(true);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading && products.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <h1 className="text-xl font-semibold text-gray-700">
            Loading products...
          </h1>
        </div>
      </div>
    );
  }

  if (error && products.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">⚠️</div>
          <h1 className="text-xl font-semibold text-red-600 mb-4">{error}</h1>
          <button
            onClick={() => fetchProducts()}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Product Gallery
        </h1>

        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">
                  {product.title}
                </h3>
                <p className="text-sm text-gray-600 mb-2">{product.category}</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-green-600">
                    ${product.price}
                  </span>
                  <div className="flex items-center">
                    <span className="text-yellow-400 mr-1">★</span>
                    <span className="text-sm text-gray-600">
                      {product.rating}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {hasMore && (
          <div className="text-center">
            <button
              onClick={handleLoadMore}
              disabled={loading}
              className={`px-8 py-3 rounded-lg font-semibold text-white transition-all duration-300 ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600 hover:shadow-lg transform hover:-translate-y-1"
              }`}
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Loading...
                </div>
              ) : (
                "Load More Products"
              )}
            </button>
          </div>
        )}

        {!hasMore && products.length > 0 && (
          <div className="text-center py-8">
            <p className="text-gray-600 text-lg">
              🎉 You've reached the end! No more products to load.
            </p>
          </div>
        )}

        {products.length > 0 && (
          <div className="text-center mt-6 text-gray-500">
            Showing {products.length} products
          </div>
        )}
      </div>
    </div>
  );
};

export default LoadMore;
