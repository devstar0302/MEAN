var SchemaTokenUser = function( _mDatabaseController , _constant_value_model_key) {

	this.mDatabaseController = _mDatabaseController;
	this.constant_value_model_key = _constant_value_model_key;
	
	this.getSchema = function(){
		var Schema = _mDatabaseController.Schema;
		var _schema = new Schema({
			fromUser: { type: Schema.Types.ObjectId, ref: _constant_value_model_key.MODEL_USER }, 
			token: String ,
			dateCreated: { type: Date, default: Date.now } , 
			client_info:{useragent: String , referrer: String , ip: String },
			isValid: Boolean
		});
		return _schema;
	};

	this.getName = function(){
		return _constant_value_model_key.MODEL_USER_TOKEN;
	}

};

module.exports = SchemaTokenUser;