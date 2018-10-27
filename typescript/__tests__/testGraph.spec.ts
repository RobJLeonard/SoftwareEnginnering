import { Graph } from '../src/Graph';
import { Vertex } from '../src/Vertex';
import { expect } from 'chai';
import 'jest';



/**
 * Creates a Graph with the following topology:
 */
const setup = (): Graph => {
	return new Graph();
};

/**
 * Creates a Graph with the following topology:
 * 
 * 	  0---+-----------+
 * 		  |           |
 *        1           |
 *                    |
 *            2       |
 *            |       |
 *            +---3   |
 *                    |
 *                    4 
 */
const setupAndConnect = (): Graph => {
	const g = new Graph();
	const v0 = g.addVertex();
	const v1 = g.addVertex(v0);
	const v2 = g.addVertex();
	const v3 = g.addVertex(v2);
	const v4 = g.addVertex(v0);
	return g;
}

describe('Testing the Graph constructor', () => {

    it('Should create a new graph', () => {
        const graph = new Graph();

        expect(graph.vertices).to.be.empty;
        expect(graph.edges).to.be.empty;
    });
});

describe('Testing the Graph prototype addVertex function', () => {

    it('Should create a new vertex on the graph, \
        Assign it the next availabe id\
        - insert it at the end of the chain\
        Add it to the array of vertices\
        - optionally create an edge between the new vertex and each given vertex', () => {
        const graph = new Graph();
        const v0 = graph.addVertex();
        expect(v0.id).to.equal(0, "v0 gets default id of 0")
        expect(graph.vertices).to.deep.equal([v0]);
    });
});
