var ApiManager = {


//--------------------------------------------------------------------------------------//
	//-----------------------
	//  USER API LIST
	//-----------------------
	// get captcha api
	'api_get_captcha' 								: '/api/post/get_captcha',

	// token manager api
	'api_request_get_token' 						: '/api/post/get_token',
	'api_request_check_valid_token' 				: '/api/post/check_valid_token',

	// guest user api
	'api_user_login' 								: '/login',
	'api_user_login_with_social' 					: '/login_with_social',
	'api_user_logout' 								: '/api/logout',
	'api_check_user_exist' 							: '/api/post/check_user_exist',
	'api_register_user' 							: '/api_public/register',
	'api_register_user_with_social' 				: '/api_public/register_user_with_social',
	'api_register_pay_plan_seller'					: '/api_public/api_register_pay_plan_seller',
	'api_register_free_plan_seller'					: '/api_public/api_register_free_plan_seller',
	
	

	// normal user api
	'api_edit_user_profile' 						: '/api/post/edit_profile',
	'api_change_password' 							: '/api/post/change_password',
	'upload_user_avatar' 							: '/api/post/edit_profile',

	// user api ( for admin)
	'api_admin_panel_login' 						: '/api/admincp/login',
	'api_get_all_user' 								: '/api/admincp/get_all_user',
	'get_admin_menu_left' 							: '/api/admincp/get_admin_menu_left',
	'api_change_user_profile' 						: '/api/change_profile',
	'api_create_user' 								: '/api/create_user',
	'api_suspend_user' 								: '/api/suspend_user',

	// user api ( for seller)
	'api_seller_panel_login' 						: '/api/seller/login',

	// user api ( for customer)
	
//--------------------------------------------------------------------------------------//
	//-----------------------
	// ROLE API
	//-----------------------
	'api_get_role_list' 							: '/api/api_get_role_list',

//--------------------------------------------------------------------------------------//
	//-----------------------
	// ADMIN API
	//-----------------------



//--------------------------------------------------------------------------------------//
	//-----------------------
	// STORE API
	//-----------------------

//--------------------------------------------------------------------------------------//
	//-----------------------
	// SELLER API
	//-----------------------
	'api_create_seller' 							: '/api/seller/create',
	'api_list_all_seller' 							: '/api/seller/get_list',
	'api_find_one_seller' 							: '/api/seller/get_one',
	'api_edit_seller'	 							: '/api/seller/edit',
	'api_delete_seller' 							: '/api/seller/delete',

//--------------------------------------------------------------------------------------//
	//-----------------------
	// AFFILIATE API 
	//-----------------------

//--------------------------------------------------------------------------------------//
	//-----------------------
	// CUSTOMER API
	//-----------------------


//--------------------------------------------------------------------------------------//
	//-----------------------
	// PRODUCT API 
	//-----------------------
	'api_get_product'								: '/api/get_list_product',
	'api_get_product_info'							: '/api/get_product_info',
	'api_update_product'							: '/api/update_product_info',
	'api_add_product_to_wish_list'					: '/api/add_product_to_wish_list',
	'api_add_product_cart'							: '/api/add_product_to_cart',
	'api_remove_product_from_wish_list'				: '/api/remove_product_from_wish_list',
	'api_remove_product_from_cart'					: '/api/remove_product_from_cart',

	'api_get_product_template'						: '/api/get_product_template',
	'api_edit_product_template'						: '/api/edit_product_template',

//--------------------------------------------------------------------------------------//
	//-----------------------
	// SALE & COUPON API
	//-----------------------

//--------------------------------------------------------------------------------------//
	//-----------------------
	// RETURN API
	//-----------------------

//--------------------------------------------------------------------------------------//
	//-----------------------
	// ORDER API
	//-----------------------


//--------------------------------------------------------------------------------------//
	//---------------------------------
	// TRANSACTION HISTORY API
	//---------------------------------

//--------------------------------------------------------------------------------------//
	//-----------------------
	// RETURN API
	//-----------------------


//--------------------------------------------------------------------------------------//
	//-----------------------
	// LOCATION
	//-----------------------


//--------------------------------------------------------------------------------------//
	//-----------------------
	// TAX API
	//-----------------------

//--------------------------------------------------------------------------------------//
	//-----------------------
	// LANGUAGE TEXT API
	//-----------------------

//--------------------------------------------------------------------------------------//
	//-----------------------
	// STYPE TEXT API
	//-----------------------


//--------------------------------------------------------------------------------------//
	//-----------------------
	// STATIC PAGE API // may trang web tinh
	//-----------------------

//--------------------------------------------------------------------------------------//
	//-----------------------
	// RETURN API
	//-----------------------

//--------------------------------------------------------------------------------------//
	//-----------------------
	// PREVIEW API
	//-----------------------


//--------------------------------------------------------------------------------------//
	//-----------------------
	// RETURN API
	//-----------------------



};



module.exports = ApiManager;