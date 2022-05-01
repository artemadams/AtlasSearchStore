exports = function(product){
  
  if(!!!product && !!!product._id) return false;

  var products = context.services.get("mongodb-atlas").db("mongoshop").collection("myprods");
  return products.updateOne({_id: product._id}, 
          {$set: {"price.value": Number.parseFloat( Number.parseFloat(product.price.value*0.3).toFixed(2) ), 
                  "promotionStatus": "platinum"}})
        .then(result => {
          if(result) {
            console.log(`Docs modified: ${result.modifiedCount}.`);
            
        } else {
          console.log("No document was modified.");
        }
        return result;
      })
      .catch(err => console.error(`Failed to find document: ${err}`));
  
};