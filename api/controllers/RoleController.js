/**
 * RoleController
 *
 * @description :: Server-side logic for managing roles
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	list:function(req, res){
        Role.find({}).exec(function(err, role){
            if(err){
                res.send(500, {error: 'Database Error'});
            }
            res.view('role/list', {roles:role});
        });
    },
    add: function(req, res){
        res.view('role/add');
    },
    create:function(req, res){
        var name = req.body.name;
        var employeename = req.body.employeename;

        Role.create({name:name, employeename:employeename}).exec(function(err){
            if(err){
                res.send(500, {error: 'Database Error'});
            }

            res.redirect('/role/list');
        });
    },
    delete: function(req, res){
        Role.destroy({id:req.params.id}).exec(function(err){
            if(err){
                res.send(500, {error: 'Database Error'});
            }

            res.redirect('/role/list');
        });

        return false;
    },
    edit: function(req, res){
        Role.findOne({id:req.params.id}).exec(function(err, role){
            if(err){
                res.send(500, {error: 'Database Error'});
            }

            res.view('role/edit', {role:role});
        });
    },
    update: function(req, res){
        var name = req.body.name;
        var employeename = req.body.employeename;

        Role.update({id: req.params.id},{employeename:employeename, roles:roles}).exec(function(err){
            if(err){
                res.send(500, {error: 'Database Error'});
            }

            res.redirect('/role/list');
        });

        return false;
    }
};

