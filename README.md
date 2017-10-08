# Map test app

~~~ json
{
"Profiles": {
    "profile1" : {
      "_id" : 12345,
      "created" : "2014-06-25T00:00:00.000Z",
      "email" : [ "jd@example.com", "jd@example.org" ],
      "name" : "John",
       "surname" : "Doe",
      "phones" : {
      "home" : "800-123-4567",
      "mobile" : "877-123-1234"
      }
    }
  },

  "Incidents": {
    "inc-1": {
    "user": 12345,
    "created": "2014-06-25T00:00:00.000Z",
    "id": 12345,
    "description": "Something happpened so i made a post",
    "types": [
      "Assualt",
      "Murder"
    ],
    "location": {
      "x": "800-123-4567",
      "y": "877-123-1234"
    },
    "photos": [
      "https://placehold.it/250x250",
      "https://placehold.it/250x250"
    ]

}
}
}

~~~
