const College = require('../models/college');
const Review = require('../models/review');
const { cloudinary } = require("../cloudinary");

module.exports.createReview = async (req, res) => {
    const college = await College.findById(req.params.id);
    const review = new Review(req.body.review);
    review.images = req.files.map(f => ({ url: f.path, filename: f.filename }));
    review.author = req.user._id;
    // await review.save();
    college.reviews.push(review);
    await review.save();
    await college.save();
    req.flash('success', 'Created new review!');
    res.redirect(`/colleges/${college._id}`);
}

module.exports.deleteReview = async (req, res) => {
    const { id, reviewId } = req.params;
    await College.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Successfully deleted review')
    res.redirect(`/colleges/${id}`);
}