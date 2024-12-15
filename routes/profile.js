import { Router } from 'express';
import { userData } from '../data/index.js';
import helperFunctions from '../helpers.js';
import { ensureAuthenticated } from '../middleware/authMiddleware.js';
import { recipeData } from '../data/index.js';

const router = Router();

router.get('/', ensureAuthenticated, async (req, res) => {
    try {
        const userId = req.session.user.id;
        const userProfile = await userData.getUserById(userId);


        let followingRecipes = [];

 
            const followingUserIds = userProfile.followingUserIds || [];
            for (const followingId of followingUserIds) {
                const recipes = await recipeData.getRecipesByUserId(followingId, 2);
                
                for (const recipe of recipes) {
                    const author = await userData.getUserById2(recipe.author);
                    recipe.authorName = author;
                }
                
                followingRecipes.push(...recipes);
            }
        

        res.render('profile', {
            userProfile,
            isOwnProfile: true,
            title: `${userProfile.firstName} ${userProfile.lastName}'s Profile`,
            followingRecipes,
        });
    } catch (error) {
        console.error(`Error loading profile: ${error.message}`);
        res.status(500).render('error', { error: 'Failed to load profile.' });
    }
});

/*
router.get('/:userId', async (req, res) => {
    try {
        const userId = helperFunctions.checkId(req.params.userId);
        const userProfile = await userData.getUserById(userId);

        res.render('profile', {
            userProfile,
            isOwnProfile: false,
            title: `${userProfile.firstName} ${userProfile.lastName}'s Profile`,
        });
    } catch (error) {
        console.error(`Error loading profile: ${error.message}`);
        res.status(400).render('error', { error: 'Failed to load profile.' });
    }
});
*/
router.get('/:userId', async (req, res) => {
    const userId = req.params.userId;
    const currentUser = req.session.user;

    try {
        const userProfile = await userData.getUserById(userId);
        const isOwnProfile = currentUser.id === userId;

        let followingRecipes = [];

        const isFollowing = currentUser.followingUserIds?.includes(userId);
        console.log("HERE" + isFollowing);


        if (isOwnProfile) {
            const followingUserIds = userProfile.followingUserIds || [];
            for (const followingId of followingUserIds) {
                const recipes = await recipeData.getRecipesByUserId(followingId, 2);

                for (const recipe of recipes) {
                    const author = await userData.getUserById2(recipe.author);
                    recipe.authorName = author;
                }
                followingRecipes.push(...recipes);
            }
        }

        res.render('profile', {
            userProfile,
            isOwnProfile,
            followingRecipes,
            isFollowing
        });
    } catch (error) {
        console.error(`Error fetchingaaa profile: ${error.message}`);
        res.status(500).render('error', { message: 'Error fetching profile.' });
    }
});

router.post('/follow/:profileId', ensureAuthenticated, async (req, res) => {
    const currentUserId = req.session.user.id;
    const profileId = req.params.profileId;

    try {
        helperFunctions.checkId(profileId);

        if (currentUserId === profileId) {
            return res.status(400).render('error', { message: 'You cannot follow yourself.' });
        }

        await userData.followUser(currentUserId, profileId);

        req.session.user.followingUserIds = req.session.user.followingUserIds || [];
        if (!req.session.user.followingUserIds.includes(profileId)) {
            req.session.user.followingUserIds.push(profileId);
        }

        return res.redirect(`/profile/${profileId}`);
    } catch (error) {
        console.error(`Error in follow route: ${error.message}`);
        return res.redirect('back');
    }
});

router.post('/unfollow/:id', async (req, res) => {
    const currentUserId = req.session.user.id;
    const unfollowId = req.params.id;

    try {
        helperFunctions.checkId(currentUserId);
        helperFunctions.checkId(unfollowId);

        await userData.updateUser(currentUserId, {
            $pull: { followingUserIds: unfollowId },
        });

        req.session.user.followingUserIds = req.session.user.followingUserIds || [];
        req.session.user.followingUserIds = req.session.user.followingUserIds.filter(
            (id) => id !== unfollowId
        );

        res.redirect(`/profile/${unfollowId}`);
    } catch (error) {
        console.error(`Error in unfollow route: ${error.message}`);
        res.redirect(`/profile/${unfollowId}`);
    }
});




export default router;
