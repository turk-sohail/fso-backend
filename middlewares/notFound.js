const notFound = (req, res) => {
  res.status(404).json({ message: "specified url doesnot found" });
};
module.exports = notFound;
