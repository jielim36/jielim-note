# Jielim-Note Project

### Server Side Tech Stack

| Technology  | Description                               |
|-------------|-------------------------------------------|
| Typescript  | JavaScript with syntax for types.           |
| Express     | Node.js web framework.   |
| GraphQL     | Efficient API query language.              |
| Apollo      | Tools for GraphQL server and client.      |
| JWT         | Secure information transmission.          |
| TypeORM     | TypeScript-based ORM for DB interaction. |
| PostgreSQL  | Open-source relational DB. |


---

# Run Application

### Server Side

Steps to run this project:

1. Run `npm i` command

2. create a `.env` file under `server` folder

3. Setup configuration inside `.env` file:

```env
PORT=4000 #application port number
ACCESS_TOKEN=your_access_token #example: abcdefg
REFRESH_TOKEN=your_access_token #example: abcdefg
JWT_COOKIE=your_jwt_cookie #example: aabbcc
DB_HOST=your_database_host #example: localhost
DB_PORT=your_databse_portNumber #example: 5432
DB_USERNAME=your_database_username #example: postgres
DB_PASSWORD=your_database_password
DB_NAME=your_database_name #example: jielim_note
```

3. Run `npm start` command
