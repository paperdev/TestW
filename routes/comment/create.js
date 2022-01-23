import comment from '../../db/models/comment.js';
import _ from 'lodash';

export default async function(req, res, next) {
    try {
        if (_.isEmpty(req.body)) {
            return next(error);
        }

        const content = req.body.content;
        const writer = req.body.writer;

        const inserted = await comment.create(
            {
                content: content,
                writer: writer
            }
        );

        const result = {
            id: inserted.id,
            content: content,
            writer: writer,
            create_date: inserted.create_date
        }
        
        
        res.send(result);
    } catch (error) {
        return next(error);
    }
}