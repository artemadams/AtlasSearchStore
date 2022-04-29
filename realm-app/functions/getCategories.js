exports = async function(arg){
 // let collection = context.services.get("mongodb-atlas").db("ecommerce").collection("products");
  let collection = context.services.get("mongodb-atlas").db("mongoshop").collection("products");
  // return ["Accessories", "Apparel","Bedding", "Furniture", "Women", "Men","Sports"];
  
  
  
  return await collection.distinct("category")
};