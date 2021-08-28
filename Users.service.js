const { Client } = require('pg')

class UserService {

    async getAllUsers() {
        const client = new Client({
            user: 'sa',
            host: 'localhost',
            database: 'TestNode',
            password: 'example',
            port: 5432,
          })

        await client.connect()
        const res = await client.query('SELECT * FROM users')
        console.log(res.rows)
        await client.end()
    }

}

module.exports = new UserService()