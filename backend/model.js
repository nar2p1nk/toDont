const sqlite = require('better-sqlite3');
const bcrypt = require('bcrypt');

const db = new sqlite('userTodo.db');

db.prepare(`CREATE TABLE IF NOT EXISTS user(
id INTEGER PRIMARY KEY NOT NULL,
username TEXT NOT NULL,
password TEXT NOT NULL
);`).run()


db.prepare(`CREATE TABLE IF NOT EXISTS todos(
Id INTEGER PRIMARY KEY NOT NULL,
todo TEXT NOT NULL,
userId INTEGER,
FOREIGN KEY(userId) REFERENCES user(id)
);`).run()

const createUser = (username,password)=>{
    const hashedPassword = bcrypt.hashSync(password,10);
    db.prepare(`INSERT INTO
    user(username,password) VALUES(?,?)`).run(username,hashedPassword);
};

const createtodo = (todo,userId)=>{
    db.prepare(`INSERT INTO todos(todo,userId) VALUES(?,?)`).run(todo,userId)
}




