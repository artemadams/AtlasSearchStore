// This function is the endpoint's request handler.
exports = async function({searchTerm}) {
  const products = context.services.get("mongodb-atlas").db("mongoshop").collection("products");
  
  console.log("searchName is: ", searchTerm);
  if (!searchTerm) return[];
  
  const searchFacets = [
  {
    '$searchMeta': {
      'index': 'products_facets', 
      'facet': {
        'operator': {
          'text': {
            'query': searchTerm, 
            'path': 'name'
          }
        }, 
        'facets': {
          'categoryFacet': {
            'type': 'string', 
            'path': 'category'
          }, 
          'countryFacet': {
            'type': 'string', 
            'path': 'country'
          }, 
          'marketplaceFacet': {
            'type': 'string', 
            'path': 'marketplace'
          }, 
          'priceFacet': {
            'type': 'number', 
            'path': 'price.value', 
            'boundaries': [
              0, 20, 50, 100, 10000
            ]
          }
        }
      }
    }
  }
];
  
  let facets = await products.aggregate(searchFacets).toArray();
  
  /*
    Ugly but I'm transforming payload from the aggregation to make it easy to define the payload in GQL.
  */
  
  facets = JSON.parse(JSON.stringify(facets))[0];
  return {
    count: Number(facets["count"]["lowerBound"]), //type number
    categoryFacet:facets["facet"]["categoryFacet"]["buckets"], //type array
    countryFacet:facets["facet"]["countryFacet"]["buckets"], //type array
    marketplaceFacet:facets["facet"]["marketplaceFacet"]["buckets"], //type array
    priceFacet:facets["facet"]["priceFacet"]["buckets"]
  }
};
