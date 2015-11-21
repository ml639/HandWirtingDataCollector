var express = require('express');
var ID = require('../models/imagedata');
var router = express.Router();
var index = 0;
var max = 40;
var images = ["_delta.png", "_psi.png", "_gamma.png", "_sigma.png",	
"_lambda.png", "_theta.png", "_omega.png", "_upsilon.png", 
"_phi.png", "_xi.png","_pi.png",
"alpha.png", "gamma.png", "omega.png", "tau.png", "varrho.png",
"beta.png",	"iota.png",	"phi.png", "theta.png", "varsigma.png",
"chi.png", "kappa.png", "pi.png","upsilon.png","vartheta.png",
"delta.png", "lambda.png", "psi.png", "varepsilon.png", "xi.png",
"epsilon.png","mu.png","rho.png","varphi.png","zeta.png",
"eta.png","nu.png","sigma.png", "varpi.png"];

var names = ["_delta", "_psi", "_gamma", "_sigma",	
"_lambda", "_theta", "_omega", "_upsilon", 
"_phi", "_xi","_pi",
"alpha", "gamma", "omega", "tau", "varrho",
"beta",	"iota",	"phi", "theta", "varsigma",
"chi", "kappa", "pi","upsilon","vartheta",
"delta", "lambda", "psi", "varepsilon", "xi",
"epsilon","mu","rho","varphi","zeta",
"eta","nu","sigma", "varpi"];

var name;
var n;
/* GET home page. */
router.get('/', function(req, res, next) {
	n=0;
	var randomnumber=Math.floor(Math.random()*99999999)
	checkUnique(randomnumber,res);
	// res.render('index', { imagename: "/images/"+images[0], name:names[0],
	// prev:"/symbol/0", next:"/symbol/1", identity:randomnumber,number:index});
});

// save data
router.get('/save/:n/:idt/:d', function(req, res, next) {
	n = parseInt(req.params.n);
	var data = req.params.d;
	data = data.replace(/[*_]/g,'/')
	name = req.params.idt;
	n = n+1;
	var image = ID({
		name: names[n],
		imagebase46: data,
		identity: name
	});
	
	image.save(function(err) {
		if (err){
			console.log('ERROR!');
			throw err;
		} 
		
	})
	if(n<40)
		res.redirect('/symbol/'+n);
	else
		res.redirect('/finished');
});

router.get('/finished', function(req, res, next) {
	n=0;
	name = Math.floor(Math.random()*99999999);
	var nx = n+1;
	var p = n-1;
	res.render('finished');
	//res.render('end', { imagename: "/images/"+images[n], name:names[n],
	//prev:"/symbol/"+p, next:"/symbol/"+nx, identity:name,number:n });
});

//redirect to symbol page
router.get('/symbol/:num', function(req, res, next) {
	var c = Math.floor(req.params.num);
	var nx = c+1;
	var p = c-1;
	if(p<0)
		p=0;
	if(!name)
		name=Math.floor(Math.random()*99999999);
	if(c<40){
		res.render('index', { imagename: "/images/"+images[c], name:names[c],
		prev:"/symbol/"+p, next:"/symbol/"+nx, identity:name,number:c });
	}else{
		res.redirect('/finished');
	}
});

function checkUnique(idn, res){
	ID.find({identity:idn}, function(err, result){
		if(err)
			console.log("ERROR"+err);
		if(result!=""){
			idn=Math.floor(Math.random()*99999999);
			checkUnique(idn, res);
		}
		else{
			res.render('index', { imagename: "/images/"+images[0], name:names[0],
	prev:"/symbol/0", next:"/symbol/1", identity:idn,number:n});
		}
	});
}

function checkUniqueEnd(idn, res){
	ID.find({identity:idn}, function(err, result){
		if(err)
			console.log("ERROR"+err);
		if(result!=""){
			idn=Math.floor(Math.random()*99999999);
			checkUnique(idn, res);
		}
		else{
			res.render('end', { imagename: "/images/"+images[index], name:names[index],
	prev:"/symbol/0", next:"/symbol/1", identity:idn,number:index });
		}
	});
}

module.exports = router;
