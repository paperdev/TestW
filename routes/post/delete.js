import post from '../../db/models/post.js';
import _ from 'lodash';

export default async function(req, res, next) {
    try {
        if (_.isEmpty(req.body)) {
            return next(error);
        }

        const id = req.body.id;

        await post.destroy({
            where: {
                id: id
            }
        });

        const result = {
            id: id
        };
        
        res.send(result);
    } catch (error) {
        return next(error);
    }
}