import post from '../../db/models/post.js';
import _ from 'lodash';

export default async function(req, res, next) {
    try {
        const id = req.body.id;
        const title = req.body.title;
        const content = req.body.content;
        const writer = req.body.writer;
        const password = req.body.password;

        if (!id || !title || !content || !writer || !password) {
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

        const now = new Date();
        await post.update(
            {
                title: title,
                content: content,
                update_date: now
            }, 
            {
                where: {
                    id: id
                }
            }
        );

        const result = {
            id: id,
            title: title,
            content: content,
            update_date: now
        };
        
        res.send(result);
    } catch (error) {
        return next(error);
    }
}