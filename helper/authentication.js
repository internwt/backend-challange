import jwt from 'jsonwebtoken'

const auth = async(req,res,next) =>{
      try {
          const token =  req.header('Authorization').replace("Bearer ","")
          const verfiyToken = jwt.verify(token,'sunsey')
          if(verfiyToken){
              req.token = token
              req.userId = req.id
              next()
          }
      }catch(e){
          res.send("token expired")
      }
}
export default auth