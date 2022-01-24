import post from '../../db/models/post.js';
import _ from 'lodash';

export default async function(req, res, next) {
    try {
        const id = req.body.id;
        const password = req.body.password;

        if (!id || !password) {
            return next('parameter error.');
        }

        const result_post = await post.findOne(
            {
                where: {
                    id: id
                },
                raw: false
            }
        );

        if (!result_post) {
            return next('post not exist.');
        }

        // password check
        if (result_post.password() !== post.encryptPassword(password, result_post.salt())) {
            return next('password error.');
        }

        await post.destroy({
            where: {
                id: id
            }
        });

        const result = {
            id: id
        };
        
        res.send(result);
    } catch (error) {
        return next(error);
    }
}