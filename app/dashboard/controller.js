module.exports = {
  index: async (req, res) => {
    try {
      res.render("index", {
        title: "Dashboard | Store GG",
        name: req.session.user.name,
      });
    } catch (err) {
      console.log(err);
    }
  },
};
