exports = function(arg){

  var products = context.services.get("mongodb-atlas").db("mongoshop").collection("products");
  
  const oid = arg || '6223abe191ecdaa217d1e935';

  const query = { "_id": BSON.ObjectId(oid) };
  console.log(JSON.stringify(query));

  return products.findOne(query)
    .then(result => {
      if(result) {
        //console.log(`Successfully found document: ${result}.`);
      } else {
        result = {};
        //console.log("No matches found.");
      }
      return result;
    })
    .catch(err => console.error(`Failed to find document: ${err}`));
  
};