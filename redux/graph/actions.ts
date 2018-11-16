import { IEdgeView, IVertexView, IIntesectionPairs } from '../../models/graph';
import { IGraphActionEdge, IGraphActionVertex , IGraphActionIntersection} from '../../types/IGraphAction';
export const ADD_VERTEX: string = 'graph/ADD_VERTEX';
export const REMOVE_VERTEX: string = 'graph/REMOVE_VERTEX';
export const ADD_EDGE: string = 'graph/ADD_EDGE';
export const REMOVE_EDGE: string = 'graph/REMOVE_EDGE'




export const actionsCreators = {
  addVertex(name: string): IGraphActionVertex {
    return {
      type: ADD_VERTEX,
      vertex: { name } as IVertexView
    };
  },
  removeVertex(name: string): IGraphActionVertex {
    return {
      type: REMOVE_VERTEX,
      vertex: { name } as IVertexView
    };
  },
  addEdge(vertexOne: string, vertexTwo: string): IGraphActionEdge {
    return {
      type: ADD_EDGE,
      edge: { vertexOne, vertexTwo } as IEdgeView
    };
  },
  removeEdge(vertexOne: string, vertexTwo: string): IGraphActionEdge {
    return {
      type: REMOVE_EDGE,
        edge: { vertexOne, vertexTwo } as IEdgeView
    };
  }
};