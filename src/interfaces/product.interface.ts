interface Category {
  id: number;
  name: string;
}

export default interface Product {
  id: number;
  name: string;
  description: string;
  price: string; // Asumiendo que el precio es un string, como se muestra en el ejemplo
  stock: number;
  categoryId: number;
  category: Category;
}
