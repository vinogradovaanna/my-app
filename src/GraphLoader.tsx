// import {Edge, Graph, Vertex} from "graphlabs.core.graphs"
//
// export class GraphLoader {
//
//   static parseFromStr() {
//
//     var str = '{"id": [ { "vertex": ["a1","a2","a3","a4","a5"], "edge": ["a1","a2","a2","a3","a4","a5"] },' +
//       '{"vertex":["b1", "b2","b3","b4","b5"], "edge": ["b1","b2","b2","b3","b4","b5","b2","b4"]} ]}';
//     var obj = JSON.parse(str);
//     return obj;
//   }
//
//   static createGraph(obj: any, id: number) {
//
//     var graph = new Graph<Vertex, Edge>();
//
//     obj.id[id].vertex.forEach((item: Vertex, i: number) => {
//       graph.addVertex(new Vertex(obj.id[id].vertex[i], graph));
//     });
//
//     obj.id[id].edge.forEach((item: Edge, i: number) => {
//       if (i % 2 == 0) {
//         graph.addEdge(new Edge(graph.getVertex(obj.id[id].edge[i])[0], graph.getVertex(obj.id[id].edge[i + 1])[0]));
//       }
//     });
//
//     return graph;
//   };
// }