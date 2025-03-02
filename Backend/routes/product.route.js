import express from "express";
import { createProduct, deleteProduct, updateProduct , getProducts, productDetails} from "../controllers/product.controller.js";


const router=express.Router()

router.post("/create", createProduct);
router.patch("/update/:productId",updateProduct);
router.delete("/delete/:productId",deleteProduct);
router.get("/products",getProducts);
router.get("/:productId",productDetails);



export default router;