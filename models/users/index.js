function get(req, res){
  var userapp = require('./userapp'),
    limit = require('../.././config/users').page.limit,
    seachkey = {},
    pagenum = 1;
    params = req.route.params;

  if(params[0]){
    var s = new RegExp(params[0]);
    seachkey = {$or:[{'eid':s},{'username':s},{'wangwang':s}]}
  }

  if(req.query.page && req.query.page > 1){
    pagenum = req.query.page;
  }

  if(! (req.session.user && req.session.user.type === '1')){
    seachkey['inoffice'] = {$in:['1', undefined]};  
  }
  var sort = {eid: 1};
  userapp.all(seachkey, pagenum, sort).then(function(data){
    res.render('users2',{
      title: 'users',
      users: data.data,
      count: Math.ceil(data.count/limit),
      page: pagenum,
      user: req.session.user,
      nav: 'users'
    })
  }, function(err){
    console.log(err);
  })
}

module.exports = {
  get: get
}