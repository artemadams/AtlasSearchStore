import React, { useState } from "react";

import Container from "../components/Container";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Pagination from "../components/Pagination";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  //  useEffect(async () => {
  //    // add your Realm App Id to the .env.local file
  //    const REALM_APP_ID = process.env.NEXT_PUBLIC_REALM_APP_ID;
  //    const app = new Realm.App({ id: REALM_APP_ID });
  //    const credentials = Realm.Credentials.anonymous();
  //    try {
  //      const user = await app.logIn(credentials);
  //      const allProducts = await user.functions.getAllProducts();
  //      setProducts(() => allProducts);
  //      const uniqueCategories = await user.functions.getUniqueCategories();
  //      setCategories(() => uniqueCategories);
  //    } catch (error) {
  //      console.error(error);
  //    }
  //  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="bg-white w-full min-h-screen">
        <Header />
        <Container>
          <Hero />
          {/* <Category
            category="Tech Wear"
            categories={categories}
            productCount={`${products.length} Products`}
          />
          <Products products={products} />*/}
          <Pagination />
        </Container>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
