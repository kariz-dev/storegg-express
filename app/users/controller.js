const User =  require("./model")

module.exports={
  viewSignin: async(req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");

      const alert = { message: alertMessage, status: alertStatus };

      res.render("admin/category/view_category", {
        title: "Signin | Store GG",
        alert,
      });
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/signin");
    }
  }
}