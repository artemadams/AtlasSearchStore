import React, { useState } from "react";
import ProductDescription from "./ProductDescription";

import { ShoppingCartIcon } from "@heroicons/react/outline";
import { getUser } from "../RealmService";

const Product = ({ product }) => {
    const [showDescription, setShowDescription] = useState(false);
    let description = [];
    let score = 0;
    if (product.main_description) {
        description = product.main_description;
    }
    if (product.score) {
        score = Object.values(product.score)[0];
        score = score.toString().slice(0, 5);
    }

    let price = Object.values(product.price.value)[0];

    useEffect(async () => {
        let user = await getUser();
        user.functions.insertClickEvent(product);
    });

    let ProdDescriptionComponent = (
        <div className="fixed inset-0 z-20 flex justify-center bg-smoke-dark">
            <div className="relative flex flex-col w-2/3 bg-white border border-black rounded  mt-60 p-8">
                <div className="p-4 mb-4 text-4xl font-bold text-center text-tolopea-500 font-body">
                    No description available.
                </div>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={() => {
                        setShowDescription(false);
                    }}
                    className="absolute w-10 h-10 mt-10 text-red-700 bottom-8 right-10"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                        fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clip-rule="evenodd"
                    />
                </svg>
            </div>
        </div>
    );
    if (description.length > 0) {
        ProdDescriptionComponent = (
            <ProductDescription
                title={product.name}
                highlights={product.highlights}
                description={description}
                image={product.main_image_url}
                price={price}
                category={product.category}
                setShowDescription={setShowDescription}
                product={product}
            />
        );
    }

    return (
        <div href={`/products/${product._id}`}>
            <div
                onClick={() => {
                    setShowDescription(true);
                }}
                className="w-full max-w-sm mx-auto rounded-md shadow-md cursor-pointer hover:shadow-2xl transition relative"
            >
                <div className="flex items-end justify-end h-56 w-full bg-cover ">
                    <img
                        src={product.main_image_url}
                        alt={product.name}
                        className="object-scale-down h-48 w-full"
                    />

                    <button className="absolute z-10 p-2 rounded-full bg-green-600 text-white mx-5 -mb-4 hover:bg-green-500 focus:outline-none focus:bg-green-500">
                        <ShoppingCartIcon className="w-5 h-5" />
                    </button>
                    {product.score && (
                        <div className=" p-2 absolute text-lg bg-rose-700 z-10 top-0 shadow-xl rounded-full text-white my-auto mb-0  transform transition duration-500 hover:scale-125 focus:outline-none ">
                            {score}
                        </div>
                    )}
                </div>

                <div className="px-5 py-3">
                    <h3 className="text-gray-900 uppercase">{product.name}</h3>
                    {product.category && (
                        <h3 className="text-green-800 text-sm">CATEGORY: {product.category}</h3>
                    )}
                    <span className="text-gray-500 mt-2">${price}</span>
                    <h3 className="text-red-500 mt-2">{product.marketplace}</h3>
                    {showDescription && ProdDescriptionComponent}
                </div>
            </div>
        </div>
    );
};

export default Product;
