const express = require("express");
const routes = express.Router();
const adminController = require("../controller/adminController");
const Admin = require("../model/Admin");
const passport = require("passport");

routes.get("/", async (req,res)=>{
    if(req.isAuthenticated()){
        console.log("Already loggedIn");
        res.redirect("/admin/dashboard");
    }
    else{
        res.render("login");
    }
});

routes.post("/login", passport.authenticate('local',{failureRedirect : "/admin"}) ,adminController.login);

routes.get("/dashboard", passport.checkAuth ,adminController.dashboard);

routes.get("/logout", adminController.logout);

routes.get("/insertAdminData", passport.checkAuth ,adminController.insertAdminData)
routes.post("/createAdminData", Admin.uploadAdminImage, adminController.createAdminData)

routes.get("/viewAdminData",passport.checkAuth ,adminController.viewAdminData);

routes.get("/deactive/:id", adminController.deactive);
routes.get("/active/:id", adminController.active);

routes.get("/deleteData/:id", passport.checkAuth ,adminController.deleteData);

routes.get("/updateData/:id", passport.checkAuth ,adminController.updateData);
routes.post("/editAdminData", Admin.uploadAdminImage , adminController.editData);

routes.get("/changePassword", passport.checkAuth ,adminController.changePassword)
routes.post("/editPassword", adminController.editPassword);

routes.get("/profile",passport.checkAuth , adminController.profile);

routes.get("/updateProfile/:id", passport.checkAuth ,adminController.updateProfile);

routes.get("/emailPage", async (req,res) => {
    return res.render("ForgetPass/emailPage");
});

routes.post("/checkEmail", adminController.checkEmail);

routes.get("/otpPage", async (req,res) => {
    return res.render("ForgetPass/otpPage")
})

routes.post("/checkOTP", adminController.checkOTP);

routes.get("/changeForgetPass",adminController.changeForgetPass);
routes.post("/editForgetPass",adminController.editForgetPass);

routes.post("/deleteMany", adminController.deleteMany);

routes.use("/slider",passport.checkAuth,require("./slider"));

routes.use("/offer",passport.checkAuth,require("./offer"));

routes.use("/photos",passport.checkAuth,require("./photos"));

routes.use("/review",passport.checkAuth,require("./review"));

routes.use("/post",passport.checkAuth,require("./post"));

routes.use("/category",passport.checkAuth,require("./category"));

routes.use("/subCategory",passport.checkAuth,require("./subCategory"));

module.exports = routes;