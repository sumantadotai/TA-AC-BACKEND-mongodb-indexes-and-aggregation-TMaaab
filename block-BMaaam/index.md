writeCode

Insert the data present in users.json into local mongodb database using `mongoimport` into a database called sample and collection named as users.

Write aggregation queries to perform following tasks.

1. Find all users who are active.

```sh
var pipeline = [
    {$match: {isActive: true}},
]
db.users.aggregate(pipeline);
```

2. Find all users whose name includes `blake` case insensitive.

```sh
db.users.createIndex({name: "text"})
var pipeline = [
    {$match:{$text:{$search: "blake"}}},
]
db.users.aggregate(pipeline);
```

3. Find all males.

```sh
var pipeline = [
    {$match: {gender: "male"}},

]
db.users.aggregate(pipeline);
```

4. Find all active males.

```sh
var pipeline = [
    {$match: {gender: "male"}},
    {$match: {isActive: true}},
]
db.users.aggregate(pipeline);
```

5. Find all active females whose age is >= 25.

```sh
var pipeline = [
    {$match: {gender: "female"}},
    {$match: {isActive: true}},
    {$match: {age: {$gt: 25}}}
]
db.users.aggregate(pipeline);
```

6. Find all 40+ males with green eyecolor.

```sh
var pipeline = [
    {$match: {gender: "male"}},
    {$match: {age: {$gte: 40}}},
    {$match: {eyeColor: "green"}}
]
db.users.aggregate(pipeline);
```

7. Find all blue eyed men working in 'USA'.

```sh
var pipeline = [
    {$match: {gender: "male"}},
    {$match: {eyeColor: "blue"}},
    {$match: {"company.location.country" : "USA"}}
]
db.users.aggregate(pipeline);
```

8. Find all female working in Germany with green eyes and apple as favoriteFruit.

```sh
var pipeline = [
    {$match: {gender: "female"}},
    {$match: {eyeColor: "green"}},
    {$match: {favoriteFruit: "apple",}},
    {$match: {"company.location.country" : "Germany"}}
]
db.users.aggregate(pipeline);
```

9. Count total male and females.

```sh
var pipeline = [
    {$group: {_id: "$gender", count: {$sum: 1}} },
]
db.users.aggregate(pipeline);
```

10. Count all whose eyeColor is green.

```sh
var pipeline = [
    {$match: {eyeColor: "green"}},
    {$group: {_id: "$eyeColor", count: {$sum: 1}} },
]
db.users.aggregate(pipeline);
```

11. Count all 20+ females who have brown eyes.

```sh
var pipeline = [
    {$match: {gender: "female"}},
    {$match: {eyeColor: "brown"}},
    {$group: {_id: "$eyeColor", count: {$sum: 1}} },
]
db.users.aggregate(pipeline);
```

12. Count all occurences of all eyeColors.
    Something like:-

```
blue -> 30
brown -> 67
green -> 123
```

```sh
var pipeline = [
    {$group: {_id: "$eyeColor", count: {$sum: 1}} },
]
db.users.aggregate(pipeline);
```

13. Count all females whose tags array include `amet` in it.

```sh
var pipeline = [
    {$match: {gender: 'female'}},
    {$match: {tags: 'amet'}},
    {$group: {_id: '$gender', count: {$sum:1}}}
]
db.users.aggregate(pipeline);
```

14. Find the average age of entire collection

```sh
var pipeline = [
    {$group: {_id: null , averageAge: {$avg: '$age'}}}
]
db.users.aggregate(pipeline);
```

15. Find the average age of males and females i.e. group them by gender.

```sh
var pipeline = [
    {$group: {_id: '$gender' , averageAge: {$avg: '$age'}}}
]
db.users.aggregate(pipeline);
```

16. Find the user with maximum age.

```sh
var pipeline = [
    {$group: {_id: null , maxAge: {$max: '$age'}}}
]
db.users.aggregate(pipeline);
```

17. Find the document with minimum age.

```sh
var pipeline = [
    {$group: {_id: null , maxAge: {$min: '$age'}}}
]
db.users.aggregate(pipeline);
```

18. Find the sum of ages of all males and females.

```sh
var pipeline = [
    {$group: {_id: "$gender", sumOfAge : {$sum : "$age"}}}
]
db.users.aggregate(pipeline);
```

19. Group all males by their eyeColor.

```sh
var pipeline = [
    {$match: { gender:'male'}},
    {$group: {_id:'$eyeColor', count: {$sum:1}}}
]
db.users.aggregate(pipeline);
```

20. group all 30+ females by their age.

```sh
var pipeline = [
    {$match: { gender:'female'}},
    {$match: {age:{$gte: 30}}},
    {$group: {_id: "$age", count: {$sum:1}}}
]
db.users.aggregate(pipeline);
```

21. Group all 23+ males with blue eyes working in Germany.

```sh
var pipeline = [
    {$match: {gender:'male'}},
    {$match: {eyeColor: "blue"}},
    {$match: {"company.location.country" : "Germany"}},
    {$match: {age:{$gte: 23}}},
    {$group: {_id: "$age", count: {$sum:1}}}
]
db.users.aggregate(pipeline);
```

22. Group all by tag names i.e. use \$unwind since tags are array.

```sh
var pipeline = [
    {$unwind : '$tags'},
    {$group : {_id: '$tags', count : {$sum : 1}}}
]
db.users.aggregate(pipeline);
```

23. Group all males whose favoriteFruit is `banana` who have registered before 2015.

```sh
var pipeline = [
    {$match: {gender: "male"}},
    {$match: {favoriteFruit: "banana"}},
    {$project: {
        index:1,
        name:1,
        isActive:1,
        registered:1,
        age:1,
        gender:1,
        eyeColor:1,
        favoriteFruit:1,
        company:1,
        "year":{$year:"$registered"}
    }},
    {$match: {  year:{$lt:  2015} }}
]
db.users.aggregate(pipeline);
```

24. Group all females by their favoriteFruit.

```sh
var pipeline = [
    {$match : {gender: "female"}},
    {$group : {_id : "$favoriteFruit", count : {$sum:1}}}
]
db.users.aggregate(pipeline);
```

25. Scan all the document to retrieve all eyeColors(use db.COLLECTION_NAME.distinct);

```sh
db.users.distinct('eyeColor')
```

26. Find all apple loving blue eyed female working in 'USA'. Sort them by their registration date in descending order.

```sh
var pipeline = [
    {$match: {gender : 'female'}},
    {$match: {favoriteFruit : "apple"}},
    {$match: {eyeColor : "blue"}},
    {$match: {'company.location.country' : "USA"}},
    {$sort: {registered : -1}},
]
db.users.aggregate(pipeline);
```

27. Find all 18+ inactive men and return only the fields specified below in the below provided format

```js
{
  name: "",
  email: '';
  identity: {
    eye: '',
    phone: '',
    location: ''
  }
}
```

```sh
var pipeline = [
    {$match : {gender : "male"}},
    {$match : {isActive : false}},
    {$match : {age : {$gte : 18}}},
    {$project : {
        name : 1,
        email : '$company.email',
        identify : {
            eye : "$eyeColor",
            phone : '$company.phone',
            location : '$company.location.country'
            }
        }
    }
]
db.users.aggregate(pipeline);
```
