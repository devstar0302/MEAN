var SchemaStore = function( _mDatabaseController , _constant_value_model_key) {
  
	
	this.mDatabaseController = _mDatabaseController;
	this.constant_value_model_key = _constant_value_model_key;
	
	this.getSchema = function(){


		var Schema = _mDatabaseController.Schema;


		var _schema = new Schema({
			storeName: {type:String ,unique: true , trim: true}, 
			createdDate: { type: Date, default: Date.now },
			shortUrl: {type:String ,unique: true , trim: true}, 
			fromSeller: { type: Schema.Types.ObjectId, ref: _constant_value_model_key.MODEL_USER } , 
			storeLicense: _mDatabaseController.getSchemaFromList(_constant_value_model_key.MODEL_STORE_LICENSE),
			

		});
		return _schema;
	};

	this.getName = function(){
		return _constant_value_model_key.MODEL_STORE;
	};

	

};

module.exports = SchemaStore;