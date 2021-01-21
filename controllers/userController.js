const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Datasource = require('../database/Datasource');


exports.createUser = async (req, res, datasource) => {

    try {
        const { user, name, status, password } = req.body;
        if (!user || !name || !status || !password) {
            return res.status(400).send({ message: 'Verifique seu request!' });
        }

        const newUser = {
            "user": user,
            "name": name,
            "status": status,
            "password": password,
        }

        const connected = await Datasource.isConnected(datasource.sequelize);

        if (connected) {
            const hash = await bcrypt.hashSync(newUser.password, 10);
            const responseDB = await datasource.users.create({ ...newUser, password: hash }, { raw: true });

            return res.status(201).send({
                id: responseDB.id,
                ...newUser
            });
        }

    } catch (error) {
        return res.status(500).send({ error: error });
    }
};


exports.login = async (req, res, datasource) => {
    const user = req.query.user;
    const pwd = req.query.pwd;

    if (!user || !pwd) {
        return res.status(400).send({
            message: "Verifique seu request!"
        });
    }

    const connected = await Datasource.isConnected(datasource.sequelize);

    if (connected) {
        const userResult = await datasource.users.findOne({ where: { user: user } });
        if (userResult) {
            if (await bcrypt.compareSync(pwd, userResult.password)) {
                const token = jwt.sign({
                    id: userResult.id,
                    user: userResult.user,
                    name: userResult.name,
                },
                    process.env.JWT_KEY || "minhasenhasecreta",
                    { expiresIn: "1h" }
                );

                //Autenticado com sucesso
                return res.status(200).send({
                    token: token
                });

            } else {
                return res.status(401).send({
                    message: "Usuário ou senha inválido(s)"
                });
            }

        } else {
            return res.status(404).send({
                message: "Usuário não encontrado"
            });
        }
    }
};

exports.updateUser = async (req, res, datasource) => {

    const userId = req.params.userId;
    if (!userId) {
        return res.status(400).send({ message: 'Verifique seu request!' });
    }

    const connected = await Datasource.isConnected(datasource.sequelize);
    
    if (connected) {
        const userResult = await datasource.users.findOne({ where: { id: userId } });
        var newUser = {
            user: req.body.user ? req.body.user : userResult.user,
            name: req.body.name ? req.body.name : userResult.name,
            status: req.body.status ? req.body.status : userResult.status,
            password: req.body.password ? await bcrypt.hashSync(req.body.password, 10) : userResult.password
        }

        const updated = await datasource.users.update(newUser, { where: { id: userId } });
        if (updated) {
            const userUpdated = await datasource.users.findOne({ where: { id: userId } });

            return res.status(200).send({
                id: userUpdated.id,
                user: userUpdated.user,
                name: userUpdated.name,
                status: userUpdated.status,
                password: userUpdated.password
            });
        }
    }

    return res.status(500).send({ message: 'Erro ao tentar atualizar user com id ' + userId });
}