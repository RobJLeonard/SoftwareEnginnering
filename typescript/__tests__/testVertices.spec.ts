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

describe('Testing the Vertex prototype remove function', ()=> {

    it('should stitch the subject\'s "next" and "previous" vertices together.', () => {
        const v = setup();

		Vertex.join(v[0], v[1]);
		Vertex.join(v[1], v[2]);
        
        const removedVertex = v[1].remove();
        
        expect(removedVertex).to.equal(v[1]);
        expect(v[0].next).to.equal(v[2]);
        expect(v[2].previous).to.equal(v[0]);
    });

    it('should stitch the subject\'s "next" and "previous" vertices to null.', () => {
        const v = setup();

		Vertex.join(v[0], v[1]);
		Vertex.join(v[1], v[2]);
        
        const removedVertex = v[1].remove();
        
        expect(removedVertex).to.equal(v[1]);
        expect(v[1].next).to.be.null;
        expect(v[1].previous).to.be.null;
    });
});

describe('Testing the Vertex prototype insertBefore function', ()=> {

    it('should set the vertex\'s "previous" property to be the subjects\'s "previous" property.', () => {
        const vertices = setup();
        
        vertices[0].insertBefore(vertices[1]);
        expect(vertices[0].previous).to.equal(vertices[1]);		
    });

    it('should set the vertex\'s "next" property to be the subjects\'s "next" property.', () => {
        const vertices = setup();
        vertices[0].insertBefore(vertices[1]);
        expect(vertices[1].next).to.equal(vertices[0]);
    });

    it('should return the given vertex', () => {
        const vertices = setup();
        const vertexBefore = vertices[0].insertBefore(vertices[1]);
        expect(vertexBefore).to.equal(vertices[1]);
    });
});

describe('Testing the Vertex prototype insertBefore + get function', ()=> {

    it('should retrun an array of vertices which come before the subject in the chain.', () => {
        const v = setup();

		v[2].insertBefore(v[1]);
		v[1].insertBefore(v[0]);
        const array = v[2].before;
        //const vertices = [ v[1], v[0] ];
        const vertices = [ v[1], v[0] ];
    
        expect(array).to.deep.equal(vertices);	
    });

});

describe('Testing the Vertex prototype insertAfter function', ()=> {

    it('should set the vertex\'s "next" property to be the subjects\'s "next" property.', () => {
        const vertices = setup();
        
        vertices[0].insertAfter(vertices[1]);
        expect(vertices[0].next).to.equal(vertices[1]);		
    });

    it('should set the vertex\'s "previous" property to be the subjects\'s "previous" property.', () => {
        const vertices = setup();
        vertices[0].insertAfter(vertices[1]);
        expect(vertices[1].previous).to.equal(vertices[0]);
    });

    it('should return the given vertex', () => {
        const vertices = setup();
        const vertexAfter = vertices[0].insertAfter(vertices[1]);
        expect(vertexAfter).to.equal(vertices[1]);
    });
});

describe('Testing the Vertex prototype insertAfter + get function', ()=> {

    it('should return an array of vertices which come after the subject in the chain.', () => {
        const v = setup();

		v[0].insertAfter(v[1]);
		v[1].insertAfter(v[2]);
        const array = v[0].after;
        const vertices = [ v[1], v[2] ];
    
        expect(array).to.deep.equal(vertices);	
    });

});

describe('Testing the Vertex prototype first and last functions', ()=> {

    it('should return the first vertex in the chain.', () => {
        const v = setup();
        expect(v[0].first).to.equal(v[0], "v[0] is first in the chain");

        v[0].insertBefore(v[1]);
        expect(v[0].first).to.equal(v[1], "v[1] is now first in the chain according t0 v[0]");

        v[1].insertBefore(v[2]);
        expect(v[0].first).to.equal(v[2], "v[2] is now first in the chain according to v[0]");
        expect(v[0].first).to.equal(v[2], "v[2] is now first in the chain according to v[1] also");;	
    });

    it('should return the last vertex in the chain.', () => {
        const v = setup();
        expect(v[0].last).to.equal(v[0], "v[0] is last in the chain");

        v[0].insertAfter(v[1]);
        expect(v[0].last).to.equal(v[1], "v[1] is now last in the chain according t0 v[0]");

        v[1].insertAfter(v[2]);
        expect(v[0].last).to.equal(v[2], "v[2] is now last in the chain according to v[0]");
        expect(v[0].last).to.equal(v[2], "v[2] is now last in the chain according to v[1] also");;	
    });

});