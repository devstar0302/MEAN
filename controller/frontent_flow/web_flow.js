var FrontentFlowApi = function( app , _dir_path , mDatabaseController , mConstantModel , mApiConstant ) {
  	
  	app.get('/', function(req, res){
        res.sendFile(_dir_path + '/public3/index.html');
    });

    

    // application -------------------------------------------------------------
    app.get('*', function(req, res) {
        res.sendfile('./public3/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });

};


module.exports = FrontentFlowApi;