module.exports = function(app, Schema, mongoose) {
    var moment = require("moment");
    var postSchema = new Schema({
        image: String,
        title: { type: String, required: true, unique: true },
        slug: { type: String, required: true, unique: true },
        smallDesc: String,
        desc: String,
        cat_id: Number,
    }, {
        timestamps: true,
    });
    var Post = mongoose.model("Posts", postSchema);

    app.get("/", function(req, res) {
        var setData = {
            title: "Personal Blog",
            layout: "layout",
            moment: moment,
        };
        Post.find({}, function(err, posts) {
            if (err) throw err;
            if (posts !== "") setData.lists = posts;
            // console.log(setData);
            res.render("index", setData);
        });
    });

    app.get("/article/:slug", function(req, res) {
        if (typeof req.params.slug !== "undefined" && req.params.slug !== "") {
            singleData = { layout: "layout" };
            Post.findOne({ slug: req.params.slug }, function(err, postData) {
                if (err) throw err;
                console.log(postData);
                postData.image = "/assests/uploads/" + postData.image;
                singleData.post = postData;
                singleData.title = postData.title;
                res.render("single", singleData);
            });
        } else {
            res.send("Invalid Post");
        }
    });

    app.get("/about", function(req, res) {
        var setData = {
            title: "About Us | Personal Blog",
            layout: "layout",
        };
        res.render("about", setData);
    });

    app.get("/post", function(req, res) {
        res.render("single-post", {
            title: "Blogs | Personal Blog",
            layout: "layout",
        });
    });

    app.get("/contact", function(req, res) {
        res.render("contact", {
            title: "Contacts | Personal Blog",
            layout: "layout",
        });
    });

    app.get("/sign-up", function(req, res, next) {
        let { status } = req.query;
        let json = {
            title: "Register | Personal Blog",
            layout: "layout",
            message: null,
        };
        console.log(req.query);
        if (status == 1) {
            json.message = "Sign up success.";
        }

        res.render("sign-up", json);
    });
};