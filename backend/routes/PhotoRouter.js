const express = require("express");
const router = express.Router();

//CONTROLLER
const {
  insertPhoto,
  deletePhoto,
  getAllPhotos,
  getUserPhotos,
  getPhotoById,
  updatePhoto,
  likePhoto,
  commentPhoto,
  searchPhotos,
} = require("../controllers/PhotoController");
//middlewares
const {
  photoInsertValidation,
  photoUpdateValidation,
  commentValidation,
} = require("../middlewares/Photovalidation");
const { imageUpload } = require("../middlewares/imageUpload");
const authGuard = require("../middlewares/AuthGuard");
const validate = require("../middlewares/HandleValidation");

//routes
router.post(
  "/",
  authGuard,
  imageUpload.single("image"),
  photoInsertValidation(),
  validate,
  insertPhoto
);
router.delete("/:id", authGuard, deletePhoto);
router.get("/", getAllPhotos);
router.get("/user/:id", getUserPhotos);
router.get("/search", searchPhotos);

router.get("/:id", getPhotoById);
router.put(
  "/:id",
  authGuard,
  imageUpload.single("image"),
  photoUpdateValidation(),
  validate,
  updatePhoto
);
router.put("/like/:id", authGuard, likePhoto);
router.put(
  "/comment/:id",
  authGuard,
  commentValidation(),
  validate,
  commentPhoto
);
module.exports = router;
