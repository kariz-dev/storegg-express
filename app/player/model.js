const mongoose = require("mongoose");

const bcrypt = require("bcryptjs");

const HASH_ROUND = 10;

let playerSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "nama harus diisi"],
      maxlength: [225, "panjang nama harus antara 3 - 225 karakter"],
      minlength: [3, "panjang nama harus antara 3 - 225 karakter"],
    },
    userName: {
      type: String,
      require: [true, "nama harus diisi"],
      maxlength: [225, "panjang username harus antara 3 - 225 karakter"],
      minlength: [3, "panjang username harus antara 3 - 225 karakter"],
    },
    email: {
      type: String,
      require: [true, "email harus diisi"],
    },
    password: {
      type: String,
      require: [true, "kata sandi harus diisi"],
      maxlength: [225, "panjang password harus antara 6 - 225 karakter"],
      minlength: [6, "panjang password harus antara 6 - 225 karakter"],
    },
    phoneNumber: {
      type: String,
      require: [true, "nomor telepon harus diisi"],
      maxlength: [14, "panjang nomor telepon harus antara 9 - 225 karakter"],
      minlength: [8, "panjang nomor telepon harus antara 9 - 225 karakter"],
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    avatar: { type: String },
    fileName: { type: String },
    status: {
      type: String,
      enum: ["Y", "N"],
      default: "Y",
    },
    favorite: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
  },
  { timestamps: true }
);

playerSchema.path("email").validate(
  async function (value) {
    try {
      const count = await this.model("Player").countDocuments({ email: value });
      return !count;
    } catch (err) {
      throw err;
    }
  },
  (attr) => `${attr.value} sudah terdaftar`
);

playerSchema.pre("save", function (next) {
  this.password = bcrypt.hashSync(this.password, HASH_ROUND);
  next();
});

module.exports = mongoose.model("Player", playerSchema);
