const { check, validationResult } = require("express-validator");



exports.signIn =[
  check("username")
  .exists()
  .withMessage("username is required.")
  .isLength({ min: 1, max: 25 })
  .withMessage("username should be at least 1 character but not more than 25."),
    check('password')
    .exists()
    .withMessage('password is required')
    .isLength({ min: 6 })
    .withMessage("Password should be at least 6 characters."),
      (req, res, next) => {
        /* the rest of the existing function */
        const errors = validationResult(req);
        var errorArr = [];
        if (errors.isEmpty() === false) {
          errors.array().forEach(error => {
            errorArr.push(error.msg);
          });
    
          let send_data = {
            success: false,
            status: 400,
            message: "Input validation Error",
            error: errorArr
          };
          return res.status(400).json(send_data);
        } else {
          next();
        }
      }
]
