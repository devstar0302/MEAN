var InitTestUnit = function( mDatabaseController , mConstantModel ) {
  	
	// INIT STATIC VALUE
	
	// initUserPermission(mDatabaseController , mConstantModel);
	
	// initUserRole(mDatabaseController , mConstantModel);

	// // //ADMIN 
	// initAdminUser(mDatabaseController , mConstantModel);

 // //  	// USER MANAGER
	// initSellerUser(mDatabaseController , mConstantModel);
	// initCustommerUser(mDatabaseController , mConstantModel);
	
	
	// updateUserNameField(mDatabaseController , mConstantModel);


	// PRODUCT MANAGER

	// 


};


function initUserPermission(mDatabaseController , mConstantModel){

	
	mDatabaseController.getModelFromName(mConstantModel.MODEL_USER_PERMISSION)(
		{type: 0 , typeName: 'Login' , description:'Login for user' , apiPath:'api/get/login' }).save();


}

function initUserRole(mDatabaseController , mConstantModel){
	
	mDatabaseController.getModelFromName(mConstantModel.MODEL_USER_ROLE)(
		{type: 0 , typeName: 'guest' , description:'guest user' }).save();

	mDatabaseController.getModelFromName(mConstantModel.MODEL_USER_ROLE)(
		{type: 1 , typeName: 'customer' , description:'customer user' }).save();

	mDatabaseController.getModelFromName(mConstantModel.MODEL_USER_ROLE)(
		{type: -1 , typeName: 'banned seller' , description:'banned user' }).save();

	// SELLER ROLE
	mDatabaseController.getModelFromName(mConstantModel.MODEL_USER_ROLE)(
		{type: 10 , typeName: 'Pending Seller' , description:'pending seller user' }).save();

	mDatabaseController.getModelFromName(mConstantModel.MODEL_USER_ROLE)(
		{type: 11 , typeName: 'Free Plan Seller' , description:'Free plan seller user' }).save();

	mDatabaseController.getModelFromName(mConstantModel.MODEL_USER_ROLE)(
		{type: 12 , typeName: 'Private Seller' , description:'Private seller user' }).save();
	mDatabaseController.getModelFromName(mConstantModel.MODEL_USER_ROLE)(
		{type: 13 , typeName: 'Play Plan Seller' , description:'play plan seller user' }).save();

	mDatabaseController.getModelFromName(mConstantModel.MODEL_USER_ROLE)(
		{type: 14 , typeName: 'Limited time Seller' , description:'limited time license seller user' }).save();

	mDatabaseController.getModelFromName(mConstantModel.MODEL_USER_ROLE)(
		{type: 15 , typeName: 'Affiliate' , description:'Affiliate user' }).save();

	mDatabaseController.getModelFromName(mConstantModel.MODEL_USER_ROLE)(
		{type: 16 , typeName: 'Suspend seller' , description:'seller suspend by admin or moderator' }).save();

	// ADMIN ROLE
	mDatabaseController.getModelFromName(mConstantModel.MODEL_USER_ROLE)(
		{type: 20 , typeName: 'Super admin' , description:'super admin user' }).save();

	mDatabaseController.getModelFromName(mConstantModel.MODEL_USER_ROLE)(
		{type: 21 , typeName: 'Admin' , description:'Admin user' }).save();

	mDatabaseController.getModelFromName(mConstantModel.MODEL_USER_ROLE)(
		{type: 22 , typeName: 'Moderator' , description:'moderator user' }).save();
}

function initAdminUser(mDatabaseController , mConstantModel){

	
	mDatabaseController.getModelFromName(mConstantModel.MODEL_USER_ROLE).findOne({type: 20 } , function(err, role){
		if(err){
			console.log(err);
		};
		mDatabaseController.getModelFromName(mConstantModel.MODEL_ACCOUNT_LOGIN_DETAIL)({
			type:1 , value:'admin@admin.com'
		}).save(function(err , accountSaved){
			if(err){
				return;
			}
			var id = accountSaved._id;
			console.log('id = ' + id);
			var _password = 'qwerty';
			var _salt = '1234';
			var generated_password = mDatabaseController.generatePassword(_password , _salt);
			mDatabaseController.getModelFromName(mConstantModel.MODEL_USER)({
				account:id , password: generated_password , salt:_salt , isActive: 1 , role: role._id , roleContent:role, accountContent:accountSaved
			}).save(function(err , _User){
				accountSaved.fromUser = _User._id;
				accountSaved.save();
			});

		});


	});
	
	
  	
}

function initCustommerUser(mDatabaseController , mConstantModel){
	mDatabaseController.getModelFromName(mConstantModel.MODEL_USER_ROLE).findOne({type: 1 } , function(err, role){
		if(err){
			console.log(err);
		};

		for(var i = 0 ; i < 100 ; i++){
			mDatabaseController.getModelFromName(mConstantModel.MODEL_ACCOUNT_LOGIN_DETAIL)({
				type: 1 , value: 'testcustommer'+i + '@gmail.com'
			}).save(function(err , accountSaved){
				if(err){
					return;
				}
				var id = accountSaved._id;
				console.log('id = ' + id);
				var _password = '123456';
				var _salt = '4321';
				var email = 'testcustommer' + i + '@gmail.com';
				var generated_password = mDatabaseController.generatePassword(_password , _salt);
				mDatabaseController.getModelFromName(mConstantModel.MODEL_USER)({
					account:id , password: generated_password , salt:_salt , isActive: 1 , role: role._id , roleContent:role, accountContent:accountSaved
				}).save(function(err , newUser){
					if(err){
						console.log('save loi cmnr '+ err.message);
					}
					accountSaved.fromUser = newUser._id;
					accountSaved.save();
				});

			});
		}

		
	


	});

}

function initSellerUser(mDatabaseController , mConstantModel){
	mDatabaseController.getModelFromName(mConstantModel.MODEL_USER_ROLE).findOne({type: 12 } , function(err, role){
		if(err){
			console.log(err);
		};
		for(var i = 0 ; i < 100 ; i++){
			mDatabaseController.getModelFromName(mConstantModel.MODEL_ACCOUNT_LOGIN_DETAIL)({
				type: 1 , value: 'testseller' + i + '@gmail.com'
			}).save(function(err , accountSaved){
				if(err){
					return;
				}
				var id = accountSaved._id;
				console.log('id = ' + id);
				var _password = '123456';
				var _salt = '4321';
				var email = 'testseller' + i + '@gmail.com';
				var generated_password = mDatabaseController.generatePassword(_password , _salt);
				mDatabaseController.getModelFromName(mConstantModel.MODEL_USER)({
					account:id , password: generated_password , salt:_salt , isActive: 1 , role: role._id , roleContent:role , accountContent:accountSaved
				}).save(function(err , _User){
					if(err){
						console.log('save loi cmnr '+ err.message);
					}
					accountSaved.fromUser = _User._id;
					accountSaved.save();
				});

			});
		}
		
	


	});
}

function updateUserNameField(mDatabaseController , mConstantModel){
	mDatabaseController.getModelFromName(mConstantModel.MODEL_USER).find().populate('account').populate('role').exec( function(err, users){
		for(var i = 0 ; i < users.length ; i++){
			if(typeof users[i].accountContent == 'undefined' || users[i].accountContent.length == 0){
				
				for(var z = 0 ; z < users[i].account.length ; z++){
					users[i].accountContent.push(users[i].account[z]);
				}
				users[i].save();
			}

			if(typeof users[i].roleContent == 'undefined' || typeof users[i].roleContent.value == 'undefined'){
				users[i].roleContent = users[i].role;
				users[i].save();
			}

		}
	});
	

}

module.exports = InitTestUnit;