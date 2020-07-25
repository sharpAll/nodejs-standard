var express = require('express');
var router = express.Router();
const querySql = require('../db/index');
/* 新增博客接口 */
router.post('/add' ,async(req,res,next)=>{
  let {title,content}=req.body;
  let {username}=req.user;
  try{
    let result=await querySql('select id from user where username = ?',[username]);
    let user_id=result[0].id;
    await querySql('insert into article(title,content,user_id,create_time) values(?,?,?,NOW())',[title,content,user_id])
    res.send({code:0,msg:'新增成功',data:null})
  }catch(e){
    console.log(e);
    next(e)
  }
});

// 获取全部博客列表
router.get('/allList' ,async(req,res,next)=>{
  try{
    let result=await querySql('select id,title,content,DATE_FORMAT(create_time,"%Y-%m-%d %H:%i:%s") AS create_time from article');
    res.send({code:200,msg:'获取成功',data:result})
  }catch(e){
    console.log(e);
    next(e)
  }
});

// 获取我的博客列表
router.get('/myList' ,async(req,res,next)=>{
  let {username}=req.user
  try{
    let user=await querySql('select id from user where username = ?',[username]);
    let user_id=user[0].id;
    let result=await querySql('select id,title,content,DATE_FORMAT(create_time,"%Y-%m-%d %H:%i:%s") AS create_time from article where user_id = ?',[user_id]);
    res.send({code:200,msg:'获取成功',data:result})
  }catch(e){
    console.log(e);
    next(e)
  }
});

// 查看博客详情
router.get('/detail' , async(req,res,next)=>{
  //通过get传参
  let article_id=req.query.article_id;
  try{
    let result=await querySql('select id,title,content,DATE_FORMAT(create_time,"%Y-%m-%d %H:%i:%s") AS create_time from article where id = ?',[article_id]);
    res.send({code:200,msg:'获取成功',data:result[0]})
  }catch(e){
    console.log(e);
    next(e)
  }
});

// 更新博客详情
router.post('/update' , async(req,res,next)=>{
  let {article_id,title,content}=req.body;
  let {username}=req.user
  try{
    let user=await querySql('select id from user where username = ?',[username]);
    let user_id=user[0].id;
    let result=await querySql('update article set title=?, content=? where id = ? and user_id=?',[title,content,article_id,user_id]);
    if(result.changedRows>0){
      res.send({code:200,msg:'更新成功',data:null})
    }else{
      res.send({code:500,msg:'更新失败',data:null})
    }
  }catch(e){
    console.log(e);
    next(e)
  }
});

// 删除博客
router.post('/delete' , async(req,res,next)=>{
  let {article_id}=req.body;
  let {username}=req.user
  try{
    let user=await querySql('select id from user where username = ?',[username]);
    let user_id=user[0].id;
    let result=await querySql('delete from article where id = ? and user_id = ?',[article_id,user_id]);
    if(result.affectedRows>0){
      res.send({code:200,msg:'删除成功',data:null})
    }else{
      res.send({code:500,msg:'删除失败',data:null})
    }
  }catch(e){
    console.log(e);
    next(e)
  }
});
module.exports = router;
