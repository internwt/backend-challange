const Auth = require('../../services/auth')
export async function userLogin(req,res){
  try {
    const body = req.body
    const generateToken = await Auth.generateToken(body)
    res.send(generateToken)
  } catch (error) {
    res.send({status:403,error:error})
  }
}

