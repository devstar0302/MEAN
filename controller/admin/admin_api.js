//
// API FOR FRONT-END FOR USER
//
var AdminApi = function( app , _dir_path , mDatabaseController , mConstantModel , mApiConstant ) {
  	
    app.post(mApiConstant.api_admin_panel_login, function(req , res){});


    app.post(mApiConstant.api_get_all_user, function(req , res){
    	api_get_all_user(req , res , app , _dir_path , mDatabaseController , mConstantModel , mApiConstant);
    });

    app.post(mApiConstant.api_change_user_profile, function(req , res){
    	api_change_user_profile(req , res , app , _dir_path , mDatabaseController , mConstantModel , mApiConstant);
    });

    app.post(mApiConstant.api_create_user, function(req , res){
    	api_create_user(req , res , app , _dir_path , mDatabaseController , mConstantModel , mApiConstant);
    });
    
    app.post(mApiConstant.api_suspend_user, function(req , res){
    	api_suspend_user(req , res , app , _dir_path , mDatabaseController , mConstantModel , mApiConstant);
    });

    app.post(mApiConstant.get_admin_menu_left, function(req , res){
    	get_admin_menu_left(req , res , app , _dir_path , mDatabaseController , mConstantModel , mApiConstant);
    });
    
    

};

module.exports = AdminApi;

function api_get_all_user(req , res , app , _dir_path , mDatabaseController , mConstantModel , mApiConstant){
	
	var filter = req.body.filter;
	var page = req.body.page;
	var perpage = req.body.limit;
	var orderField = req.body.order;

	// {
 //    page: 1,
 //    limit: 10,
 //    filter: '',
 //    order: '-dateCreate',
 //  };
 	var paramsQuery;
	if(typeof filter == 'undefined'){
		paramsQuery = '';//{};
		filter = '';
	}else{
		paramsQuery = filter; //
		filter = filter.toLowerCase();
		console.log(filter);
		paramsQuery = filter;
	}
	var filterPrams = { "value": { "$regex": filter , "$options": "i" } };
	if(typeof page == 'undefined'){
		page = 0;

	}
	if(page < 1 ){
		page = 1;
	}
	if(typeof perpage == 'undefined'){
		perpage = 10;

	}else{
		if(perpage < 10){
			perpage = 10;
		}
	}
	var isAsc = 1;
	var old_item_name = 'registerDate';
	if(typeof orderField == 'undefined'){
		orderField = 'registerDate';
		isAsc = 1;
	}else{
		if(orderField.indexOf('-') > -1){
			isAsc = -1;
		}
		if(orderField.indexOf('username') > -1){
			old_item_name = 'accountContent.value';
		}

		if(orderField.indexOf('email') > -1){
			old_item_name = 'email';
		}

		if(orderField.indexOf('roleId') > -1){
			old_item_name = 'roleContent.type';
		}

		if(orderField.indexOf('roleName') > -1){
			old_item_name = 'roleContent.typeName';
		}

		orderField = orderField.replace("username" , "accountContent[0].value");
		orderField = orderField.replace("email" , "accountContent[0].value");
		orderField = orderField.replace("roleId" , "roleContent.type");
		orderField = orderField.replace("roleName" , "roleContent.typeName");
	}
	// {'likes.num' : 'desc'}
	
	//match: { tagName: { $in: ['funny', 'politics'] }}
	mDatabaseController.getModelFromName(mConstantModel.MODEL_USER).find({ "roleContent.type":{$ne: -1}  , "accountContent":{ $elemMatch: { "value": { "$regex": paramsQuery , "$options": "imxs" }} } })
	.sort([[old_item_name , isAsc]]).exec(function(err , users){
		if(err){
			console.log('error cmnr');
			res.json(mDatabaseController.generateErrorMessage(mDatabaseController.error_log.query_error));
			return;
		}

		if(users == null || users.length == 0){
			console.log('ko co user');
			res.json(mDatabaseController.generateErrorMessage(mDatabaseController.error_log.query_error));
			return;
		}
		var startPost = (page-1) * perpage;
		
		var returnList = [];
		var current_check = 0;


    	

		for(var i = 0 ; i < users.length ; i++){
			if(users[i].accountContent[0].value.indexOf(paramsQuery) > -1){
				if(current_check >= startPost && current_check < startPost+ perpage ){
					var newUser = {
						id: users[i]._id,
						email: users[i].accountContent[0].value,
						roleId: users[i].roleContent.type,
						roleName: users[i].roleContent.typeName,
						registerDate: users[i].registerDate
					};
					returnList.push(newUser);
				}
				current_check++;

			}
			
			
		}
		var totalPage = (current_check / perpage)| 0;
		if(current_check % perpage > 0){
			totalPage++;
		}
		res.json(mDatabaseController.generateMessageToClient({ data: returnList, total: current_check ,totalPage: totalPage }));

	});
};

function api_change_user_profile(req , res , app , _dir_path , mDatabaseController , mConstantModel , mApiConstant){
	

	var _user_id = req.body.id;
	var email = req.body.email;
	var password = req.body.password;
	var roleId = req.body.roleId;

	mDatabaseController.getModelFromName(mConstantModel.MODEL_USER).findById(_user_id, function(err, user){
		if(err){
			console.log(err);
			res.json(mDatabaseController.generateErrorMessage(mDatabaseController.error_log.query_error));
			return;
		};
		if(user == null){
			res.json(mDatabaseController.generateErrorMessage(mDatabaseController.error_log.not_exist_params_to_query));
			return;
		}

		if(typeof email != 'undefined'){
			console.log('email = ' + email + ' useremail ' + user.email + user.accountContent.length);
			user.email = email;
			

			for(var i = 0 ; i < user.accountContent.length ; i++){
				
				if(user.accountContent[i].type == 1){
					console.log('trouc khi save:' + user.accountContent[i]);
					user.accountContent[i].value = email;
					user.save();	
					mDatabaseController.getModelFromName(mConstantModel.MODEL_ACCOUNT_LOGIN_DETAIL).findOne({_id: user.accountContent[i]._id},function(err1, doc){
					    if(err1){
					        console.log("Something wrong when updating data!");
					    }
					    doc.value = email;
					    
					    doc.save(function(err1){
					    	console.log(err1);
					    	
					    });
					    
					    
					    
					});
					
					
					console.log("Saved account!");
				}	
			}
		}

		if(typeof password != 'undefined'){
			var _salt = 1234;
			_salt = mDatabaseController.generateRandomSalt();
			
			var generated_password = mDatabaseController.generatePassword(password , _salt);
			user.password = generated_password;
			user.salt = _salt;
		}

		if(typeof roleId != 'undefined'){
			mDatabaseController.getModelFromName(mConstantModel.MODEL_USER_ROLE).findOne({type: roleId } , function(err, role){
				if(err){
					res.json(mDatabaseController.generateErrorMessage(mDatabaseController.error_log.query_error));
					return;
				}
				user.role = role._id;
				user.roleContent = role;
				user.save();
			});
		}
		res.json(mDatabaseController.generateMessageToClient({ data:  user._id  }));
	});

};



function api_create_user(req , res , app , _dir_path , mDatabaseController , mConstantModel , mApiConstant){
	
	//{email: '', password:'', roleId: ''}
	var email = req.body.email;
	var password = req.body.password;
	var roleId = req.body.roleId;


	mDatabaseController.getModelFromName(mConstantModel.MODEL_USER_ROLE).findOne({type: roleId } , function(err, role){
		if(err){
			console.log(err);
			res.json(mDatabaseController.generateErrorMessage(mDatabaseController.error_log.query_error));
			return;
		};

		if(role == null){
			res.json(mDatabaseController.generateErrorMessage(mDatabaseController.error_log.not_exist_params_to_query));
			return;
		}

		mDatabaseController.getModelFromName(mConstantModel.MODEL_ACCOUNT_LOGIN_DETAIL)({
			type: 1 , value: email
		}).save(function(err , accountSaved){
			if(err){
				res.json(mDatabaseController.generateErrorMessage(mDatabaseController.error_log.query_error));
				return;
			}
			var id = accountSaved._id;
			console.log('id = ' + id);
			
			var _salt = 1234;
			_salt = mDatabaseController.generateRandomSalt();
			
			var generated_password = mDatabaseController.generatePassword(password , _salt);
			mDatabaseController.getModelFromName(mConstantModel.MODEL_USER)({
				account:id , password: generated_password , salt:_salt , isActive: 1 , role: role._id , accountContent: accountSaved,
				roleContent: role
			}).save(function(err, user){
				if(err){
					res.json(mDatabaseController.generateErrorMessage(mDatabaseController.error_log.query_error));
					console.log('save loi cmnr '+ err.message);
					return;
				}
				accountSaved.fromUser = user._id;
				accountSaved.save();
				res.json(mDatabaseController.generateMessageToClient({ data:  user._id  }));
			});

		});
	});
};

function api_suspend_user(req , res , app , _dir_path , mDatabaseController , mConstantModel , mApiConstant){
	var _user_id = req.body.id;
	console.log(_user_id);

	mDatabaseController.getModelFromName(mConstantModel.MODEL_USER).find({_id:{ $in: _user_id } }, function(err, users){
		if(err){
			console.log(err);
			res.json(mDatabaseController.generateErrorMessage(mDatabaseController.error_log.query_error));
			return;
		};

		if(users == null){
			res.json(mDatabaseController.generateErrorMessage(mDatabaseController.error_log.not_exist_params_to_query));
			return;
		}
		console.log("tim duoc " + users.length);
		mDatabaseController.getModelFromName(mConstantModel.MODEL_USER_ROLE).findOne({type: -1 } , function(err, role){
			if(err){
				res.json(mDatabaseController.generateErrorMessage(mDatabaseController.error_log.query_error));
				return;
			}
			var arr = [];
			for(var i = 0 ; i< users.length ; i++){
				arr.push(users[i]._id);
				users[i].role = role._id;
				users[i].roleContent = role;
				users[i].save(function(err){
					if(err) console.log('loi save user ' + err.message);
				});
				console.log("tim duoc " + users[i]._id);
			}
			
			res.json(mDatabaseController.generateMessageToClient({listId: arr}));
		});
	});
}


function get_admin_menu_left(req , res , app , _dir_path , mDatabaseController , mConstantModel , mApiConstant){
	var defaultShortCode = 'en';
	var defaultMenu = [
        {
            name: 'Setting',
            type: 'link',
            icon: 'fa fa-cog',
            state: 'admin.dss1'
        }, {
            name: 'Categories',
            type: 'link',
            icon: 'fa fa-sitemap',
            state: 'admin.dss1'
        }, {
            name: 'Products',
            type: 'link',
            icon: 'fa fa-shopping-bag',
            state: 'admin.dss1'
        }, {
            name: 'Buyers',
            type: 'link',
            icon: 'fa fa-address-book',
            state: 'admin.dss1'
        }, {
            name: 'Vendors',
            type: 'link',
            icon: 'fa fa-industry',
            state: 'admin.dss1'
        }, {
            name: 'Bloggers',
            type: 'link',
            icon: 'fa fa-book',
            state: 'admin.dss1'
        },
        {
            name: 'Customer Service',
            type: 'toggle',
            icon: 'fa fa-user-secret',
            pages: [{
                name: 'News',
                state: 'admin.dss1'
            }, {
                name: 'Help',
                state: 'admin.dss1'
            }, {
                name: 'FAQs',
                state: 'admin.dss1'
            }, {
                name: 'About EMH',
                state: 'admin.dss1'
            }, {
                name: 'Privacy Policy',
                state: 'admin.dss1'
            }, {
                name: 'Terms & Conditions',
                state: 'admin.dss1'
            }, {
                name: 'Delivery Informations',
                state: 'admin.dss1'
            }]
        }, {
            name: 'Staffs',
            type: 'toggle',
            icon: 'fa fa-users',
            pages: [{
                name: 'Super administrator',
                state: 'admin.dss1'
            }, {
                name: 'Moderators',
                state: 'admin.dss1'
            }]
        }, {
            name: 'Advertisements',
            type: 'toggle',
            icon: 'fa fa-trophy',
            pages: [{
                name: 'Affiliation',
                state: 'admin.dss1'
            }, {
                name: 'Our prefered Partners',
                state: 'admin.dss1'
            }]
        }, {
            name: 'Orders',
            type: 'link',
            icon: 'fa fa-shopping-cart',
            state: 'admin.dss1'
        }, {
            name: 'Revenues',
            type: 'link',
            icon: 'fa fa-money',
            state: 'admin.dss1'
        }, {
            name: 'Inbox',
            type: 'link',
            icon: 'fa fa-envelope',
            state: 'admin.dss1'
        }, {
            name: 'Newsletter',
            type: 'link',
            icon: 'fa fa-newspaper-o',
            state: 'admin.dss1'
        }, {
            name: 'Design',
            type: 'toggle',
            icon: 'fa fa-puzzle-piece',
            pages: [{
                name: 'Slideshare',
                state: 'admin.dss1'
            }, {
                name: 'Partners',
                state: 'admin.dss1'
            }, {
                name: 'Collaboration',
                state: 'admin.dss1'
            }]
        }, {
            name: 'Payments',
            type: 'toggle',
            icon: 'fa fa-credit-card-alt',
            pages: [{
                name: 'Paypal',
                state: 'admin.dss1'
            }, {
                name: 'Mangopay',
                state: 'admin.dss1'
            }]
        }, {
            name: 'Shipping',
            type: 'link',
            icon: 'fa fa-truck',
            state: 'admin.dss1'
        }, {
            name: 'EMH voucher',
            type: 'link',
            icon: 'fa fa-leaf',
            state: 'admin.dss1'
        }, {
            name: 'EMH beauty box',
            type: 'link',
            icon: 'fa fa-camera',
            state: 'admin.dss1'
        }, {
            name: 'Statistiques',
            type: 'link',
            icon: 'fa fa-bar-chart',
            state: 'admin.dss1'
        }, {
            name: 'Maintenance',
            type: 'toggle',
            icon: 'fa fa-shield',
            pages: [{
                name: 'Landing page',
                state: 'admin.dss1'
            }, {
                name: 'Landing page',
                state: 'admin.dss1'
            }]
        }, {
            name: 'Subscription plan',
            type: 'link',
            icon: 'fa fa-clock-o',
            state: 'admin.dss1'
        }, {
            name: 'Language Editor',
            type: 'heading',
            children: [{
                name: 'English',
                type: 'toggle',
                icon: 'fa fa-language',
                pages: [{
                    name: 'Back end',
                    state: 'admin.dss1'
                }, {
                    name: 'Front end',
                    state: 'admin.dss1'
                }]
            }, {
                name: 'Spanish',
                type: 'toggle',
                icon: 'fa fa-language',
                pages: [{
                    name: 'Back end',
                    state: 'admin.dss1'
                }, {
                    name: 'Front end',
                    state: 'admin.dss1'
                }]
            }, {
                name: 'German',
                type: 'toggle',
                icon: 'fa fa-language',
                pages: [{
                    name: 'Back end',
                    state: 'admin.dss1'
                }, {
                    name: 'Front end',
                    state: 'admin.dss1'
                }]
            }, {
                name: 'French',
                type: 'toggle',
                icon: 'fa fa-language',
                pages: [{
                    name: 'Back end',
                    state: 'admin.dss1'
                }, {
                    name: 'Front end',
                    state: 'admin.dss1'
                }]
            }]
        }
    ];

    var defaultMenu2 = [
	    {
	        name: 'Dashboard',
	        type: 'link',
	        icon: 'fa fa-cog',
	        state: 'admin.dss1'
	    },
	    {
	        name: 'Message & notification',
	        type: 'toggle',
	        icon: 'fa fa-envelope',
	        state: 'admin.dss1',
	        pages: [
	            {
	                name: 'Newsletter',
	                state: 'admin.dss1'
	            },
	            {
	                name: 'Inbox',
	                state: 'admin.dss1'
	            },
	            {
	                name: 'Sent',
	                state: 'admin.dss1'
	            },
	            {
	                name: 'Notification',
	                state: 'admin.dss1'
	            }
	        ]
	    },{
	        name: 'User managerment',
	        type: 'heading' , 
	        icon: 'fa fa-users',
	        children: [
	            {
	                name: 'Administator',
	                state: 'admin.dss1'
	            }, 
	            {
	                name: 'Moderators',
	                state: 'admin.dss1'
	            },
	            {
	                name: 'Moderator',
	                state: 'admin.dss1'
	            },
	            {
	                name: 'Customer',
	                state: 'admin.dss1'
	            },
	            {
	                name: 'Seller',
	                state: 'admin.dss1',
	                type: 'toggle',
	                pages: [
	                    {
	                        name: 'Private Seller',
	                        state: 'admin.dss1'
	                    },
	                    {
	                        name: 'Pay plan seller',
	                        state: 'admin.dss1'
	                    },
	                    {
	                        name: 'Free plan seller',
	                        state: 'admin.dss1'
	                    }
	                ]
	            },
	            {
	                name: 'Social connect',
	                state: 'admin.dss1',
	                type: 'toggle',
	                pages: [
	                    {
	                        name: 'Bloggers',
	                        state: 'admin.dss1'
	                    },
	                    {
	                        name: 'Facebook page',
	                        state: 'admin.dss1'
	                    },
	                ]
	            },
	        ]
	    },
	    {
	        name: 'Business managerment',
	        type: 'heading' , 
	        icon: 'fa fa-sitemap',
	        state: 'admin.dss1',
	        children: [
				{
	                name: 'Categories',
	                state: 'admin.dss1'
	            },
	            {
	                name: 'Store',
	                state: 'admin.dss1'
	            },
	            {
	                name: 'Products',
	                state: 'admin.dss1'
	            },
	            {
	                name: 'Customer',
	                state: 'admin.dss1'
	            },
	            {
	                name: 'Vendors / Seller',
	                state: 'admin.dss1'
	            },
	            {
	                name: 'Advertisements',
	                state: 'admin.dss1',
	                type: 'toggle',
	                pages: [
	                    {
	                        name: 'Affiliation',
	                        state: 'admin.dss1'
	                    },
	                    {
	                        name: 'Our prefered Partners',
	                        state: 'admin.dss1'
	                    }
	                ]
	            },            
	            {
	                name: 'Orders',
	                state: 'admin.dss1'
	            },
	            {
	                name: 'Shipping',
	                state: 'admin.dss1'
	            },
	            {
	                name: 'Return',
	                state: 'admin.dss1'
	            },
	            {
	                name: 'Tax',
	                state: 'admin.dss1'
	            },
	            {
	                name: 'Marketing schedule',
	                state: 'admin.dss1'
	            },
	            {
	                name: 'Payments',
	                state: 'admin.dss1',
	                type: 'toggle',
	                pages: [
	                    {
	                        name: 'Paypal',
	                        state: 'admin.dss1'
	                    },
	                    {
	                        name: 'Mangopay',
	                        state: 'admin.dss1'
	                    }
	                ]
	            },
	        ]
	    },
	    {
	        name: 'System control',
	        type: 'heading',
	        icon: 'fa fa-shield',
	        state: 'admin.dss1',
	        pages: [
	            {
	                name: 'Customer Service',
	                state: 'admin.dss1',
	                type: 'toggle',
	                pages: [
	                    {
	                        name: 'News',
	                        state: 'admin.dss1'
	                    }, 
	                    {
	                        name: 'FAQs',
	                        state: 'admin.dss1'
	                    }, 
	                    {
	                        name: 'About EMH',
	                        state: 'admin.dss1'
	                    }, 
	                    {
	                        name: 'Privacy Policy',
	                        state: 'admin.dss1'
	                    }, 
	                    {
	                        name: 'Terms & Conditions',
	                        state: 'admin.dss1'
	                    }, 
	                    {
	                        name: 'Delivery Informations',
	                        state: 'admin.dss1'
	                    }
	                ]
	            },
	            {
	                name: 'Design/UI control',
	                state: 'admin.dss1',
	                type: 'toggle',
	                pages: [
	                    {
	                        name: 'Slideshare',
	                        state: 'admin.dss1'
	                    }, 
	                    {
	                        name: 'Partners',
	                        state: 'admin.dss1'
	                    }, 
	                    {
	                        name: 'Collaboration',
	                        state: 'admin.dss1'
	                    }  
	                ]
	            }
	        ]
	    },
	    {
	        name: 'Event',
	        type: 'toggle',
	        icon: 'fa fa-clock-o',
	        state: 'admin.dss1',
	        pages: [
	            {
	                name: 'Subscription plan',
	                state: 'admin.dss1'
	            }
	        ]
	    },
	    {
	        name: 'Statistics',
	        type: 'toggle',
	        icon: 'fa fa-bar-chart',
	        state: 'admin.dss1',
	        pages: [
	            {
	                name: 'Revenues',
	                state: 'admin.dss1'
	            }
	        ]
	    },
	    {
	        name: 'Setting',
	        type: 'toggle',
	        icon: 'fa fa-cog',
	        state: 'admin.dss1',
	        pages: [
	            {
	                name: 'Payments setting',
	                state: 'admin.dss1'
	            }
	        ]
	    },
	    {
	        name: 'EMH service',
	        type: 'toggle',
	        icon: 'fa fa-leaf',
	        state: 'admin.dss1',
	        pages: [
	            {
	                name: 'EMH TV',
	                state: 'admin.dss1'
	            },
	            {
	                name: 'EMH voucher',
	                state: 'admin.dss1'
	            },
	            {
	                name: 'EMH beauty box',
	                state: 'admin.dss1'
	            }
	        ]
	    },
	    {
	        name: 'Maintenance',
	        type: 'toggle',
	        icon: 'fa fa-shield',
	        state: 'admin.dss1',
	        pages: [
	            {
	                name: 'Landing page 1',
	                state: 'admin.dss1'
	            },
	            {
	                name: 'Landing page 2',
	                state: 'admin.dss1'
	            }
	        ]
	    },
	    {
	        name: 'Language Editor',
	        type: 'heading',
	        children: [{
	            name: 'Country managerment',
	            type: 'toggle',
	            icon: 'fa fa-language',
	            pages: [{
	                name: 'Back end',
	                state: 'admin.dss1'
	            }, {
	                name: 'Front end',
	                state: 'admin.dss1'
	            }]
	        }, {
	            name: 'Spanish',
	            type: 'toggle',
	            icon: 'fa fa-language',
	            pages: [{
	                name: 'Back end',
	                state: 'admin.dss1'
	            }, {
	                name: 'Front end',
	                state: 'admin.dss1'
	            }]
	        }, {
	            name: 'German',
	            type: 'toggle',
	            icon: 'fa fa-language',
	            pages: [{
	                name: 'Back end',
	                state: 'admin.dss1'
	            }, {
	                name: 'Front end',
	                state: 'admin.dss1'
	            }]
	        }, {
	            name: 'French',
	            type: 'toggle',
	            icon: 'fa fa-language',
	            pages: [{
	                name: 'Back end',
	                state: 'admin.dss1'
	            }, {
	                name: 'Front end',
	                state: 'admin.dss1'
	            }]
	        }]
	    }
	];

    mDatabaseController.fs.writeFileSync(_dir_path + '/database/menu_manager/admin_menu.json', JSON.stringify(defaultMenu));
    res.json(mDatabaseController.generateMessageToClient({ menu:  defaultMenu2 , lang: defaultShortCode  }));


}