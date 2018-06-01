
var CT = require('./modules/country-list');
var AM = require('./modules/account-manager');
var EM = require('./modules/email-dispatcher');
var JM = require('./modules/json-manager');
 
module.exports = function(app) {
	app.get('/', function(req, res){
		res.render('index');
				
		});

	app.get('/customiser', function(req, res){
			res.render('customiser');
		
		});


// main login page //
	app.get('/admin', function(req, res){
	// check if the user's credentials are saved in a cookie //
		if (req.cookies.user == undefined || req.cookies.pass == undefined){
			res.render('login', { title: 'Hello - Please Login To Your Account' });
		}	else{
	// attempt automatic login //
			AM.autoLogin(req.cookies.user, req.cookies.pass, function(o){
				if (o != null){
				    req.session.user = o;
					res.redirect('/home');
				}	else{
					res.render('login', { title: 'Hello - Please Login To Your Account' });
				}
			});
		}
	});
	
	app.post('/admin', function(req, res){
		AM.manualLogin(req.body['user'], req.body['pass'], function(e, o){
			if (!o){
				res.status(400).send(e);
			}	else{
				req.session.user = o;
				if (req.body['remember-me'] == 'true'){
					res.cookie('user', o.user, { maxAge: 900000 });
					res.cookie('pass', o.pass, { maxAge: 900000 });
				}
				res.status(200).send(o);
			}
		});
	});


	
// logged-in user homepage //
	
	app.get('/home', function(req, res) {
		if (req.session.user == null){
	// if user is not logged-in redirect back to login page //
			res.redirect('/');
		}	else{
			res.render('home', {
				title : 'Control Panel',
				countries : CT,
				udata : req.session.user
			});
		}
	});
	
	app.post('/home', function(req, res){
		if (req.session.user == null){
			res.redirect('/');
		}	else{
			AM.updateAccount({
				id		: req.session.user._id,
				name	: req.body['name'],
				email	: req.body['email'],
				pass	: req.body['pass'],
				country	: req.body['country']
			}, function(e, o){
				if (e){
					res.status(400).send('error-updating-account');
				}	else{
					req.session.user = o;
			// update the user's login cookies if they exists //
					if (req.cookies.user != undefined && req.cookies.pass != undefined){
						res.cookie('user', o.user, { maxAge: 900000 });
						res.cookie('pass', o.pass, { maxAge: 900000 });	
					}
					res.status(200).send('ok');
				}
			});
		}
	});


	app.post('/logout', function(req, res){
		res.clearCookie('user');
		res.clearCookie('pass');
		req.session.destroy(function(e){ res.status(200).send('ok'); });
	});
	
// creating new accounts //
	
	app.get('/signup', function(req, res) {
		res.render('signup', {  title: 'Signup', countries : CT });
	});
	
	app.post('/signup', function(req, res){
		AM.addNewAccount({
			name 	: req.body['name'],
			email 	: req.body['email'],
			user 	: req.body['user'],
			pass	: req.body['pass'],
			country : req.body['country']
		}, function(e){
			if (e){
				res.status(400).send(e);
			}	else{
				res.status(200).send('ok');
			}
		});
	});

// password reset //

	app.post('/lost-password', function(req, res){
	// look up the user's account via their email //
		AM.getAccountByEmail(req.body['email'], function(o){
			if (o){
				EM.dispatchResetPasswordLink(o, function(e, m){
				// this callback takes a moment to return //
				// TODO add an ajax loader to give user feedback //
					if (!e){
						res.status(200).send('ok');
					}	else{
						for (k in e) console.log('ERROR : ', k, e[k]);
						res.status(400).send('unable to dispatch password reset');
					}
				});
			}	else{
				res.status(400).send('email-not-found');
			}
		});
	});

	app.get('/reset-password', function(req, res) {
		var email = req.query["e"];
		var passH = req.query["p"];
		AM.validateResetLink(email, passH, function(e){
			if (e != 'ok'){
				res.redirect('/');
			} else{
	// save the user's email in a session instead of sending to the client //
				req.session.reset = { email:email, passHash:passH };
				res.render('reset', { title : 'Reset Password' });
			}
		})
	});
	
	app.post('/reset-password', function(req, res) {
		var nPass = req.body['pass'];
	// retrieve the user's email from the session to lookup their account and reset password //
		var email = req.session.reset.email;
	// destory the session immediately after retrieving the stored email //
		req.session.destroy();
		AM.updatePassword(email, nPass, function(e, o){
			if (o){
				res.status(200).send('ok');
			}	else{
				res.status(400).send('unable to update password');
			}
		})
	});
	
// view & delete accounts //
	
	app.get('/print', function(req, res) {
		AM.getAllRecords( function(e, accounts){

			if (req.session.user == null){
				// if user is not logged-in redirect back to login page //
						res.redirect('/');
					}	else{
						res.render('print', { title : 'Account List', accts : accounts });
					}
					
			
		})
	});

	//view all saved JSON data
	app.get('/viewcomponents', function(req, res){

		if (req.session.user == null){
			// if user is not logged-in redirect back to login page //
					res.redirect('/');
				}	else{
					res.render('viewcomponents', 
					{
						controlls:JM.getControlls(),
						hems:JM.getHems(),
						valances:JM.getValances(),
						tubes:JM.getTubes(),
						fabrics:JM.getFabrics(),
						trims:JM.getTrims(),
						pulls:JM.getPulls()
					})
				}

		
		
	});

	app.get('/addcomponent', function(req, res){

		if (req.session.user == null){
			// if user is not logged-in redirect back to login page //
					res.redirect('/');
				}	else{
					res.render('addcomponent')
				}

		
		
	});

	//add component routes

	app.post('/addcontroller', function(req, res){

		if (req.session.user == null){
			res.redirect('/');
		}	else{
			JM.addNewController({
				Name: req.body['Name'],
				Tmax: req.body['Tmax'],
				imagePath: req.body['imagePath'],
				minWidth: req.body['minWidth'],
				type: req.body['type']
			});

			
		}

		res.render('addcomponent')

	});

	app.post('/addhem', function(req, res){

		if (req.session.user == null){
			res.redirect('/');
		}	else{
			JM.addNewHem({
				hemType: req.body['hemType'],
				WspH: req.body['WspH'],
				finishes:req.body['finishes'].split(','),
				imagePath: req.body['imagePath']
			});

		}

		res.render('addcomponent')

	});

	app.post('/addvalance', function(req, res){

		if (req.session.user == null){
			res.redirect('/');
		}	else{
			JM.addNewValance({
				name: req.body['name'],
				Dcs: req.body['Dcs'],
				finishes:req.body['finishes'].split(','),
				imagePath: req.body['imagePath']
			});

		}

		res.render('addcomponent')

	});


	app.post('/addfabric', function(req, res){

		if (req.session.user == null){
			res.redirect('/');
		}	else{
			JM.addNewFabric({
				FabricDescription: req.body['FabricDescription'],
				RollWidth: req.body['RollWidth'],
				RailroadableRR: req.body['RailroadableRR'],
				WspF: req.body['WspF'],
				ThicknessTk: req.body['ThicknessTk'],
				Tadm: req.body['Tadm'],
				BlindType: req.body['BlindType'],
				imagePath: req.body['imagePath']
			});

		}

		res.render('addcomponent')

	});

	app.post('/addtrim', function(req, res){

		if (req.session.user == null){
			res.redirect('/');
		}	else{
			JM.addNewTrim({
				name: req.body['name'],
				collection: req.body['collection'],
				colors:req.body['colors'].split(','),
				imagePath: req.body['imagePath']
			});

		}

		res.render('addcomponent')

	});

	app.post('/addpull', function(req, res){

		if (req.session.user == null){
			res.redirect('/');
		}	else{
			JM.addNewPull({
				name: req.body['name'],
				collection: req.body['collection'],
				colors:req.body['colors'].split(','),
				imagePath: req.body['imagePath']
			});

		}

		res.render('addcomponent')

	});

	app.post('/addmotorizedcontroltype', function(req, res){

		if (req.session.user == null){
			res.redirect('/');
		}	else{
			JM.addNewMCT({
				name: req.body['name'],
				imagePath: req.body['imagePath']
			});

		}

		res.render('addcomponent')

	});

	app.post('/addpoweroption', function(req, res){

		if (req.session.user == null){
			res.redirect('/');
		}	else{
			JM.addNewPowerOption({
				name: req.body['name'],
				imagePath: req.body['imagePath']
			});

		}

		res.render('addcomponent')

	});

	app.post('/addremoteoption', function(req, res){

		if (req.session.user == null){
			res.redirect('/');
		}	else{
			JM.addNewRemoteOption({
				name: req.body['name'],
				imagePath: req.body['imagePath']
			});

		}

		res.render('addcomponent')

	});

	//delete components

	app.post('/deleteControll', function(req, res){

		if (req.session.user == null){
			res.redirect('/');
		}	else{
			JM.deleteControll({
				controllDeleteIndex: req.body['controllDeleteIndex']
			});
		}

	});

	app.post('/deleteHem', function(req, res){

		if (req.session.user == null){
			res.redirect('/');
		}	else{
			JM.deleteHem({
				hemDeleteIndex: req.body['hemDeleteIndex']
			});
		}

	});

	app.post('/deleteValance', function(req, res){

		if (req.session.user == null){
			res.redirect('/');
		}	else{
			JM.deleteValance({
				valanceDeleteIndex: req.body['valanceDeleteIndex']
			});
		}

	});

	app.post('/deleteFabric', function(req, res){

		if (req.session.user == null){
			res.redirect('/');
		}	else{
			JM.deleteFabric({
				fabricDeleteIndex: req.body['fabricDeleteIndex']
			});
		}

	});

	app.post('/deleteTrim', function(req, res){

		if (req.session.user == null){
			res.redirect('/');
		}	else{
			JM.deleteFabric({
				trimDeleteIndex: req.body['trimDeleteIndex']
			});
		}

	});

	app.post('/deletePull', function(req, res){

		if (req.session.user == null){
			res.redirect('/');
		}	else{
			JM.deleteFabric({
				pullDeleteIndex: req.body['pullDeleteIndex']
			});
		}

	});




	app.get('/blindData', function(req, res){
		//responde with parsed data 
		res.send(JM.blindData());


	});


	//get and post to order data

	app.get('/orderdata', function(req, res){

		if (req.session.user == null){
			// if user is not logged-in redirect back to login page //
					res.redirect('/');
				}	else{
					res.render('orderData', 
					{
						orderData:JM.getOrderData()
					})
				}

	});






	app.post('/delete', function(req, res){
		AM.deleteAccount(req.body.id, function(e, obj){
			if (!e){
				res.clearCookie('user');
				res.clearCookie('pass');
				req.session.destroy(function(e){ res.status(200).send('ok'); });
			}	else{
				res.status(400).send('record not found');
			}
	    });
	});
	
	app.get('/reset', function(req, res) {
		AM.delAllRecords(function(){
			res.redirect('/print');	
		});
	});
	
	app.get('*', function(req, res) { res.render('404', { title: 'Page Not Found'}); });

};
