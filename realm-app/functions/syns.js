// This function is the endpoint's request handler.
exports = async function({ query, headers, body}, response) {
  
   const allProducts = context.services.get("mongodb-atlas").db("mongoshop").collection("products");
  
  // GET SEARCHTERM FROM QUERY PARAMETER. IF NONE, RETURN EMPTY ARRAY
  let searchTerm = query.searchTerm;
  if (!searchTerm){
    return [];
  }
 
  let calledAggregation = [
  {
    '$search': {
      'index': 'default_syns',
      'compound': {
        'should': [
          {
            'text': {
              'query': searchTerm, 
              'path': [
                'name', 'main_description'
              ],
              'synonyms': 'productSynonyms'
            }
          }, {
            'text': {
              'query': 'platinum', 
              'path': 'promotionStatus', 
              'score': {
                'constant': {
                  'value': 50
                }
              }
            }
          }
        ]
      }, 
      'highlight': {
        'path': 'main_description'
      }
    }
  }, {
    '$project': {
      'name': 1, 
      'main_image_url': 1, 
      'sponsored': 1, 
      'price': 1, 
      'category': 1, 
      'marketplace': 1, 
      'main_description': 1, 
      'score': {
        '$meta': 'searchScore'
      }
    }
  }, {
    '$limit': 20
  }
];

  
  if (calledAggregation.length ===0) return [];

  return await allProducts.aggregate(calledAggregation).toArray();
  
 
};

