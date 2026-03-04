import products from '../data/products'
import ProductCard from '../components/ProductCard'

export default function ProductGrid() {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {products.map(p => (
        <ProductCard key={p.id} {...p} />
      ))}
    </section>
  )
}
