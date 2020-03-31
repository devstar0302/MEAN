// type value:
// 0 - username
// 1 - email
// 2 - google account
// 3 - facebook


var SchemaAccountLogin = function( _mDatabaseController ,_constant_value_model_key) {
  
	this.mDatabaseController = _mDatabaseController;
	this.constant_value_model_key = _constant_value_model_key;

	this.getSchema = function(){
		var Schema = _mDatabaseController.Schema;
		var _schema = new Schema({
			type: Number ,
			value: {type:String ,unique: true , trim: true}, 
			registerDate: { type: Date, default: Date.now }	,
			fromUser: { type: Schema.Types.ObjectId, ref: _constant_value_model_key.MODEL_USER }, 		
			socialData: String ,
		});
		return _schema;
	};

	this.getName = function(){
		return _constant_value_model_key.MODEL_ACCOUNT_LOGIN_DETAIL;
	}

};
module.exports = SchemaAccountLogin;