import comment from '../../db/models/comment.js';
import keyword from '../../db/models/keyword.js';
import post from '../../db/models/post.js';
import _ from 'lodash';
import { keywordAlert } from '../../utils/alertHelper.js';

export default async function(req, res, next) {
    try {
        const content = req.body.content;
        const writer = req.body.writer;
        const post_id = req.body.post_id;
        const comment_id = req.body.comment_id;

        if (!content || !writer) {
            return next('parameter error.');
        }

        if (!post_id && !comment_id) {
            return next('post id or comment id not exist.')
        }

        if (post_id) {
            const result_post = await post.findOne(
                {
                    where: {
                        id: post_id
                    }
                }
            );
    
            if (!result_post) {
                return next('post not exist.');
            }
        }
        
        if (comment_id) {
            const result_comment = await comment.findOne(
                {
                    where: {
                        id: comment_id
                    }
                }
            );

            if (!result_comment) {
                return next('comment not exist.');
            }
        }

        const keyword_list = await keyword.findAll(
            {
                where: {
                    writer: writer
                }
            }
        );

        // keyword alert
        for (const item of keyword_list) {
            if (-1 !== content.indexOf(item.keyword)) {
                keywordAlert(writer, item.keyword);
            }
        }

        const inserted = await comment.create(
            {
                content: content,
                writer: writer,
                post_ref_id: post_id ? post_id : 0,
                comment_ref_id: comment_id ? comment_id : 0
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