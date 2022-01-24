import comment from '../../db/models/comment.js';
import _ from 'lodash';

const COUNT_PER_PAGE = 10;

export default async function(req, res, next) {
    try {
        const page = req.body.page ? req.body.page : 1;
        const offset = (page - 1) * COUNT_PER_PAGE;

        const result_list = await comment.findAll(
            {
                limit: COUNT_PER_PAGE,
                offset: offset
            }
        );

        let commnet_list = [];
        for (const item of result_list) {
            commnet_list.push(
                {
                    id: item.id,
                    content: item.content,
                    writer: item.writer,
                    create_date: item.create_date,
                    post_ref_id: item.post_ref_id,
                    comment_ref_id: item.comment_ref_id
                }
            )
        }

        const result = {
            list : commnet_list
        };

        res.send(result);
    } catch (error) {
        return next(error);
    }
}