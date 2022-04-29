exports = function(arg){

  var products = context.services.get("mongodb-atlas").db("mongoshop").collection("products");
  
  const update_oid = arg ? arg.oid : '6223abe191ecdaa217d1e935';
  const update_item = arg ? arg.item : { "name": "blocks", "price": 20.99, "category": "toys"};
  const update_options = arg ? arg.options : { "upsert": true };

  const query = { "_id": BSON.ObjectId(update_oid) };
  console.log(JSON.stringify(query));

  const update = {
    "$set": update_item
  };
  console.log(JSON.stringify(update));

  const options = update_options;
  console.log(JSON.stringify(options));

  return   products.updateOne(query, update, options)
    .then(result => {
      if(result) {
        console.log(`Successfully updated document: ${result}.`);
      } else {
        console.log("No document matches the provided query.");
      }
      return result;
    })
    .catch(err => console.error(`Failed to find document: ${err}`));
};