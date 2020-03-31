var Pulic = function(app , express , _dir_path){
	app.use(express.static(_dir_path));
	app.use(express.static(_dir_path + '/public3'));
	app.use(express.static(_dir_path + '/public3/build'));
	app.use(express.static(_dir_path + '/public3/components'));
	app.use(express.static(_dir_path + '/public3/directives'));
	app.use(express.static(_dir_path + '/public3/css'));
	app.use(express.static(_dir_path + '/public3/img'));
	app.use(express.static(_dir_path + '/public3/js'));
	app.use(express.static(_dir_path + '/public3/pages'));
	app.use(express.static(_dir_path + '/public3/views'));
	app.use(express.static(_dir_path + '/public3/vendor'));
}

module.exports = Pulic;