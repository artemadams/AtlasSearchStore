exports = function(productId){
  console.log(`arg : ${productId}.`);

  
  if(!!!productId) return false;

  var products = context.services.get("mongodb-atlas").db("mongoshop").collection("products");
  return products.findOne({_id: productId})
        .then(result => {
          if(result) {
            console.log(`Docs modified: ${result}.`);
            
        } else {
          console.log("No document was modified.");
        }
        return result;
      })
      .catch(err => console.error(`Failed to find document: ${err}`));
  
};