const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchingAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");

// create Product -- Admin

exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
});

//Get All Product

exports.getAllProducts = catchAsyncErrors(async (req, res) => {
  const apifeatures = new ApiFeatures(Product.find(), req.query).search();
  const products = await apifeatures.query;
  res.status(200).json({
    success: true,
    products,
  });
});

//update Product --Admin

exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  let product = Product.findById(req.params.id);

  if (!product) {
    return res.status(500).json({
      success: false,
      message: "Product not found",
    });
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    product,
  });
});

//delete product --admin

exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(500).json({
      success: false,
      message: "Product not found",
    });
  }

  await product.remove();

  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
  });
});

//get product details

exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  res.status(200).json({
    success: true,
    product,
  });
});

exports.getPhani = async (req, res, next) => {
  res.status(200).json("hi phan");
};

exports.getPhan = async (req, res, next) => {
  res.status(200).json("hi phan");
};

exports.getLol = async (req, res, next) => {
  res.status(200).json("lol lol lol ");
};
