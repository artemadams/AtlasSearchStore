exports = async function({ query, headers, body}, response) {
    const products = context.services.get("mongodb-atlas").db("mongoshop").collection("products");

    let searchName = query.searchName;
    if (!searchName) return[];
    
    const search_AC_Aggregation = [
  {
    '$search': {
      'index': 'autocomplete', 
      'text': {
        'query': searchName, 
        'path': 'name'
      }
    }
  }, {
    '$project': {
        'name': 1
      }
    }, {
      '$limit': 12
    }
  ];
      
 if (search_AC_Aggregation.length===0) return [];
  
    let names = await products.aggregate(search_AC_Aggregation).toArray();
    
    return names;
};





/*
   // if (search_AC_Aggregation.length ===0) return[];
   */