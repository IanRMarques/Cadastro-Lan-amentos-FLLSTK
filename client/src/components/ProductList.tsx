// src/components/ProductList.tsx

import React, { useEffect, useState } from 'react'
import { getAllProducts, Product } from '../services/productService'

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Função para carregar os produtos
    const fetchProducts = async () => {
      try {
        const response = await getAllProducts()
        setProducts(response.data) // Armazena os produtos no estado
      } catch (err) {
        setError('Erro ao carregar produtos')
      }
    }

    fetchProducts()
  }, []) // O array vazio significa que isso ocorre apenas uma vez após o primeiro render

  if (error) {
    return <div>{error}</div>
  }

  return (
    <div>
      <h2>Lista de Produtos</h2>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            {product.name} - ${product.price}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ProductList
