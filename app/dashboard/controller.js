module.exports = {
  index: async (req, res) => {
    try {
      res.render('index', {
        title: 'Home | Store GG'
      })
    } catch (err) {
      console.log(err);
    }
  },
};
