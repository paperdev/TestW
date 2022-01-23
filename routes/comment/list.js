import comment from '../../db/models/comment.js';
import _ from 'lodash';

export default async function(req, res, next) {
    try {
        if (_.isEmpty(req.body)) {
            return next(error);
        }

        const result_list = await comment.findAll({});

        const result = {
            list : result_list
        };
        
        res.send(result);
    } catch (error) {
        return next(error);
    }
}