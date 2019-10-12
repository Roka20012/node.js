1. Run **npm install** to install dependencies
2. Run **npm start** to launch the server

# API

# Data Structures

## NoteData

-   note: Grocery list (required) - Single line description

## NoteList (array)

-   (NoteData)

## Note List [/api/notes]

Note list description

-   Array of objects
-   example:

```javascript
{
    _id: "1236bbasd8234e",
    text: "Buy milk",
    userId: "123789dsaf123e",
    createDate: "2019-10-12T21:48:10.750Z",
    __v: 0
}
```

### Get Notes [GET]

Get a list of notes.

-   Response 200 (application/json)

    -   Headers

              Authorization: "Bearer token"

### Create New Note [POST]

Create a new note using a text.

-   Request with body (application/json)

    -   Body

              {
                  "text": "My new note",
              }

-   Response 201

-   Response 400 (application/json)

    -   Body

              {
                  "status": "error",
                  "error": error.message
              }

## Note [api/notes/:id]

Note description

-   Parameters

    -   id: `68a5sdf67` (required, string) - The note ID

### Get Note [GET]

Get a single note.

-   Response 200 (application/json)

    -   Headers

              Authorization: "Bearer token"

*   Response 401 (application/json)

    -   Body

              {
                   "status": "error",
                   "message": "Unathorized"
              }

*   Response 500 (application/json)

    -   Body

              {
                   "status": "Error",
                   "data": err.message
              }

### Update a Note [PUT]

Update a single note by setting the text.

::: warning

#### <i class="fa fa-warning"></i> Caution

If the value for `title` is `null` or `undefined`, then the corresponding value is not modified on the server. However, if you send an empty string instead then it will **permanently overwrite** the original value.
:::

-   Request (application/json)

    -   Body

              {
                  "text": "Grocery List (Safeway)"
              }

-   Response 200 (application/json)

    -   Headers

              X-Request-ID: f72fc914
              X-Response-Time: 4ms

    -   Attributes (NoteData)

-   Response 404 (application/json)

    -   Headers

              X-Request-ID: f72fc914
              X-Response-Time: 4ms

    -   Body

              {
                  "error": "Note not found"
              }

-   Request delete body (application/json)

    -   Body

              {
                  "body": ""
              }

-   Response 200 (application/json)

    -   Headers

              X-Request-ID: f72fc914
              X-Response-Time: 4ms

    -   Attributes (NoteData)

-   Response 404 (application/json)

    -   Headers

              X-Request-ID: f72fc914
              X-Response-Time: 4ms

    -   Body

              {
                  "error": "Note not found"
              }

### Delete a Note [DELETE]

Delete a single note

-   Response 204

-   Response 404 (application/json)

    -   Body

              {
                  "error": "Note not found"
              }
