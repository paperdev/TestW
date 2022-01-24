import post from '../../db/models/post.js';
import keyword from '../../db/models/keyword.js';
import _ from 'lodash';
import { keywordAlert } from '../../utils/alertHelper.js';

export default async function(req, res, next) {
    try {
        const title = req.body.title;
        const content = req.body.content;
        const writer = req.body.writer;
        const password = req.body.password;

        if (!title || !content || !writer || !password) {
            return next('parameter error.');
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