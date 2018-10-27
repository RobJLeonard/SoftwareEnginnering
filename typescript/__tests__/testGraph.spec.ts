import { Graph } from '../src/Graph';
import { expect } from 'chai';
import 'jest';


describe('Create DAG Graph', () => {

    it('Should create a graph node', () => {
        let graph = new Graph();

        let v1 = graph.addVertex();

        let v2 = graph.addVertex();

        
        graph.addEdge(v1, v2);

        console.log(graph.vertices[0].toString());

        expect(graph.vertices).to.be.not.null;
    });
});
