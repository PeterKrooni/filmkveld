/**
let users

export default class UsersdDAO{
    static async injectDB(conn){
        if (users){
            return
        }
        try {
            users = await conn.db (process.env.FILMKVELD_NS).collection("users") 
        } catch (e){
            console.error(`Unable to establish a collection handle in usersDAO: ${e}`)
        }
    }

    static async getUsers({
        filters = null,
        page = 0,
        usersPerPage = 20,
        } = {}) {
            let query
            if (filters) {
                if ("name" in filters) {
                    query = { $text: { $search: filters["name"] } }
                } else if ("email" in filters) {
                    query = { "email": { $eq: filters["email"] } }
                } 
            }
        
            let cursor
            
            try {
            cursor = await users
                .find(query)
            } catch (e) {
                console.error(`Unable to issue find command, ${e}`)
                return { usersList: [], totalNumUsers: 0 }
            }
        
            const displayCursor = cursor.limit(usersPerPage).skip(usersPerPage * page)
        
            try {
                const usersList = await displayCursor.toArray()
                const totalNumUsers = await users.countDocuments(query)
                return { usersList, totalNumUsers }
            } catch (e) {
                console.log("hellao")
                console.error(
                    `Unable to convert cursor to array or problem counting documents, ${e}`,
            )
            return { usersList: [], totalNumUsers: 0 }
        }
    }

    static async addUser(user){
        return
    }

    static async getUsers({
        filters = null,
    } = {}) {
        let query 
        if (filters){
            if ("name" in filters){
                query = {$text: {$serach: filters["name"]}}
            }
        }
        let cursor 
        try {
            cursor.await users
            .find(query)
        } catch (e) {
            console.error(`Unabele to find command, ${e}`)
            return {null}
        }
        
    } 
    })
} */