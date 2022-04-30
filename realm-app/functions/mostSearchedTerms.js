exports = function() {
  const eventsLog = context.services.get("mongodb-atlas").db("mongoshop").collection("eventsLog");

  const groupStage = {$group: {
                       _id: {
                        action: '$action',
                        query: '$params.should.text.query'
                       },
                       count: {
                        $sum: 1
                       }
                      }};

  const matchStage = {$match: {
                       '_id.action': 'search'
                      }};

  const unwindStage = {$unwind: {
                       path: '$_id.query',
                       preserveNullAndEmptyArrays: false
                      }};

  const sortStage = {$sort: { count: -1 }};

  const limitStage = {$limit: 10};

  const mergeStage = {$merge: {
                       into: 'mostSearchedTerms',
                       on: '_id',
                       whenMatched: 'merge',
                       whenNotMatched: 'insert'
                      }};

  const pipeline = [groupStage, matchStage, unwindStage, sortStage, limitStage, mergeStage];

  eventsLog.aggregate(pipeline);

  return true;
};
