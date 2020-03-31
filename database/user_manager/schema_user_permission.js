var SchemaUserPermissionDetail = function( _mDatabaseController , _constant_value_model_key) {
  
	
	this.mDatabaseController = _mDatabaseController;
	this.constant_value_model_key = _constant_value_model_key;
	
	this.getSchema = function(){
		var Schema = _mDatabaseController.Schema;
		var _schema = new Schema({
			type: {type: Number  , unique: true},
			typeName: String,
			description: String,
			apiPath: String,
			
		});
		return _schema;
	};

	this.getName = function(){
		return _constant_value_model_key.MODEL_USER_PERMISSION;
	}

};
module.exports = SchemaUserPermissionDetail;