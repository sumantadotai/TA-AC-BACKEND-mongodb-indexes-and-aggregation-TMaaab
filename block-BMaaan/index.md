writeCode

Q1. Design database model using mongoose to replicate data structure of `STACK OVERFLOW` and add appropriate indexes to support the queries.

Stack Overflow consists of

- Users
- Questions
- Answers
- REPLY'S on Question/Answers
- Up/Down vote on Questions/Answers/Replies
- Tags on Questions
- Views on Questions
- Reputation for each user based on questions asked, answers given, upvotes

Design models for storing these data and associate them accordingly to fetch related data together.

Use indexes to support queries related to questions, tags etc..

Q2. Use aggregation framework to

- Get array of all the tags used in the questions

```sh
> var pipeline = [
    { $unwind: "$tags" }
];
>   db.users.aggregate(pipeline);
```

- Get total questions count

```sh
> var pipeline = [
    {$group: {_id: null,count: { $sum: 1 } }}
]

> db.questions.aggregate(pipeline);
```

- Total answers count overall and question specific as well

```sh
> var pipeline = [
    {
      $group: {
          _id: "$questions",
            count: { $sum: { $unwind: "$ansewrs" }},
      },
  },
]

> db.questions.aggregate(pipeline);
```

- Count total reputation of a user

```sh
> var pipeline = [
   {$group: {
        _id: null,
        count: {$sum: "$reputation"}
    }}
]

> db.users.aggregate(pipeline);
```

- total views on a particular day

```sh
> var pipeline = [
    {$project: { "date":{$year:"$registered"}}},
    {$match:   {date: ISODate('2022-08-30')}},
    {$group: {
      _id: $date,
      count: { $sum: "$views" },
      }},
]

> db.questions.aggregate(pipeline);
```

- Count total answer by a particular user

```sh
> var pipeline = [
   {$group: {
        _id: "$user",
        count: {$sum: "$answer"}
    }}
]

> db.questions.aggregate(pipeline);
```
