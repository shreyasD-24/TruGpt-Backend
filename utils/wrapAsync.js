export default function wrapAsync(fn, message, status= 500){
    return (req, res, next) =>{
        fn(req, res, next).catch((err)=>{
            console.log(err);
            next(new Error(message, status));
        })
    }
};