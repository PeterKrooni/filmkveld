import UsersDAO from "../dao/usersDAO.js";

export default class UsersController {
    static async apiGetUsers(req, res, next) {
        let filters = {}
        if (req.query.email) {
          filters.email = req.query.email
        } else if (req.query.name) {
          filters.name = req.query.name
        }
    
        const { usersList, totalNumUsers } = await UsersDAO.getUsers({
          filters
        })
    
        let response = {
          filters: filters,
          users: usersList,
          total_results: totalNumUsers,
        }
        res.json(response)
      }
}