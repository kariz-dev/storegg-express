module.exports = {
  index: async (req, res) => {
    try {
      res.render('admin/category/view_category', {
        title: 'Category | Store GG'
      })
    } catch (err) {
      console.log(err);
    }
  },
};
