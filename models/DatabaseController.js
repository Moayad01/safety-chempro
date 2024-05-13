const sqlite3 = require('sqlite3');
const sqlite = require('sqlite');
const bcrypt = require('bcrypt');
const sanitizeHtml = require('sanitize-html');

const getDbConnection = async () => {
    return await sqlite.open({
        filename: './models/database.db',
        driver: sqlite3.Database
    });
};

async function signup(email, name, password) {
    const db = await getDbConnection();

    // Sanitize the inputs
    const sanitizedEmail = sanitizeHtml(email);
    const sanitizedName = sanitizeHtml(name);
    const sanitizedPassword = password;

    // Check if email already exists
    const checkQuery = `SELECT email FROM users WHERE email = ?`;
    const existingUser = await db.get(checkQuery, sanitizedEmail);

    if (existingUser) {
        console.error('Email already exists.');
        return { statusCode: 409, message: 'Email already exists.' }; // 409 Conflict
    }

    const query = `INSERT INTO users (email, name, password) VALUES (?, ?, ?)`;
    const hashedPassword = await bcrypt.hash(sanitizedPassword, 10); // Hashing the password

    try {
        await db.run(query, sanitizedEmail, sanitizedName, hashedPassword);
        console.log('User registered successfully.');
        return { statusCode: 200, message: 'User registered successfully.' };
    } catch (err) {
        console.error(err.message);
        return { statusCode: 500, message: 'An error occurred during registration.' };
    } finally {
        await db.close();
    }
}

async function signin(email, password) {
    const db = await getDbConnection();

    const sanitizedEmail = sanitizeHtml(email);

    const query = `SELECT * FROM users WHERE email = ?`;

    try {
        const user = await db.get(query, sanitizedEmail);
        if (user) {
            const match = await bcrypt.compare(password, user.password);
            if (match) {
                console.log('Credentials are valid.');
                return { statusCode: 200, message: 'Credentials are valid.' };
            } else {
                return { statusCode: 401, message: 'Invalid credentials.' }; // Wrong password
            }
        } else {
            return { statusCode: 404, message: 'User not found.' }; // Email not found
        }
    } catch (err) {
        console.error(err.message);
        return { statusCode: 500, message: 'An error occurred during sign-in.' };
    } finally {
        await db.close();
    }
}

async function post(message, email) {
    if (!message.trim()) {
        return { statusCode: 400, message: 'Message cannot be empty.' };
    }

    const db = await getDbConnection();
    const sanitizedMessage = sanitizeHtml(message); // Sanitize message

    const query = `SELECT ID FROM users WHERE email = ?`;
    const query2 = `INSERT INTO post (message) VALUES (?);`;
    const query3 = `SELECT ID FROM post WHERE message = ? ORDER BY ID DESC LIMIT 1`; // Ensure you get the most recent post ID if there are duplicate messages
    const query4 = `INSERT INTO write (user_id, post_id) VALUES (?, ?);`;

    console.log(email + ' attempting to post')
    try {
        const user = await db.get(query, email);
        if (!user) {
            return { statusCode: 404, message: 'User not found.' }; // Email not found
        }

        await db.run(query2, sanitizedMessage);
        const post = await db.get(query3, sanitizedMessage);
        if (!post) {
            return { statusCode: 404, message: 'Post not found after insertion.' }; // Should not typically happen
        }

        await db.run(query4, [user.ID, post.ID]);
        return { statusCode: 200, message: 'Post created and linked successfully.' };

    } catch (err) {
        console.error(err.message);
        return { statusCode: 500, message: 'An error occurred during the operation.' };
    } finally {
        if (db) {
            await db.close();
        }
    }
}

async function response(post_id, message, email) {

    if (!message.trim()) {
        return { statusCode: 400, message: 'Response cannot be empty.' };
    }

    const db = await getDbConnection();

    const sanitizedMessage = sanitizeHtml(message); // Sanitize message

    const queryFindUser = `SELECT ID FROM users WHERE email = ?`;
    const queryInsertResponse = `INSERT INTO response (post_id, response) VALUES (?, ?);`;
    const queryLinkUserToPost = `INSERT INTO write (user_id, post_id) VALUES (?, ?);`;

    try {
        const user = await db.get(queryFindUser, email);
        if (!user) {
            return { statusCode: 404, message: 'User not found.' };
        }

        await db.run(queryInsertResponse, [post_id, sanitizedMessage]);
        await db.run(queryLinkUserToPost, [user.ID, post_id]);

        // After successfully adding the response and linking the user, call searchPostSimilar
        const searchResult = await searchPostSimilar(message);
        return searchResult; // Return the result from searchPostSimilar directly

    } catch (err) {
        console.error(err.message);
        return { statusCode: 500, message: 'An error occurred during the operation.' };
    } finally {
        await db.close();
    }
}

async function searchPostSimilar(topic) {
    const db = await getDbConnection();

    const sanitizedTopic = sanitizeHtml(topic); // Sanitize topic

    try {
        // Fetch the posts that match the sanitized topic
        const queryFindPosts = `SELECT * FROM post WHERE LOWER(message) LIKE LOWER(?)`;
        const posts = await db.all(queryFindPosts, `%${sanitizedTopic}%`);

        if (!posts || posts.length === 0) {
            return { statusCode: 404, message: 'Post not found.' };
        }

        // Collect all post IDs to use in the next query to fetch responses
        const postIds = posts.map(post => post.ID);

        // Check if there are post IDs to avoid syntax error in SQL query
        let postsWithResponses = posts.map(post => ({ ...post, responses: [] })); // Default no responses
        if (postIds.length > 0) {
            // Fetch responses where their post_id matches any of the retrieved post IDs
            const queryFindResponses = `SELECT * FROM response WHERE post_id IN (${postIds.join(',')})`;
            const responses = await db.all(queryFindResponses);

            // Map responses back to their respective posts
            postsWithResponses = posts.map(post => {
                return {
                    ...post,
                    responses: responses.filter(response => response.post_id === post.ID)
                };
            });
        }

        return { statusCode: 200, posts: postsWithResponses };
    } catch (err) {
        console.error(err.message);
        return { statusCode: 500, message: 'An error occurred during the operation.' };
    } finally {
        await db.close();
    }
}

module.exports = { signup, signin, post, response, searchPostSimilar };
