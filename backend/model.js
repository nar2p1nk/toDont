const sqlite = require('better-sqlite3');
const bcrypt = require('bcrypt');

const path = __dirname + '/userTodo.db';

const db = new sqlite(path);

db.prepare(`CREATE TABLE IF NOT EXISTS user(
userId INTEGER PRIMARY KEY NOT NULL,
username TEXT NOT NULL,
password TEXT NOT NULL
);`).run()


db.prepare(`CREATE TABLE IF NOT EXISTS todos(
todoId INTEGER PRIMARY KEY NOT NULL,
todo TEXT NOT NULL,
completed BOOLEAN NOT NULL CHECK (completed IN (0,1)),
userId INTEGER,
FOREIGN KEY(userId) REFERENCES user(userId)
);`).run()

function createUser(username,password){
    const hashedPassword = bcrypt.hashSync(password,10);
    db.prepare(`INSERT INTO
    user(username,password) VALUES(?,?)`).run(username,hashedPassword);
};

function findUserByUsername(username){
    const user = db.prepare(`SELECT * FROM user WHERE username = ?`).get(username);
    return user
}

function findUserById(userId){
    const user = db.prepare(`SELECT * FROM user WHERE id = ?`).get(userId);
    return user
}

function createtodo(todo,userId){
    db.prepare(`
    INSERT INTO todos(todo,userId,completed) VALUES(?,?,0)`).run(todo,userId)
}

function completeTodo(todoId){
    db.prepare(`UPDATE todos SET completed = 1 WHERE todoId = ?`).run(todoId)
}

function deleteTodo(todoId){
    db.prepare(`DELETE FROM todos WHERE todoId = ?`).run(todoId)
}


function findTodoByuserId(userId){
    console.log(userId)
    const todos = db.prepare(`
    SELECT * FROM todos WHERE userId = ?`).all(userId);
    return todos
}

module.exports = {
    createUser,
    findUserByUsername,
    findUserById,
    createtodo,
    completeTodo,
    deleteTodo,
    findTodoByuserId,
}


//createUser('emilia','amelia')
//createUser('acekiller','of8Hearts')
//createUser('testicle','plural')
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3RpY2xlIiwiaWF0IjoxNjU1MTY2NjA5fQ.FQnZnECnHGc2MElp2ImAhgdjaVb7bcFL0wZhZj7vZsE





