var SchemaOldPassword = function( _mDatabaseController , _constant_value_model_key) {
  
	
	this.mDatabaseController = _mDatabaseController;
	this.constant_value_model_key = _constant_value_model_key;
	
	this.getSchema = function(){
		var Schema = _mDatabaseController.Schema;
		var _schema = new Schema({
			
			password: String ,
			salt: Number,
			dateChange: { type: Date, default: Date.now }
		});
		return _schema;
	};

	this.getName = function(){
		return _constant_value_model_key.MODEL_OLD_PASSWORD;
	}

};
module.exports = SchemaOldPassword;