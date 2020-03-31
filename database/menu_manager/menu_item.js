var SchemaMenuItem = function( _mDatabaseController , _constant_value_model_key) {
  
	
	this.mDatabaseController = _mDatabaseController;
	this.constant_value_model_key = _constant_value_model_key;
	
	this.getSchema = function(){


		var Schema = _mDatabaseController.Schema;

		var _schema = new Schema({
			id: {type:Number, unique:true},
			name:String,
			url: String,
			menuLevel: Number,
			subMenu: 
			type: Number,// admin, seller menu item

		});
		
		return _schema;
	};

	this.getName = function(){
		return _constant_value_model_key.MODEL_STORE_LICENSE;
	};

	

};

module.exports = SchemaMenuItem;