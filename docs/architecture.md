# Architecture

<img width="533" alt="Screen Shot 2021-04-29 at 9 01 09 AM" src="https://user-images.githubusercontent.com/38381688/116554668-76cd7000-a8c9-11eb-83bd-20b8660a9fb6.png">

# Giveaway Route
URL: /webhook/giveaway

```json
{
  "header": "Authorization: Bearer " *GoogleAuthToken*,
  "body": {
    "to": *phone_number*,
    "body": *message*
  }
}
```
