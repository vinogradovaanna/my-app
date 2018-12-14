import {actionsCreators, store, CommonGraphAdapter} from "graphlabs.core.template"
import * as React from 'react';
import {select} from 'd3-selection';
import * as d3 from 'd3';
// import {Vertex} from 'graphlabs.core.graphs';

export class Adapter extends CommonGraphAdapter {
  private storeVertices: any[] = [];

  constructor() {
    super();
    this.checkIntersection = this.checkIntersection.bind(this);
  }

  public render() {
    return super.render();
  }

  public renderSvg() {
    super.graphVisualizer.width = super.ref.clientWidth;
    super.graphVisualizer.height = super.ref.clientHeight;
    super.graphVisualizer.calculate();
    for (const elem of super.graphVisualizer.geometric.edges) {
      const data = [{x: elem.outPoint.X, y: elem.outPoint.Y}, {x: elem.inPoint.X, y: elem.inPoint.Y}];
      if (elem.edge.vertexOne.name[0] == "a") {
        select(super.ref)
          .append('line')
          .attr('id', `edge_${elem.edge.vertexOne.name}_${elem.edge.vertexTwo.name}`)
          .attr('out', elem.edge.vertexOne.name)
          .attr('in', elem.edge.vertexTwo.name)
          .attr('x1', data[0].x)
          .attr('x2', data[1].x)
          .attr('y1', data[0].y)
          .attr('y2', data[1].y)
          .style('stroke', '#DB3E00')
          .style('stroke-width', 5)
          .style('fill', 'none')
          .on('click', super.clickEdge.bind(this));
      } else {
        select(super.ref)
          .append('line')
          .attr('id', `edge_${elem.edge.vertexOne.name}_${elem.edge.vertexTwo.name}`)
          .attr('out', elem.edge.vertexOne.name)
          .attr('in', elem.edge.vertexTwo.name)
          .attr('x1', data[0].x)
          .attr('x2', data[1].x)
          .attr('y1', data[0].y)
          .attr('y2', data[1].y)
          .style('stroke', '#1A237E')
          .style('stroke-width', 5)
          .style('fill', 'none')
          .on('click', super.clickEdge.bind(this));
      }
    }
    const end = () => {
      this.checkIntersection();
    };

    const startDrag = () => {
      const circle = d3.select(this).classed('dragging', true);

      const dragged = (d: any) => {
        // if (d3.event.x < referrer.clientWidth - radius
        //     && d3.event.x > radius && d3.event.y < referrer.clientHeight - radius && d3.event.y > radius) {
        circle.raise().attr('cx', d3.event.x).attr('cy', d3.event.y);
        const name = circle.attr('id');
        const _id = name.substring(7);
        select(`#label_${_id}`)
          .raise()
          .attr('x', d3.event.x)
          .attr('y', d3.event.y + +circle.attr('r') / 4);
        d3.selectAll('line').each( (l: any, li: any) => {
          if (`vertex_${d3.select(this).attr('out')}` === name) {
            select(this)
              .attr('x1', d3.event.x)
              .attr('y1', d3.event.y);
          }
          if (`vertex_${d3.select(this).attr('in')}` === name) {
            select(this)
              .attr('x2', d3.event.x)
              .attr('y2', d3.event.y);
          }
        });
        // } else {
        //     console.log("ATTENTION!!!");
        // }
      };
      d3.event.on('drag', dragged);

      function ended() {
        circle.classed('dragging', false);
      }
    };

    for (const elem of super.graphVisualizer.geometric.vertices) {
      if (elem.vertex.name[0] == "a") {
        select(super.ref)
          .append('circle')
          .attr('id', `vertex_${elem.label}`)
          .attr('cx', elem.center.X)
          .attr('cy', elem.center.Y)
          .attr('r', elem.radius)
          .style('fill', '#eee')
          .style('stroke', '#DB3E00')
          .style('stroke-width', 5)
          .classed('dragging', true)
          .call(d3.drag()
            .on('start', startDrag)
            .on('end', end.bind(this)))
          //    .call(d3.drag().on('end', this.checkIntersection()))
          .on('click', super.clickVertex.bind(this));
        select(super.ref)
          .append('text')
          .attr('id', `label_${elem.label}`)
          .attr('x', elem.center.X)
          .attr('y', elem.center.Y + elem.radius / 4)
          .attr('font-size', elem.radius)
          .text(elem.label)
          .style('fill', '#000')
          .style('font-family', 'sans-serif')
          .style('text-anchor', 'middle')
          .style('padding-top', '50%')
          .style('user-select', 'none')
          .style('pointer-events', 'none')
      } else {
        select(super.ref)
          .append('circle')
          .attr('id', `vertex_${elem.label}`)
          .attr('cx', elem.center.X)
          .attr('cy', elem.center.Y)
          .attr('r', elem.radius)
          .style('fill', '#eee')
          .style('stroke', '#1A237E')
          .style('stroke-width', 5)
          .classed('dragging', true)
          .call(d3.drag()
            .on('start', startDrag)
            .on('end', end.bind(this)))
          .on('click', super.clickVertex.bind(this));
        select(super.ref)
          .append('text')
          .attr('id', `label_${elem.label}`)
          .attr('x', elem.center.X)
          .attr('y', elem.center.Y + elem.radius / 4)
          .attr('font-size', elem.radius)
          .text(elem.label)
          .style('fill', '#000')
          .style('font-family', 'sans-serif')
          .style('text-anchor', 'middle')
          .style('padding-top', '50%')
          .style('user-select', 'none')
          .style('pointer-events', 'none')
      }

    }
  }

  public updateSvg() {
    super.graphVisualizer.width = super.ref.clientWidth;
    super.graphVisualizer.height = super.ref.clientHeight;
    super.graphVisualizer.calculate();
    for (const elem of super.graphVisualizer.geometric.vertices) {
      select(`#vertex_${elem.label}`)
        .attr('cx', elem.center.X)
        .attr('cy', elem.center.Y)
        .attr('fill', 'black')
        .attr('r', elem.radius);
      select(`#label_${elem.label}`).raise().attr('x', elem.center.X).attr('y', elem.center.Y);
    }

    for (const elem of super.graphVisualizer.geometric.edges) {
      select(`#edge_${elem.edge.vertexOne.name}_${elem.edge.vertexTwo.name}`)
        .attr('x1', elem.outPoint.X)
        .attr('x2', elem.inPoint.X)
        .attr('y1', elem.outPoint.Y)
        .attr('y2', elem.inPoint.Y);
    }
  }

  public checkIntersection() {
    const checked = [];
    const output: any[] = [];
    const i: any = {};
    i.x = 0;
    i.y = 0;
    i.r = 0;
    i.name = '';
    console.log(this.storeVertices.toString());
    for (const elem of super.graphVisualizer.geometric.vertices) {
      var str = 'vertex_' + elem.label;
      i.x = super.ref.getElementById(str).cx.baseVal.value;
      i.y = super.ref.getElementById(str).cy.baseVal.value;
      i.r = super.ref.getElementById(str).r.baseVal.value;
      i.name = elem.label;
      for (const vertex of checked) {
        if (
          ((x, y) => Math.sqrt(x ** 2 + y ** 2))(
            Math.abs(i.x - vertex.x),
            Math.abs(i.y - vertex.y)
          ) < i.r + vertex.r
        ) {
          output.push(vertex.name, i.name);
          checked.splice(checked.indexOf(vertex), 1);
          if (vertex.name[0] != i.name[0]) {
            select(`#vertex_${elem.label}`)
              .style('stroke', 'green');
            select(`#vertex_${vertex.name}`)
              .style('stroke', 'green');
          }
          else {
            if (vertex.name[0] == 'a') {
              select(`#vertex_${elem.label}`)
                .style('stroke', '#DB3E00');
              select(`#vertex_${vertex.name}`)
                .style('stroke', '#DB3E00');
            }
            else {
              select(`#vertex_${elem.label}`)
                .style('stroke', '#1A237E');
              select(`#vertex_${vertex.name}`)
                .style('stroke', '#1A237E');
            }
          }
        }
      }
      checked.push(i);
    }
    if (this.storeVertices.length >= output.length) {
      this.storeVertices.forEach(function (item, i, arr) {
        if (output.indexOf(item) == -1) {
          if (item[0] == 'a') select(`#vertex_${item}`)
            .style('stroke', '#DB3E00');
          if (item[0] == 'b') select(`#vertex_${item}`)
            .style('stroke', '#1A237E');
          if (i % 2 == 1) store.dispatch(actionsCreators.removeIntersection(arr[i], arr[i + 1]));
        }
      });

    }
    if (output.length > this.storeVertices.length) {
      alert(output[output.length - 2] + output[output.length - 1]);
      store.dispatch(actionsCreators.addIntersection(output[output.length - 2], output[output.length - 1]));
    }

    console.log(output.toString());
    this.storeVertices = output;

  }
}
