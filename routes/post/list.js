import post from '../../db/models/post.js';
import _ from 'lodash';

const COUNT_PER_PAGE = 10;

export default async function(req, res, next) {
    try {
        const page = req.body.page ? req.body.page : 0;
        const offset = (page - 1) * COUNT_PER_PAGE;

        const result_list = await post.findAll(
            {
                limit: COUNT_PER_PAGE,
                offset: offset
            }
        );

        let post_list = [];
        for (const item of result_list) {
            post_list.push(
                {
                    id: item.id,
                    title: item.title,
                    content: item.content,
                    writer: item.writer,
                    create_date: item.create_date,
                    update_date: item.update_date
                }
            )
        }

        const result = {
            list : post_list
        };
        
        res.send(result);
    } catch (error) {
        return next(error);
    }
}