# Jielim-Note Project

### Backend Side Tech Stack

| Technology  | Description                               |
|-------------|-------------------------------------------|
| Typescript  | JavaScript with syntax for types.           |
| Express     | Node.js web framework.   |
| GraphQL     | Efficient API query language.              |
| Apollo      | Tools for GraphQL server and client.      |
| JWT         | Secure information transmission.          |
| TypeORM     | TypeScript-based ORM for DB interaction. |
| PostgreSQL  | Open-source relational DB. |

### Frontend Side Tech Stack



---

# Run Application

### Server Side

Steps to run this project:

1. Ensure that your current working directory is the `/server` of your project to install dependencies correctly.

2. Run `npm i` command

3. create a `.env` file under `server` folder

4. Setup configuration inside `.env` file:

```env
SERVER_PORT=4000 #backend (Express/GraphQL) port number
WEB_PORT=3000 #frontend (React) port number
SERVER_HOST=localhost #backend host
WEB_HOST=localhost #frontend host
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
