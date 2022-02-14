const sqlite3 = require('sqlite3')
const bcrypt = require('bcrypt')


db = new sqlite3.Database('data.db');

function createUser(username,password){

    const hashedPassword = bcrypt.hashSync(password, 10)

    db.run(`INSERT INTO user(username,password) VALUES(?, ?)`,
        [username,hashedPassword],
        (err)=>{
            if(err){console.error(err.message)}
            else{console.log('user created!')}
        }
)
}

function createTodos(userId,todo){
    db.run(`INSERT INTO todos(userId,todo) VALUES(?, ?) `,[userId,todo],
        (err)=>{
            if(err){console.error(err.message)}
            else{console.log('todo created')}
        }
    )
}

createTodos(2,'make pancakes')
// id 1 emilia pornies
//'helipadter','nightMareZoney'
