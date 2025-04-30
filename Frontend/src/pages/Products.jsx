import React from "react";
import { useParams, Link } from "react-router-dom";
import { useAppContext } from '../context/AppContext';

const Products = () => {
    const { id } = useParams();
    const { products } = useAppContext();

    const product = products.find((item) => item.id.toString() === id);

    const [thumbnail, setThumbnail] = React.useState(product?.images[0]);

    if (!product) return <p className="text-center mt-10 text-xl">Product not found!</p>;

    return (
        <div className="max-w-6xl mx-auto w-full px-6 py-6">
            <p className="text-gray-500 text-sm">
                <Link to="/">Home</Link> /
                <Link to="/products"> Products</Link> /
                <span className="text-indigo-500"> {product.name}</span>
            </p>

            <div className="flex flex-col md:flex-row gap-16 mt-6">
                <div className="flex gap-4">
                    <div className="flex flex-col gap-2">
                        {product.images.map((img, idx) => (
                            <img
                                key={idx}
                                src={img}
                                alt={`Thumbnail ${idx}`}
                                onClick={() => setThumbnail(img)}
                                className="border rounded-md w-24 h-24 object-cover cursor-pointer hover:ring-2 ring-indigo-400"
                            />
                        ))}
                    </div>
                    <div className="border rounded-md max-w-sm overflow-hidden">
                        <div className="w-full h-90">
                            <img
                                src={thumbnail}
                                alt="Selected product"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                </div>

                <div className="w-full md:w-1/2">
                    <h1 className="text-3xl font-semibold">{product.name}</h1>
                    <div className="flex items-center gap-1 mt-2">
                        {Array(5)
                            .fill("")
                            .map((_, i) => (
                                <span key={i}>
                                    {product.rating > i ? "⭐" : "☆"}
                                </span>
                            ))}
                        <p className="ml-2 text-gray-500">({product.rating})</p>
                    </div>

                    <div className="mt-6">
                        <p className="text-gray-500 line-through">MRP: Rs.{product.price}</p>
                        <p className="text-2xl font-medium">Offer Price: Rs.{product.offerPrice}</p>
                    </div>

                    <p className="mt-6 text-lg font-medium">About Product</p>
                    <ul className="list-disc pl-5 text-gray-600 mt-2">
                        {product.description.map((desc, idx) => (
                            <li key={idx}>{desc}</li>
                        ))}
                    </ul>

                    <div className="flex gap-4 mt-8">
                        <button className="flex-1 py-3 bg-gray-100 text-gray-800 hover:bg-gray-200 rounded-md font-medium">
                            Add to Cart
                        </button>
                        <button className="flex-1 py-3 bg-orange-500 text-white hover:bg-indigo-600 rounded-md font-medium">
                            Buy Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Products;
