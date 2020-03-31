var InitDatabase = function( mDatabaseController , mConstantModel ) {
  	
  	// USER MANAGER
	
	addModel('./user_manager/schema_account_login_detail.js' , mDatabaseController , mConstantModel);
	addModel('./user_manager/schema_password.js' , mDatabaseController , mConstantModel);
	addModel('./user_manager/schema_user_permission.js' , mDatabaseController , mConstantModel);
	addModel('./user_manager/schema_user_role.js' , mDatabaseController , mConstantModel);
	addModel('./user_manager/schema_user_token.js' , mDatabaseController , mConstantModel);
	addModel('./user_manager/schema_users_avatar.js' , mDatabaseController , mConstantModel);
	addModel('./user_manager/schema_users_profile.js' , mDatabaseController , mConstantModel);
	addModel('./user_manager/schema_user.js' , mDatabaseController , mConstantModel);
	// ADMIN CONTROLLER

	// PRODUCT MANAGER

	// 


};

function addModel(file_path , mDatabaseController , mConstantModel){
	var _schema_file = require(file_path);
	mDatabaseController.addNewModel(new _schema_file(mDatabaseController , mConstantModel) );
}
module.exports = InitDatabase;