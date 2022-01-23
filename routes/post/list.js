import post from '../../db/models/post.js';
import _ from 'lodash';

export default async function(req, res, next) {
    try {
        if (_.isEmpty(req.body)) {
            return next(error);
        }

        const result_list = await post.findAll({});

        const result = {
            list : result_list
        };
        
        res.send(result);
    } catch (error) {
        return next(error);
    }
}