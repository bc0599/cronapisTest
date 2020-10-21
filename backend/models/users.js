var mongoose= require('mongoose');
var Schema= mongoose.Schema;
var bcrypt= require('bcrypt');

var userSchema= new Schema({
    name: {type:String, require:true},
    lastname: {type:String, require:true},
    phone: {type:String, require:true},
    email: {type:String, require:true},
    password: {type:String, require:true},
    creation_dt:{type:Date, require:true},

});

userSchema.statics.hashPassword=function hashPassword(password){
    return bcrypt.hashSync(password,10);
}

userSchema.methods.isValid=function(hashedpassword){
    return bcrypt.compareSync(hashedpassword, this.password);

}

module.exports=mongoose.model('User', userSchema)