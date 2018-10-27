import { Vertex } from '../src/Vertex';
import { expect } from 'chai';
import 'jest';

/**
 * Creates an array of isolated vertices.
 */
const setup = (): Vertex[] => {
	const fixtures: Vertex[] = [];
	for (let i = 0; i < 5; i++) {
		fixtures[i] = new Vertex(i);
	}
	return fixtures;
};

/**
 * Creates an array of vertices with the following topology:
 * 
 * 	  0 --+-----------+
 * 		  |           |
 *        1           |
 *                    |
 *            2       |
 *            |       |
 *            +---3   |
 *                    |
 *                    4 
 */
const setupAndConnect = (): Vertex[] => {
	const fixtures = setup();
	fixtures[0]
		.insertAfter(fixtures[1])
		.insertAfter(fixtures[2])
		.insertAfter(fixtures[3])
		.insertAfter(fixtures[4]);
	fixtures[0].connectTo(fixtures[1]);
	fixtures[0].connectTo(fixtures[4]);
	fixtures[2].connectTo(fixtures[3]);
	return fixtures;
};

describe('Testing the Vertex constructor', ()=> {

    it('should return a new instance of vertex.', () => {
        const vertex0 = new Vertex();
        expect(vertex0).to.be.instanceOf(Vertex);
    });

    it('should assign the default id (0) to the new vertex.', () => {
        const vertex0 = new Vertex();
        expect(vertex0.id).to.equal(0);
    });

    it('should assign the given id to the new vertex.', () => {
        const givenId = 5;
        const vertex0 = new Vertex(givenId);
        expect(vertex0.id).to.equal(givenId);
    });
});

describe('Testing the Vertex join function', ()=> {

    it('should set the next property of v1 to v2.', () => {
        const vertices = setup();
        
        Vertex.join(vertices[0], vertices[1]);
        expect(vertices[0].next).to.equal(vertices[1]);
        expect(vertices[1].previous).to.equal(vertices[0]);
        
        Vertex.join(null, vertices[0]);
        expect(vertices[0].previous).to.be.null;
        
        Vertex.join(vertices[1], null);
        expect(vertices[1].next).to.be.null;
    });
});

describe('Testing the Vertex unjoin function', ()=> {

    it('should the "next" and "previous" property of the given vertex to null.', () => {
        const v = setup();

		Vertex.join(v[0], v[1]);
		Vertex.join(v[1], v[2]);
        Vertex.unjoin(v[1]);
        
        expect(v[0].next).to.equal(v[1]);
        expect(v[1].previous).to.be.null;
        expect(v[1].next).to.be.null;
    });
});