/**
 * EmployeeController
 *
 * @description :: Server-side logic for managing employees
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	list:function(req, res){
        Employee.find({}).populate('roles').exec(function(err, employee){
            if(err){
                res.send(500, {error: 'Database Error'});
            }
            res.view('employee/list', {employees:employee});
        });
    },
    add: function(req, res){
        Role.find({}).exec(function(err, role) {
            if (err) {return res.serverError(err);}
            res.view({roles:role});
        });
    },
    create:function(req, res){
        
        var employeename = req.body.employeename;
        console.log(employeename);
        var roles = req.body.selectpicker;
        console.log(roles);

        Role.findOne({name:roles}).exec(function (err, role){
            if (err) {
                return res.serverError(err);
            }
            if (!role) {
                return res.notFound('Could not find role, sorry.');
            }

            console.log('Found "%s"', role.id);
            Employee.create({employeename:employeename, role:role}).exec(function(err, newEmployee){
                if(err){
                }
                console.log(role);
                newEmployee.roles.add(role.id);
                newEmployee.save();
                
            });

        });
        res.redirect('/employee/list');
    },
    delete: function(req, res){
        Employee.destroy({id:req.params.id}).exec(function(err){
            if(err){
                console.log(err);
                res.send(500, {error: 'Database Error'});
            }

            res.redirect('/employee/list');
        });

        return false;
    },
    edit: function(req, res){
        Employee.findOne({id:req.params.id}).exec(function(err, employee){
            if(err){
                res.send(500, {error: 'Database Error'});
            }

            res.view('employee/edit', {employee:employee});
        });
    },
    update: function(req, res){
        var employeename = req.body.employeename;
        var roles = req.body.roles;

        Employee.update({id: req.params.id},{employeename:employeename, roles:roles}).exec(function(err){
            if(err){
                res.send(500, {error: 'Database Error'});
            }

            res.redirect('/employee/list');
        });

        return false;
}
};

