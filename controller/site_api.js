var SiteMap = function(app , _dir_path , mDatabaseController , mConstantModel){

	this.app = app;
	this.dir_path = _dir_path;

	
	this.mApiConstant = new require('./api_constant.js');

	this.loadNewScreen = function(_path , _callback){
		this.app.get(_path, _callback(req , res));
	};

	// load screen ui
	addApi('./frontent_flow/web_flow.js'  ,app , _dir_path, mDatabaseController , mConstantModel , this.mApiConstant);
	
    // load user api
    addApi('./user/user_api.js'  ,app , _dir_path, mDatabaseController , mConstantModel , this.mApiConstant);
    addApi('./user/user_public_api.js'  ,app , _dir_path, mDatabaseController , mConstantModel , this.mApiConstant);

    // load admin api
    addApi('./admin/admin_api.js'  ,app , _dir_path, mDatabaseController , mConstantModel , this.mApiConstant);

    // seller api
    addApi('./seller/seller_api.js'  ,app , _dir_path, mDatabaseController , mConstantModel , this.mApiConstant);

    // store api
    addApi('./store/store_api.js'  ,app , _dir_path, mDatabaseController , mConstantModel , this.mApiConstant);
}

function addApi(file_path ,app , _dir_path, mDatabaseController , mConstantModel , mApiConstant){
	require(file_path)( app , _dir_path , mDatabaseController , mConstantModel , mApiConstant);
	
}


module.exports = SiteMap;
