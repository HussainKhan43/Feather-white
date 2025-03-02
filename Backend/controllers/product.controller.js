import { Product } from "../models/product.model.js";
import { v2 as cloudinary } from 'cloudinary';


export const  createProduct = async(req,res)=>{
    const {title,description,price} = req.body;

    try {
        if(!title || !description || !price){
            return res.status(400).json({error: "All fields are required"})
        }
       const {image}= req.files
       if(!req.files || Object.keys(req.files).length===0){
        return res.status(400).json({error: "No file uploaded"});
       }
       const allowedFormat = ["image/png","image/jpeg"]
       if(!allowedFormat.includes(image.mimetype)){
        return res.status(400).json({error: "Invalid file format. Only PNG and JPG are allowed"});
       }

//Cloudinary code
   const cloud_response=await cloudinary.uploader.upload(image.tempFilePath)
   if(!cloud_response || cloud_response.error){
    return res.status(400).json({error: "Error  uploading file in cloudinary "});

   }
        const productData={
            title,
            description,
            price,
            image:{
                public_id: cloud_response.public_id,
                url:cloud_response.url,
            },
        };
        
      const product= await  Product.create(productData)
      res.json({
        message: "product created succesfully",
        product,
      });
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Error creating product"});
    }
};


export const updateProduct = async (req, res) => {
    const { productId } = req.params;
    const { title, description, price, image } = req.body;
  try {
    const  product= await Product.updateOne({
        _id: productId
    },{
        title,
        description,
        price,
        image:{
            public_id: image?.public_id ,
            url: image?.url,
        }
    })
    res.status(201).json({message:"Product updated successfully"})
  } catch (error) {
    res.status(500).json({error: "Error in product updating"})
    console.log("Error in product updating",error)
  }
};

export const deleteProduct = async (req, res) => {
    const { productId } = req.params;
  try {
    const  product= await Product.findOneAndDelete({
        _id: productId
    })
    if(!product){
        res.status(404).json({message:"Product not found"});
    }
    res.status(200).json({message:"Product deleted successfully"});
  } catch (error) {
    res.status(500).json({error: "Error in product deleting"});
    console.log("Error in product deleting",error);
  }
};

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({})
        res.status(201).json({products})
    } catch (error) {
        res.status(500).json({error: "Error in getting products"});
        console.log("error to grt products",error);
    }
}


export const productDetails = async (req, res) => {
    const { productId } = req.params;
    try {
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.status(200).json({ product });
    } catch (error) {
      res.status(500).json({ errors: "Error in getting product details" });
      console.log("Error in product details", error);
    }
  };