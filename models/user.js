const mongoose = require ('mongoose');
const product = require('./product');

const userSchema = new mongoose.Schema({
    
    fristName:{
        type:String,
        // required:true
    },
    lastName:{
        type:String,
        // required:true
    },
    email:{
        type:String,
        // required:true
    },
    phone:{
        type:String,
        // required:true
    },
    password:{
        type:String,
        // required:true
    },
    cPassword:{
        type:String,
        // required:true
    },
    resetToken:String,
    resetTokenExpiration:Date,
    access:{
        type:Boolean,
        default:true 
    },
    cart:{
        items:[{
            productId:{
                type:mongoose.Types.ObjectId,
                ref:product,
            },
            qty:{
                type:Number,
            },
            productPrice:{
                type:Number
            }
        }],
        totalPrice:Number
    }
})

userSchema.methods.addToCart = function (products,callBack){
    let cart = this.cart;
    const prId=products._id.toString()
    const isExisting = cart.items.findIndex(objInItems=>objInItems.productId ==prId)
        if(isExisting>=0){
          cart.items[isExisting].qty+=1
           
        }else{
            cart.items.push({productId:products._id,qty:1,productPrice:products.price })
        }
        if (!cart.totalPrice){
            cart.totalPrice=0
        }
        cart.totalPrice+=products.price
        return this.save().then(()=>{
            callBack()
        })
        }

        userSchema.methods.changeQty= async function(productId,qty,count,cb){
            const cart=this.cart
            const quantity = parseInt(qty)
            const cnt=parseInt(count)
              const response={}
            const products = await product.findOne({_id:productId})
            if(cnt==-1&&quantity==1 || cnt == -2){
                const isExisting = cart.items.findIndex(objInItems=>objInItems.productId == productId)
                cart.totalPrice-=products.price * qty
                cart.items.splice(isExisting,1)
                response.remove=true
            }else if(cnt==1){
                const isExisting = cart.items.findIndex(objInItems=>objInItems.productId == productId)
                cart.items[isExisting].qty += cnt
                cart.totalPrice += products.price
                response.status= cart.items[isExisting].qty
            }else if(cnt==-1){
                const isExisting = cart.items.findIndex(objInItems=>objInItems.productId == productId)
                cart.items[isExisting].qty+=cnt
                cart.totalPrice-=products.price
                response.status=cart.items[isExisting].qty
            }
            this.save().then((doc)=>{
                response.total = doc.cart.totalPrice
                cb(response)
            })
        }


module.exports=mongoose.model('users',userSchema)