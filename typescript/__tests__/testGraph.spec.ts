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

/**
 * Creates a larger Graph 
 */
const setupAndConnectLarge = (): Graph => {
	const g = new Graph();
	const v0 = g.addVertex();
	const v1 = g.addVertex(v0);
	const v2 = g.addVertex(v0);
	const v3 = g.addVertex(v1);
    const v4 = g.addVertex(v2);
    const v5 = g.addVertex(v4);
    const v6 = g.addVertex();
    const v7 = g.addVertex(v2);
    const v8 = g.addVertex(v6);
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

describe('Testing the Graph prototype addEdge function', () => {

    it('Should thorw an error if the connection is no available', () => {
        const graph = setupAndConnect();
        const thorwError = () => {graph.addEdge(graph.vertices[4], graph.vertices[0]);}
        expect(thorwError).throws('Unable to create edge.  Circular connection detected!');
    });

    it('Should assign the edge the next available id.', () => {
        const graph = setupAndConnect();
        const edge = graph.addEdge(graph.vertices[3], graph.vertices[0]);
        expect(edge.id).to.equal(3, 'assigns the new edge an id of 3');
    });

    it('Should assign the edge the given top and bottom vertices.', () => {
        const graph = setupAndConnect();
        const edge = graph.addEdge(graph.vertices[3], graph.vertices[0]);
        expect(edge.top).to.equal(graph.vertices[3], 'assigns the top of the edge to be v[3]');
        expect(edge.bottom).to.equal(graph.vertices[0], 'assigns the bottom of the edge to be v[0]');
    });
});

describe('Testing the Graph clear function', () => {

    it('Should remove all vertices and edges from the graph', () => {
        const graph = setupAndConnect();
        graph.clear();
        expect(graph.vertices).to.be.empty;
        expect(graph.edges).to.be.empty;
    });
});


describe('Testing the Graph lowest common ancestor function', () => {

    it('Should return an array of the common ancestors of the given vertices', () => {
        const graph = setupAndConnect();
        const commonAncestors = graph.commonAncestors(graph.vertices[1], graph.vertices[4]);
        expect(commonAncestors).to.deep.equal([graph.vertices[0]]);
    });

    it('Should return the lowest common ancestor of the given vertices', () => {
        const graph = setupAndConnect();
        const lca = graph.lowestCommonAncestor(graph.vertices[1], graph.vertices[4]);
        expect(lca).to.deep.equal(graph.vertices[0]);
    });

    it('Should returns an array of the common ancestors of the given vertices', () => {
        const graph = setupAndConnectLarge();
        const commonAncestors = graph.commonAncestors(graph.vertices[5], graph.vertices[3]);
        
        expect(commonAncestors).to.deep.equal([graph.vertices[2], graph.vertices[1], graph.vertices[0]]);
    });

    it('Should returns an empty array if there are no common ancestors of the given vertices', () => {
        const graph = setupAndConnect();
        const commonAncestors = graph.commonAncestors(graph.vertices[0], graph.vertices[2]);
        
        expect(commonAncestors).to.be.empty;
    });
});
