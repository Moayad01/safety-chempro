const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database.db')

// Perform database operations
db.serialize(() => {
    db.run(`
    CREATE TABLE quiz_choices (
        quiz_id INTEGER,
        choice TEXT,
        FOREIGN KEY(quiz_id) REFERENCES quiz(ID)
    );
    `);

    // CREATE TABLE quiz (
    //     ID INTEGER PRIMARY KEY AUTOINCREMENT,
    //     question TEXT,
    //     type TEXT
    // );

    // const stmt = db.prepare(
    //     `INSERT INTO interact (user_ID,unit_name,safety_percentage)
    // VALUES (?,?,?)`
    // );
    // stmt.run('seperation', '2', '98%');
    // stmt.finalize();

    // db.each('SELECT * FROM users', (err, row) => {
    //     console.log(row.id, row.name);
    // });
});

// Close the database connection
db.close();