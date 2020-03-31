	// 'api_create_seller' 							: '/api/seller/create',
	// 'api_list_all_seller' 							: '/api/seller/get_list',
	// 'api_find_one_seller' 							: '/api/seller/get_one',
	// 'api_edit_seller'	 							: '/api/seller/edit',
	// 'api_delete_seller' 							: '/api/seller/delete',

var SellerApi = function( app , _dir_path , mDatabaseController , mConstantModel , mApiConstant ) {
	app.post(mApiConstant.api_create_seller, function(req , res){
		api_create_seller(req , res , app , _dir_path , mDatabaseController , mConstantModel , mApiConstant);
	});

	app.post(mApiConstant.api_list_all_seller, function(req , res){
		api_list_all_seller(req , res , app , _dir_path , mDatabaseController , mConstantModel , mApiConstant);
	});

	app.post(mApiConstant.api_create_seller, function(req , res){
		api_create_seller(req , res , app , _dir_path , mDatabaseController , mConstantModel , mApiConstant);
	});

	app.post(mApiConstant.api_find_one_seller, function(req , res){
		api_find_one_seller(req , res , app , _dir_path , mDatabaseController , mConstantModel , mApiConstant);
	});

	app.post(mApiConstant.api_edit_seller, function(req , res){
		api_edit_seller(req , res , app , _dir_path , mDatabaseController , mConstantModel , mApiConstant);
	});
}
module.exports = SellerApi;

function api_create_seller(req , res , app , _dir_path , mDatabaseController , mConstantModel , mApiConstant){
	var _token = req.body.token;
	
}

function api_list_all_seller(req , res , app , _dir_path , mDatabaseController , mConstantModel , mApiConstant){

}

function api_find_one_seller(req , res , app , _dir_path , mDatabaseController , mConstantModel , mApiConstant){

}

function api_edit_seller(req , res , app , _dir_path , mDatabaseController , mConstantModel , mApiConstant){

}

