// This function is the endpoint's request handler.
exports = async function({searchTerm, categories="", market="", showSponsored=false, page=1}) {
  
  if (searchTerm == "" && categories.length === 0 && market !==""){
    return({
      maxPages:1,
      products:[],
      displayedProducts:[],
      ok:true
    });
  }
    
 if (categories.includes("Women")){
   categories.push("Damen", "Mujeres", "Mujer", "Femme");
 }
 if (categories.includes("Clothing & Shoes")){
   categories.push("Clothing", "Shoes","Chaussures", "Schuhe", "Zapatos");
 }
 if (categories.includes("Men")){
   categories.push("Hombres", "Homme");
 }
 if (categories.includes("Furniture")){
   categories.push("Muebles", "Möbel");
 }
 if (categories.includes("Bed & Bath")){
   categories.push("Bath", "Bedding","Bedding & Linen",);
 }
  if (categories.includes("Computers & Accessories")){
   categories.push("Computadoras, Componentes y Accesorios", "PC");
 }
 if (categories.includes("Home & Kitchen")){
   categories.push("Home Décor", "Home Furnishing", "Kitchen & Dining", "Patio Furniture & Accessories");
 }
 if (categories.includes("Mobile Phones & Communication")){
   categories.push("Mobiler & tillbehör", "Mobiles & Accessories","Téléphones portables et accessoires");
 }

  let products =[];
  
  let calledAggregation = [
    { 
      $search: {
        index:"default_prod",
        compound:{
          should:[],
          filter:[]
        },
         highlight:{path:'main_description'}
      }
    },
    { $project: {
        name: 1,
        main_image_url: 1,
        sponsored: 1,
        price: 1,
        category: 1,
        marketplace:1,
        main_description:1,
        internalPrice: { $multiply: ["$price.value", 0.5]  },
        score: {
        '$meta': 'searchScore'
        },
         highlights:{$meta:'searchHighlights'}
      }
    },
    {$limit:48}
  ];
    
  if(searchTerm){
    const textObjects = {
      text:{
        query:searchTerm,
        path:['name', 'main_description', 'node_name', 'model', 'item_id'],
        fuzzy:{maxEdits:1}
      }
    };
    calledAggregation[0].$search.compound.should.push(textObject);
  }
    

  if (showSponsored){
    const scoreModifier =  {
      text:{
        query:"platinum",
        path:"promotionStatus",
        score:{constant:{value:50}}
      }
    };
    calledAggregation[0].$search.compound.should.push(scoreModifier);
  }
    
  if (categories.length!==0){
    const categoryObject ={
      text:{
        query:categories,
        path:'category'
      }
    }
    calledAggregation[0].$search.compound.filter.push(categoryObject);
  }
  
  if (market!==""){
    const marketObject ={
      text:{
        query:market,
        path:'marketplace'
      }
    };
    calledAggregation[0].$search.compound.filter.push(marketObject);
  }

  if (!page) page = 1;
  
  //GET 16 PRODUCTS PER PAGE
  const nPerPage = 16;
  let maxPages;
  let numProducts;

  const allProducts = context.services.get("mongodb-atlas").db("mongoshop").collection("products");
  const eventsLog = context.services.get("mongodb-atlas").db("mongoshop").collection("eventsLog");
  if (searchTerm==='') {
    products = await allProducts.find({}).toArray();
  } 
  else{
    eventsLog.insertOne({"action": "search", "params": calledAggregation[0].$search.compound, "date": new Date() });
    products = await allProducts.aggregate(calledAggregation).toArray();
  }
     
  let displayedProducts = products.slice(((page-1)*nPerPage), nPerPage*page);


  numProducts = products.length;
  maxPages = parseInt(Math.ceil(numProducts/16));
  // console.log("MAX PAGES");
  // console.log(maxPages);
  // console.log(numProducts);
  
  //console.log(JSON.stringify(calledAggregation));
 
  return ({
    maxPages, //number
    products, //array of ?
    displayedProducts, //array of ? (same type as products)
    ok:true //boolean
  });

 
 
};