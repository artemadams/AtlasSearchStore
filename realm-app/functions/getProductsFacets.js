// This function is the endpoint's request handler.
exports = async function({ query, headers, body}, response) {
  const products = context.services.get("mongodb-atlas").db("mongoshop").collection("products");
  
  let searchName = query.searchName;
  if (!searchName) return[];
  
  const searchFacets = [{
    index: "products_facets",
    facet: {
      operator: {
        text: {
          query: searchName,
          path: "name"
        }
      },
      facets: {
        categoryFacet: {
          type: "string",
          path: "category"
        },
        countryFacet: {
          type: 'string',
          path: "country"
        },
        marketplaceFacet:{
          type:"string",
          path:"marketplace"
        },
        priceFacet:{
          type:"number",
          path:"price.value",
          boundaries:[0, 20, 50, 100, 10000]
        }
      }
    }
  }];
  
  const facets = await products.aggregate(searchFacets).toArray();
  return facets;
    
};
