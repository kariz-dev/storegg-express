const Payment = require("./model");
const Bank = require("../bank/model");

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");

      const alert = { message: alertMessage, status: alertStatus };

      const payment = await Payment.find().populate("banks");

      res.render("admin/payment/view_payment", {
        name: req.session.user.name,
        title: "Pembayaran | Store GG",
        payment,
        alert,
      });
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/payment");
    }
  },

  viewCreate: async (req, res) => {
    try {
      const banks = await Bank.find();

      res.render("admin/payment/create", {
        name: req.session.user.name,
        title: "Tambah Pembayaran | Store GG",
        banks,
      });
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/payment");
    }
  },

  actionCreate: async (req, res) => {
    try {
      const { type, banks } = req.body;

      const payment = await Payment({ type, banks });
      await payment.save();

      req.flash("alertMessage", "Berhasil tambah metode pembayaran");
      req.flash("alertStatus", "success");

      res.redirect("/payment");
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/payment");
    }
  },

  viewEdit: async (req, res) => {
    try {
      const { id } = req.params;

      const banks = await Bank.find();
      const payment = await Payment.findOne({ _id: id }).populate("banks");

      res.render("admin/payment/edit", {
        name: req.session.user.name,
        title: "Ubah Pembayaran | Store GG",
        payment,
        banks,
      });
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/payment");
    }
  },

  actionDelete: async (req, res) => {
    try {
      const { id } = req.params;

      await Payment.findOneAndRemove({ _id: id });
      req.flash('alertMessage', 'Berhasil hapus pembayaran')
      req.flash('alertStatus', 'success')

      res.redirect("/payment");
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/payment");
    }
  },
};
