import foodModel from '../models/foodModel.js'
import fs from 'fs'


// add food item

const addFood = async (req,res) => {

    let image_filename = `${req.file.filename}`;

    const food = new foodModel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        image:image_filename,
        outofstock:req.body.outofstock,
        offerpercentage:req.body.offerpercentage
    })
    try {
        await food.save();
        res.json({success:true,message:"Food Added"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}

// all food list
const listFood = async (req,res) => {
    try {
        const foods = await foodModel.find({});
        res.json({success:true,data:foods})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

// remove food item
const removeFood = async (req,res) => {
    try {
        const food = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`,()=>{})

        await foodModel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"Food Removed"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

//Update food

const updateFood = async (req, res) => {
    try {
      const { id, name, description, price, category } = req.body;
      const food = await foodModel.findById(id);
  
      // Check if a new image is provided
      let image_filename = food.image; // Use existing image if not updated
      if (req.file) {
        fs.unlink(`uploads/${food.image}`, () => {}); // Delete old image
        image_filename = req.file.filename;
      }
  
      food.name = name;
      food.description = description;
      food.price = price;
      food.category = category;
      food.image_filename = image_filename;
  
      await food.save();
      res.json({ success: true, message: "Food Updated" });
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: "Error" });
    }
  };


export {addFood,listFood,removeFood,updateFood}