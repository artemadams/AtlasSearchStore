exports = async function({ query, headers, body}, response) {
    const products = context.services.get("mongodb-atlas").db("mongoshop").collection("products");

    let searchName = query.searchName;
    if (!searchName) return[];
    
    const search_AC_Aggregation = [ {
    '$search': {
      'index': 'autocomplete_prod', 
      'autocomplete': {
        'query': searchName, 
        'path': 'name', 
        'fuzzy': {maxEdits:1}
      }
    }
  }, {
    '$project': {
      'name': 1
    }
  }, {
    '$limit': 12
   }];
    
 
  
    let names = await products.aggregate(search_AC_Aggregation).toArray();
    
    return names;
};



