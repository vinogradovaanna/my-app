import { IEdgeView, IVertexView, IIntesectionPairs } from '../../models/graph';
import { IGraphActionEdge, IGraphActionVertex , IGraphActionIntersection} from '../../types/IGraphAction';
export const ADD_INTERSECTION: string = 'graph/ADD_INTERSECTION';
export const REMOVE_INTERSECTION: string = 'graph/REMOVE_INTERSECCTION'

export const actionsCreatorsA = {
    addIntersection(vertexOne, vertexTwo) : IGraphActionIntersection {
        return{
            type : ADD_INTERSECTION,
            payload : { vertexOne, vertexTwo } as IIntesectionPairs
        };
    },
    removeIntersection(vertexOne, vertexTwo): IGraphActionIntersection{
        return{
            type: REMOVE_INTERSECTION,
            payload: {vertexOne, vertexTwo} as IIntersectionPairs
        }
    }
}