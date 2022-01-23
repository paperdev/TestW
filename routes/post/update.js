import post from '../../db/models/post.js';
import _ from 'lodash';

export default async function(req, res, next) {
    try {
        if (_.isEmpty(req.body)) {
            return next(error);
        }

        const id = req.body.id;
        const title = req.body.title;
        const content = req.body.content;
        const writer = req.body.writer;
        const password = req.body.password;
        const now = new Date();

        const updated = await post.update(
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