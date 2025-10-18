import ProductCard from "./ProductCard";

const CategoriesSection = ({ products }) => {
  return (
    <section className="mt-12 px-2">
      <h2 className="text-4xl font-bold">Nuestros destacados</h2>
      <hr className="h-1 my-8 bg-gray-300 rounded-full" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
        {products.map((item) => (
          <ProductCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
};

export default CategoriesSection;
