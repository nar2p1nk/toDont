const sqlite = require('better-sqlite3');
const bcrypt = require('bcrypt');

const path = __dirname + '/userTodo.db';

const db = new sqlite(path);

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

function createUser(username,password){
    const hashedPassword = bcrypt.hashSync(password,10);
    db.prepare(`INSERT INTO
    user(username,password) VALUES(?,?)`).run(username,hashedPassword);
};

function createtodo(todo,userId){
    db.prepare(`INSERT INTO todos(todo,userId) VALUES(?,?)`).run(todo,userId)
}

function findUserByUsername(username){
    const user = db.prepare(`SELECT * FROM user WHERE username = ?`).get(username);
    return user
}

function findUserById(userId){
    const user = db.prepare(`SELECT * FROM user WHERE id = ?`).get(userId);
    return user
}

function findTodoByuserId(userId){
    const user = db.prepare(`
    SELECT * FROM user WHERE userId = ?`).get(userId);
    return user
}

module.exports = {
    createUser,
    createtodo,
    findUserByUsername,
    findUserById
}


//createUser('emilia','amelia')
//createUser('acekiller','of8Hearts')






