import post from '../../db/models/post.js';
import _ from 'lodash';

export default async function(req, res, next) {
    try {
        if (_.isEmpty(req.body)) {
            return next(error);
        }

        const title = req.body.title;
        const content = req.body.content;
        const writer = req.body.writer;
        const password = req.body.password;

        const inserted = await post.create(
            {
                title: title,
                content: content,
                writer: writer,
                password: password
            }
        );

        const result = {
            id: inserted.id,
            title: title,
            content: content,
            writer: writer,
            create_date: inserted.create_date
        }
        
        
        res.send(result);
    } catch (error) {
        return next(error);
    }
}