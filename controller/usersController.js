const Note = require("../models/Note");
const User = require("../models/User");
const asnycHandler = require("express-async-handler");
const bcrypt = require("bcrypt");

const getUser = asnycHandler(async(req,res)=>{
   
   try{
     const result =  await User.find();
     if(!result) return res.json({message : "데이터가 없습니다."})
     res.json(result)
     
     
   }catch(err){
    console.log(err);
    
   } 
    
});

const posttUser = asnycHandler(async(req,res)=>{
    const {username , password ,roles} = req.body
    console.log(`username ${username} password ${password} roles ${roles}`)
    if(!username || !password || !Array.isArray(roles) || !roles.length){
        return res.status(400).json({message : "비밀번호 와 아이디는 필수입니다."})
    }

    const duplicate = await User.findOne({username}).lean().exec();
    if(duplicate){
        return res.status().json({message : "아이디가 중복됩니다."})
    }
    

   
    const hashpassword = async () =>{
        {
            try {
                const hash = bcrypt.hashSync(plainPassword, saltRounds);
                console.log(hash);
              } catch (err) {
                console.error(err);
            }
        }
    }
    
   
    
    const userObj = {username , password : hashpassword , roles}
    const result =  await User.create(userObj);

    if(result){
       return res.status(200).json({message : "회원가입 성공"});
    }else{
        return res.status(400).json({message  :"예상치 못한 오류 발생!"});
    }
});



const updateUser = asnycHandler(async(req,res)=>{
    const { id  ,username ,password , roles , active } = req.body

    //유저가 id를 입력해야하는가? , username을 입력해서 찾으면되는거 아닌가?
    
    if(!id || !username || !password || !Array.isArray(roles) || !roles.length || typeof active !== "boolean"){
        return res.status(400).json({message : "모든 입력란을 채워주세요."});
    } 

    const user = await User.findOne({id}).exec();
    
    if(!user){
        return res.status(400).json({message : "ID가 없습니다."});
    }
    
    const duplicate = await User.findOne({username});
    
    
    if(duplicate && duplicate?._id.toString() !== id){
        return res.status(409).json({message : "중복된 이름이 존재합니다."});
    }

    user.username = username
    user.roles = roles
    user.active = active

    if(password){
        const hashpassword = bcrypt.hash(password , 5 , (err,hash)=>{
            if(err){
                return res.json({message : err.message})
            }else{
                return user.password = hash
            }
        })
    }
    
    const updateUser = await user.save();
    res.json({message : updateUser})
});


const deleteUser = asnycHandler(async(req,res)=>{
    const {id} = req.body
    
    if(!id){
        return res.json({message : "유저가 없습니다."})
    }

    //23.03.25 이해 X
    const notes = await Note.findOne({user : id}).lean().exec()
    if(notes?.length){
        return res.status(400).json({message : "유저가 없습니다."})
    }
    
    const user = await User.findById(id).exec();
    if(!user){
        return res.status(400).json({message : "유저가 없습니다."})
    }
    
    const result = await User.deleteOne();

    const reply = `유저 ${result.username} 와 ${result._id}는 삭제되었습니다.`
    
    return res.json(reply)
});

module.exports = {getUser,
    posttUser,
    deleteUser,
    updateUser,}