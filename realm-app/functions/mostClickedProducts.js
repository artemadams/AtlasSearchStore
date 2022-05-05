exports = function() {
  const eventsLog = context.services.get("mongodb-atlas").db("mongoshop").collection("eventsLog");

  const matchStage = {$match: {
                       'action': 'clicked'
                      }};
                      
  const groupStage = {$group: {
                       _id: '$params.product.name',
                       count: {
                        $sum: 1
                       }
                      }};


  const sortStage = {$sort: { count: -1 }};

  const limitStage = {$limit: 10};

  const mergeStage = {$merge: {
                       into: 'mostClickedProducts',
                       on: '_id',
                       whenMatched: 'merge',
                       whenNotMatched: 'insert'
                      }};

  const pipeline = [matchStage, groupStage, sortStage, limitStage, mergeStage];

  eventsLog.aggregate(pipeline);

  return true;
};
