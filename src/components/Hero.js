import React from "react";
import HEROIMAGE from "../images/hero.jpg";
import { ImFilter } from "react-icons/im";

const Hero = ({ showFilters, setShowFilters, showSponsored, setShowSponsored }) => {
    return (
        <div
            className="mt-16
    h-52 w-full bg-cover bg-center rounded-md overflow-hidden relative bg-slate-500"
        >
            <img
                src={HEROIMAGE}
                className="w-full h-full object-cover object-center mix-blend-overlay absolute"
                alt="retailtherapy"
            />
            <div className="bg-gray-900 bg-opacity-60 flex items-center h-full absolute w-full z-10">
                <div className="px-10 max-w-xl">
                    <h2 className="text-2xl text-white font-semibold">Tech Shirts</h2>
                    <div href={`/products`}>
                        <button
                            onClick={() => setShowSponsored(!showSponsored)}
                            className="flex items-center mt-4 px-3 py-2 bg-green-600 text-white text-xl uppercase font-medium rounded hover:bg-green-500 focus:outline-none focus:bg-green-500"
                        >
                            <span>✨ Shop Sale ✨</span>
                        </button>

                        {/* <button
              onClick={() => setShowFilters(!showFilters)}
              className="absolute bottom-4 right-4 flex items-center mt-4 px-3 py-2 bg-slate-700 text-slate-200 text-xl uppercase font-medium rounded hover:bg-slate-600 focus:outline-none focus:bg-slate-600"
            >
              <span>Filters</span>
            </button> */}
                    </div>
                </div>
            </div>
            <button onClick={() => setShowSponsored(!showSponsored)}>Filter</button>
        </div>
    );
};

export default Hero;
