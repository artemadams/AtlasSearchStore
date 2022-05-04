exports = function(product){
  console.log(`arg : ${product}.`);

  if(!!!product && !!!product._id) return false;
  const eventsLog = context.services.get("mongodb-atlas").db("mongoshop").collection("eventsLog");

  return eventsLog.insertOne({"action": "clicked", 
              "params": {"product": product, 
                        "date": new Date()}})
        .then(result => {
          if(result) {
            console.log(`Docs inserted: ${result}.`);
            
        } else {
          console.log("No document was inserted.");
        }
        return result;
      })
      .catch(err => console.error(`Failed to insert document: ${err}`));
  
};