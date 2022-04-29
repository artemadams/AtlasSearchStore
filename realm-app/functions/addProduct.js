
exports = function(arg){

  const mongodb = context.services.get("mongodb-atlas");
  const productsCollection = mongodb.db("mongoshop").collection("products");

  const newItem = {
    "item_dimensions":{
      "height":{"normalized_value":{"unit":"inches","value":14},"unit":"inches","value":14},
      "length":{"normalized_value":{"unit":"inches","value":80},"unit":"inches","value":80},
      "width":{"normalized_value":{"unit":"inches","value":60},"unit":"inches","value":60}
    },
    "color":[{"language_tag":"en_IN","standardized_values":["Black"],"value":"black"}],
    "item_id":"B07Y2CNMZN",
    "item_name":{"en_IN":"AmazonBasics Adjustable Bed Base with No Massage - Queen"},
    "item_weight":[{"normalized_value":{"unit":"pounds","value":110.74},"unit":"pounds","value":110.74}],
    "model_number":[{"value":"AMZ-PB090-Q"}],
    "product_type":[{"value":"BED_FRAME"}],
    "style":[{"language_tag":"en_IN","value":"LightCyan"}],
    "main_image_id":"81bMJUjFF5L",
    "other_image_id":["71xhqZGk61L","61AU0EqzBWL","81ZLReG+6qL","81sDcrLkX9L","91clKsmHlpL","81I6gmiBHTL","919wB8WuO4L","813+pxCA-3L"],
    "country":"IN",
    "marketplace":"Amazon",
    "domain_name":"amazon.in",
    "node":[{"node_id":5689384031,"node_name":"/Categories/Furniture/Kids' Furniture/Bed Frames"}],
    "main_image_url":"https://images-na.ssl-images-amazon.com/images/I/81bMJUjFF5L.jpg",
    "category":"Furniture",
    "price":{"currency":"USD","value":67.03},
    "colors":[["black"]],
    "styles":[["LightCyan"]],
    "descriptions":null,
    "main_description":null,
    "name":"New item --- testing",
    "brand":"AmazonBasics",
    "language_tag":"en_IN"};
    
  const test = {
    marketplace: "Amazon"
  };

  productsCollection.insertOne(test)
  .then(result => console.log(`Successfully inserted item with _id: ${result.insertedId}`))
  .catch(err => console.error(`Failed to insert item: ${err}`));
  
  return {doc: newItem};
};
