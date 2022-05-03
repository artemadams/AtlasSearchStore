exports = function() {
  const eventsLog = context.services.get("mongodb-atlas").db("mongoshop").collection("eventsLog");


  const matchStage = {$match: {
                       'params.filter.text.path': 'category'
                      }};
                      
  const groupStage = {$group: {
                       _id: {
                        action: '$action',
                        query: '$params.filter.text.query'
                       },
                       count: {
                        $sum: 1
                       }
                      }};



 

  const unwindStage1 = {$unwind: {
                       path: '$_id.query',
                       preserveNullAndEmptyArrays: false
                      }};
                      

  const sortStage = {$sort: { count: -1 }};
  
  const unwindStage2 = {$unwind: {
                     path: '$_id.query',
                     includeArrayIndex: 'index', 
                     preserveNullAndEmptyArrays: false
                    }};
                    
  const limitStage = {$limit: 20};

  const mergeStage = {$merge: {
                       into: 'mostSearchedCategories',
                       on: '_id',
                       whenMatched: 'merge',
                       whenNotMatched: 'insert'
                      }};

  const pipeline = [matchStage, groupStage, unwindStage1, sortStage, unwindStage2, limitStage, mergeStage];

  eventsLog.aggregate(pipeline);

  return true;
};
