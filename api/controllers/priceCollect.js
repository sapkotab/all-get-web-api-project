/**
 * Created by bhuwan on 3/30/17.
 */

'use strict;'

var gas = require('../../config/db')


module.exports = {
    getall: getall,
    getlast24 : getlast24,
    getlast7 : getlast7,
    getlast30 : getlast30,
    getAdaylist: getAdaylist
};

function getall(req,res,next){
    gas.find({},function(err,response){
        if(err) throw {err:err};
        var allPrice = response;
        res.send(allPrice);
    });
}
function getlast24(req,res,next){
    gas.find({date: {$gte : new Date(new Date().getTime()-(60*24*60*1000)).toISOString()}},function(err,response){
        if(err) throw {err:err};
        var allPrice = response;
        res.send({Pricelist: allPrice});
    });
}

function getAdaylist(req,res,next){
    var startDate = new Date(req.query.year,(req.query.month-1),req.query.day);
    var dateMidnight = new Date(startDate);
    dateMidnight.setHours(23);
    dateMidnight.setMinutes(59);
    dateMidnight.setSeconds(59);

    gas.find({date: {$gte : startDate,$lt:dateMidnight}},function(err,response){
        if(err) throw {err:err};
        var allPrice = response;
        res.send({Pricelist: allPrice});
    });
}

function getlast7(req,res,next){
    // console.log(new Date())
    // console.log(new Date(new Date())-(60*48*60*1000))
    gas.find({date: {$gte : new Date(new Date().getTime()-(7*60*24*60*1000)).toISOString()}},function(err,response){
        if(err) throw {err:err};
        var allPrice = response;
        res.send({Pricelist: allPrice});
    });
}

function getlast30(req,res,next){
    // console.log(new Date())
    // console.log(new Date(new Date())-(60*48*60*1000))
    gas.find({date: {$gte : new Date(new Date().getTime()-(30*60*24*60*1000)).toISOString()}},function(err,response){
        if(err) throw {err:err};
        var allPrice = response;
        res.send({Pricelist: allPrice});
    });
}

