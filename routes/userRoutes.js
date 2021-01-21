module.exports = app => {
    const user = require("../controllers/userController");
    const login = require('../middleware/login');
    
    // realiza login - obtem token jwt
    app.get("/api/v1/login", (req, res) =>{
        user.login(req, res, app.datasource);
    });
    
    // Criar usuário
    app.post("/api/v1/users", (req, res) =>{
        user.createUser(req, res, app.datasource);
    });

    // Atualiza usuário
    app.patch("/api/v1/users/:userId", login.validateToken, (req, res) =>{
        user.updateUser(req, res, app.datasource);
    });

};