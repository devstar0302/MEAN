//
// API FOR FRONT-END FOR USER
//
var UserApi = function( app , _dir_path , mDatabaseController , mConstantModel , mApiConstant ) {

    app.post(mApiConstant.api_get_role_list, function(req, res) {
      api_get_role_list(req , res , app , _dir_path , mDatabaseController , mConstantModel , mApiConstant);
    });

    // 
    // - post method
    /**
     * @description  
     * - require get token
     * @type_request
     * - post / get
     * @param
     * @return 
     */
    app.post(mApiConstant.api_request_get_token, function(req , res){
      api_request_get_token(req , res , app , _dir_path , mDatabaseController , mConstantModel , mApiConstant);
    });

    /**
     * @description  
     * - 
     * @type_request
     * - post
     * @param
     * - token
     * @return 
     * - 
     */
    app.post(mApiConstant.api_request_check_valid_token, function(req , res){
      api_request_check_valid_token(req , res , app , _dir_path , mDatabaseController , mConstantModel , mApiConstant);
    });


    /**
     * @description  
     * - 
     * @type_request
     * - post
     * @param
     * - token
     * - user_name
     * @return 
     * - 
     */
    app.post(mApiConstant.api_check_user_exist , function(req , res){
      api_check_user_exist(req , res , app , _dir_path , mDatabaseController , mConstantModel , mApiConstant);
    });


    /**
     * @description  
     * - 
     * @type_request
     * - post/get
     * @param
     * - token
     * - user_name
     * - password
     * @return 
     * - 
     */
     app.post(mApiConstant.api_user_login, function(req, res) {
      api_user_login(req , res , app , _dir_path , mDatabaseController , mConstantModel , mApiConstant);
    });

    /**
     * @description  
     * - 
     * @type_request
     * - post/get
     * @param
     * - 
     * @return 
     * - 
     */
    app.post(mApiConstant.api_user_login_with_social, function(req, res) {
      api_user_login_with_social(req , res , app , _dir_path , mDatabaseController , mConstantModel , mApiConstant);
    });


    /**
     * @description  
     * - 
     * @type_request
     * - post/get
     * @param
     * - token
     * - user_name
     * - password
     * @return 
     * - 
     */
    app.post(mApiConstant.api_user_logout, function(req, res) {
      api_user_logout(req , res , app , _dir_path , mDatabaseController , mConstantModel , mApiConstant);
    });

    
    

   };

   module.exports = UserApi;

/**
 * CHECK GET TOKEN
 * return:
 * - Token
 * - 
 */
 function api_request_get_token(req, res , app , _dir_path , mDatabaseController , mConstantModel , mApiConstant) {
  var client_info = {
        agent: req.headers['user-agent'], // User Agent we get from headers
        referrer: req.headers['referrer'], //  Likewise for referrer
        ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress, // Get IP - allow for proxy
        
      };
      console.log('client info ' + client_info.ip);
      var _token = mDatabaseController.generateToken();
      console.log(_token);
      mDatabaseController.getModelFromName(mConstantModel.MODEL_USER_TOKEN)({
        token: _token , client_info:client_info ,isValid:true }).save(function(err , token){
          if(err){
            res.json(mDatabaseController.generateErrorMessage(mDatabaseController.error_log.query_error));
            return;
          }   

          res.json(token);

        });


      }

function createToken(req , res ,mDatabaseController,mConstantModel, _user_id , _callback){
  var client_info = {
        agent: req.headers['user-agent'], // User Agent we get from headers
        referrer: req.headers['referrer'], //  Likewise for referrer
        ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress, // Get IP - allow for proxy
        
      };
      console.log('client info ' + client_info.ip);
      var _token = mDatabaseController.generateToken();
      console.log(_token);
      mDatabaseController.getModelFromName(mConstantModel.MODEL_USER_TOKEN)({
        token: _token , client_info:client_info ,isValid:true , fromUser: _user_id }).save(function(err , token){
          if(err){
            res.json(mDatabaseController.generateErrorMessage(mDatabaseController.error_log.query_error));
            return;
          }   

          _callback(_token);

        });
}

/**
 * CHECK VALID TOKEN
 * 
 */
 function api_request_check_valid_token(req, res , app , _dir_path , mDatabaseController , mConstantModel , mApiConstant) {
  var _token = req.body.token;
  mDatabaseController.getModelFromName(mConstantModel.MODEL_USER_TOKEN).findOne({token: _token}).exec(function(err , token){
    if(err){
      res.json(mDatabaseController.generateErrorMessage(mDatabaseController.error_log.query_error));
      return;
    }
    if(typeof token == 'undefined' || token.isValid == false){
      res.json(mDatabaseController.generateErrorMessage(mDatabaseController.error_log.invalid_token));
      return;
    }

    var timeCreate = new Date(token.dateCreated);
    var timenow = new Date();

    var diff_time = mDatabaseController.subtract2Day(timeCreate , timenow);
    console.log(' time create = ' + timeCreate);
    console.log(' time now = ' + timenow);
    console.log(diff_time);
        if(diff_time > 48 ){ // token is more than 48 hour
          token.isValid = false;
          res.json(mDatabaseController.generateErrorMessage(mDatabaseController.error_log.invalid_token));
          token.save();
        }else{
          res.json( mDatabaseController.generateMessageToClient(token));
        }
      });
};   


/**
 * CHECK USER IS EXIST
 */
 function api_check_user_exist(req, res , app , _dir_path , mDatabaseController , mConstantModel , mApiConstant) {

  var user_account_name = req.body.email;
  mDatabaseController.getModelFromName(mConstantModel.MODEL_ACCOUNT_LOGIN_DETAIL).findOne({value: user_account_name}).exec(function(err , account){
    if(err){
      res.json(mDatabaseController.generateErrorMessage(mDatabaseController.error_log.query_error));
      return;
    }
    if(typeof account == 'undefined' || account == null ){
      res.json( mDatabaseController.generateMessageToClient({}));
      return;
    }
    res.json(mDatabaseController.generateErrorMessage(mDatabaseController.error_log.user_name_exist));
  });
}


/**
 * LOGIN ADMIN
 */
 function api_admin_panel_login(req, res , app , _dir_path , mDatabaseController , mConstantModel , mApiConstant) {

  var account_name = req.body.email;
  var password = req.body.password;
  mDatabaseController.getModelFromName(mConstantModel.MODEL_USER).find().populate({
    path: 'account' ,
    match: { value: account_name }
    
  }).populate(mConstantModel.MODEL_USER_ROLE).exec(function(err , account){
    if(err){
      res.json(mDatabaseController.generateErrorMessage(mDatabaseController.error_log.query_error));
      return;
    }
    if(typeof account == 'undefined'){
      res.json(mDatabaseController.generateErrorMessage(mDatabaseController.error_log.user_name_not_exist));
      return;
    }
    if(account.role.type != 20 && account.role.type != 21 && account.role.type != 22){
      res.json(mDatabaseController.generateErrorMessage(mDatabaseController.error_log.not_enough_permission));
    }
    var genPassword = mDatabaseController.generatePassword(password , account.salt);
    if(genPassword == account.password){
      
      // save token to user
      user.password = undefined;
      user.salt = undefined;
      createToken(req, res ,mDatabaseController,mConstantModel, account._id , function(token){
        res.json( mDatabaseController.generateMessageToClient({token:_token, user: user}));
      } );
    }else{
      res.json(mDatabaseController.generateErrorMessage(mDatabaseController.error_log.password_not_match));
      
    }
  });
}

/**
 * LOGIN WITH EMAIL / USER NAME
 */
function api_user_login(req, res , app , _dir_path , mDatabaseController , mConstantModel , mApiConstant) {
  console.log(" " + req.body);
  
  
  var account_name = req.body.email;
  var password = req.body.password;
  console.log(" " + account_name + " " + password) ;
  mDatabaseController.getModelFromName(mConstantModel.MODEL_ACCOUNT_LOGIN_DETAIL).findOne({value: account_name}).exec(function(err , account){
    if(err){
      console.log('not found');
      res.json(mDatabaseController.generateErrorMessage(mDatabaseController.error_log.query_error));
      return;
    }
    if(account == null){
      console.log('not found 2');
      res.json(mDatabaseController.generateErrorMessage(mDatabaseController.error_log.user_name_not_exist));
      return;
    }
    mDatabaseController.getModelFromName(mConstantModel.MODEL_USER).findOne({account: account._id}).populate('account').populate('role').exec(function(err, user){
      if(err){
        console.log('not found 3');
        res.json(mDatabaseController.generateErrorMessage(mDatabaseController.error_log.query_error));
        return;
      }
      if(user == null){
        console.log('not found 4');
        res.json(mDatabaseController.generateErrorMessage(mDatabaseController.error_log.user_name_not_exist));
        return;
      }
      var genPassword = mDatabaseController.generatePassword(password , user.salt);
      console.log(genPassword);
      if(genPassword == user.password){
        user.password = undefined;
        user.salt = undefined;
        var _roleId = user.role.type;
        var returnuser = {account: user.account , email: '', isActive: 1 , registerDate: user.registerDate, roleId: _roleId};
        createToken(req, res , mDatabaseController,mConstantModel,account._id , function(_token){
          res.json( mDatabaseController.generateMessageToClient({token:_token, user: returnuser}));
        } );
      }else{
        res.json(mDatabaseController.generateErrorMessage(mDatabaseController.error_log.password_not_match));
        return;
      }
    });
  });
}

/**
 * LOGIN WITH SOCIAL ACCOUNT
 */
 function api_user_login_with_social(req, res , app , _dir_path , mDatabaseController , mConstantModel , mApiConstant) {
  var token = req.body.token;
  var social_account = req.body.scoial_id;
  var scoial_data = req.body.social_data;

  mDatabaseController.getModelFromName(mConstantModel.MODEL_ACCOUNT_LOGIN_DETAIL).findOne({value: user_account_name}).exec(function(err , account){

  });
}



/**
 * USER LOGOUT
 */
 function api_user_logout(req, res , app , _dir_path , mDatabaseController , mConstantModel , mApiConstant) {
  var _token = req.body.token;
  mDatabaseController.getModelFromName(mConstantModel.MODEL_USER_TOKEN).findOne({token: _token}).exec(function(err , token){
    if(err){
      res.json(mDatabaseController.generateErrorMessage(mDatabaseController.error_log.query_error));
      return;
    }
    token.isValid = false;
    token.save(function(err){
      if(err){
        res.json(mDatabaseController.generateErrorMessage(mDatabaseController.error_log.query_error));
      }
      res.json(mDatabaseController.generateMessageToClient({}));
    });
  });
}



function api_get_role_list(req , res , app , _dir_path , mDatabaseController , mConstantModel , mApiConstant){
  
  mDatabaseController.getModelFromName(mConstantModel.MODEL_USER_ROLE).find().exec(function(err , listRole){
  
    res.json(mDatabaseController.generateMessageToClient(listRole));
  });
}