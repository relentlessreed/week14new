const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get("/", (req, res) => {
    Comment.findAll({}).then(d => res.json(d)).catch(err => res.json(err))
})

router.post('/', withAuth, async (req, res) => {
    const { comment_text, post_id } = req.body
    const body = {
        comment_text,
        post_id,
        user_id: req.session.user_id
    }
    try {
        const comment = await Comment.create(body)

        res.status(200).json(comment);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const comment = await Comment.destroy({
            where: {
                post_id: req.params.id,
            },
        });

        res.status(200).json(comment);
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router