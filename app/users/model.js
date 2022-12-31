const mongoose = require("mongoose");

let usersChema = mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "nama harus diisi"],
    },
    email: {
      type: String,
      require: [true, "email harus diisi"],
    },
    password: {
      type: String,
      require: [true, "kata sandi harus diisi"],
    },
    phoneNumber: {
      type: String,
      require: [true, "nomor telepon harus diisi"],
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "admin",
    },
    status: {
      type: String,
      enum: ["Y", "N"],
      default: "Y",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", usersChema);
