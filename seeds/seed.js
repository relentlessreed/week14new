const sequelize = require('../config/connection');
const { User, Posts } = require('../models');

const userData = require('./userData.json');
const PostsData = require('./PostsData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    const users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    for (const Posts of PostsData) {
        await Posts.create({
            ...Posts,
            user_id: users[Math.floor(Math.random() * users.length)].id,
        });
    }

    process.exit(0);
};

seedDatabase();
