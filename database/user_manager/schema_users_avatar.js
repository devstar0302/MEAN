var SchemaUserAvatar = function( _mDatabaseController , _constant_value_model_key) {
  
	
	this.mDatabaseController = _mDatabaseController;
	this.constant_value_model_key = _constant_value_model_key;
	
	this.getSchema = function(){


		var Schema = _mDatabaseController.Schema;


		var _schema = new Schema({
			path: String ,
			dateUploaded: {type:Date , default:Date.now},
			fromUser: { type: Schema.Types.ObjectId, ref: _constant_value_model_key.MODEL_USER } , 
			
		});
		return _schema;
	};

	this.getName = function(){
		return _constant_value_model_key.MODEL_USER_AVATAR;
	};

	

};

module.exports = SchemaUserAvatar;