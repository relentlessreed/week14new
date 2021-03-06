const router = require('express').Router();
const session = require('express-session');
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        // Get all posts and JOIN with user data
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
            ],
        });

        // Serialize data so the template can read it
        const posts = postData.map((post) => post.get({ plain: true }));

        // Pass serialized data and session flag into template
        res.render('homepage', {
            posts,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/post/:id', async (req, res) => {
    try {
        const postData = await Post.findOne({
            where: {
                id: req.params.id
            },
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
                {
                    model: Comment,
                    attributes: ["comment_text", "id", "date_created", "user_id"],
                    include: {
                        model: User,
                        attributes: ["name"]
                    }
                }
            ],
        })

        const post = postData.get({ plain: true });

        console.log(post)
        console.log(req.session)

        console.log(post.user_id === req.session.user_id)
        // res.json(post)
        res.render('post', {
            ...post,
            logged_in: req.session.logged_in,
            isMine: post.user_id === req.session.user_id
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Use withAuth middleware to prevent access to route
router.get('/dashboard', withAuth, async (req, res) => {
    try {
        // Find the logged in user based on the session ID
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Post }],
        });

        const user = userData.get({ plain: true });

        res.render('dashboard', {
            ...user,
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

//EDIT ROUTES
router.get('/editPost/:id', withAuth, async (req, res) => {
    try {
        const foundPost = await Post.findOne({
            where: {
                id: req.params.id
            },
            attributes: ["title", "contents", "id"],
            include: {
                model: User,
                attributes: ["id", "name"]
            }
        })

        if (!foundPost) {
            res.status(404).json({ success: false, errMessage: "No post found" })
            return
        }

        const post = foundPost.get({ plain: true })
        // res.json({ post })
        res.render("editPost", {
            post
        })
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
        res.redirect('/dashboard');
        return;
    }

    res.render('login');
});

module.exports = router;
