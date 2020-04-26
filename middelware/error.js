const HandleErrors = (func) => {
    return async (req, res, next) => {
        try {
            await func(req, res, next)
        } catch (err) {
            console.log(err.stack)
            next(err)
        }
    }

}
module.exports = HandleErrors;