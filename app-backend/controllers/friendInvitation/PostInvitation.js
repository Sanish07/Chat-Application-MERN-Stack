const UserModel = require('../../models/Users');

const postInvite = async(req, res)=>{
    const { targetMailAddress } = req.body;
    const {userId, user_email} = req.users;

    if(user_email.toLowerCase() == targetMailAddress.toLowerCase()){
        res.status(409).send('Cannot send request to yourself!');
    }

    const targetUser = await UserModel.findOne({
        user_email : targetMailAddress.toLowerCase()
    });

    if(!targetUser){
        return res.status(404).send(`User with E-mail : ${targetMailAddress} was not found.`);
    }

    return res.send("Controller is online!");
};

module.exports = postInvite;