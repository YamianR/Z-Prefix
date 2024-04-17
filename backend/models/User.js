const bcrypt = require('bcryptjs');

class User {
    constructor(knex) {
        this.knex = knex;
    }

    async register(firstName, lastName, username, password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        await this.knex('users').inset({ first_name: firstName, last_name: lastName, username, password: hashedPassword });
    }

    async login(username, password) {
        const user = await.this.knex('users').where({'username': username}).first();
        if (!user) {
            throw new Error('Invalid username or password');
        }
    }
}