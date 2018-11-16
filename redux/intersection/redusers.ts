import { IGraphView, IIntesectionView } from '../../models/graph';
import {
    ADD_INTERSECTION,
    REMOVE_INTERSECTION
} from './actions';
import { IGraphAction, IGraphActionEdge, IGraphActionVertex , IGraphActionIntersection} from '../../types/IGraphAction';

const initialIntersection : IIntersectionView = {
    pairs: []
}

export default (state: IIntersectionView = initialIntersection, action: IGraphAction) : IIntesectionView => {
    switch (action.type){
        case ADD_INTERSECTION:
            return{
                pairs: [
                    ...state.pairs,
                    (<IGraphActionIntersection> action).pair
                ],
            };
        case REMOVE_INTERSECTION:
            return {
                pairs: [
                    ...state.pairs
                        .filter( p => p.vertexOne !== (<IGraphActionIntersection> action).pair.vertexOne
                            && p.vertexTwo !== (<IGraphActionIntersection> action).pair.vertexTwo ),
                ]
            };
    }
};