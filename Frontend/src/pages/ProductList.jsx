import React, {useState} from 'react'
import { useAppContext } from '../context/AppContext'
import { IdCard } from 'lucide-react';

const ProductList = () => {

    const { products, setProducts  } = useAppContext();
    const [loading, setLoading] = useState(false);

    const handleStockChange = async (productId, value) => {
        try {
            console.log("ID",productId);
          const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/product/update-stock/${productId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ instock: value }),
          });
         
          const data = await res.json();
          console.log(data.message);
          // Optionally update your state here to reflect the new stock status
        } catch (error) {
          console.error('Error updating stock:', error);
        }
      };
      



    return (
        <div>
            <div className="flex-1 py-2 flex flex-col justify-between">
                <div className="w-full md:p-10 p-4">
                    <h2 className="pb-4 text-lg font-medium">All Products</h2>
                    <div className="flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md bg-white border border-gray-500/20">
                        <table className="md:table-auto table-fixed w-full overflow-hidden">
                            <thead className="text-gray-900 text-sm text-left">
                                <tr>
                                    <th className="px-4 py-3 font-semibold truncate">Product</th>
                                    <th className="px-4 py-3 font-semibold truncate">Category</th>
                                    <th className="px-4 py-3 font-semibold truncate hidden md:block">Selling Price</th>
                                    <th className="px-4 py-3 font-semibold truncate">In Stock</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm text-gray-500">
                                {products.map((product, index) => (
                                    <tr key={index} className="border-t border-gray-500/20">
                                        <td className="md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3 truncate">
                                            <div className="border border-gray-300 rounded p-2">
                                                <img s src={(product.images && product.images.length > 0) ? product.images[0] : 'fallback-image.jpg'}
                                                    alt={product.name} className="w-16" />
                                            </div>
                                            <span className="truncate max-sm:hidden w-full">{product.name}</span>
                                        </td>
                                        <td className="px-4 py-3">{product.category}</td>
                                        <td className="px-4 py-3 max-sm:hidden">Rs.{product.offerPrice}</td>
                                        <td className="px-4 py-3">
                                            <label className="relative inline-flex items-center cursor-pointer text-gray-900 gap-3">
                                            <input
                                               type="checkbox" className="sr-only peer"
                                               checked={product.instock}
                                               onChange={(e) => handleStockChange(product._id, e.target.checked)} 
                                             />
                                                <div className="w-12 h-7 bg-slate-300 rounded-full peer peer-checked:bg-blue-600 transition-colors duration-200"></div>
                                                <span className="dot absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-5"></span>
                                            </label>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductList
