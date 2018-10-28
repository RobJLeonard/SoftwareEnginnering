import { Edge, ProtoEdge } from "./edge";
import { Vertex } from "./vertex";

/**
 * Function signature for traversing the graph.
 */
export interface TraversalCallback { (vertex: Vertex, index: number): boolean; }

/**
 * Represents a directed-acyclic-graph.
 */
export class Graph {

	/** Array of vertices ordered by Vertex.prototype.id. */
	private _vertices: Vertex[];
	/** Array of edges ordered by Edge.id. */
	private _edges: Edge[];

	/**
	 * Instantiates a new instance of Graph.
	 */
	constructor() {
		this._vertices = [];
		this._edges = [];
	}

	/** Gets the array of vertices contained in this graph. */
	public get vertices(): Vertex[] { return this._vertices; }

	/** Gets the array of edges contained in the graph. */
	public get edges(): Edge[] { return this._edges; }

	/**
	 * Adds a new vertex to the graph.
	 */
	addVertex(...uplinks: Vertex[]): Vertex {
		const v = new Vertex(this._vertices.length);
		this._vertices.length && this._vertices[0].last.insertAfter(v);
		this._vertices.push(v);
		for (let l of uplinks) {
			this._edges.push(l.connectTo(v, this._edges.length));
		}
		return v;
	}

	/**
	 * Adds a new edge to the graph.
	 */
	addEdge(top: Vertex, bottom: Vertex): Edge {
		const proto: ProtoEdge = { top: top, bottom: bottom };
		const cb = e => e.top === proto.top && e.bottom === proto.bottom;
		if (!top.availableConnections().some(cb)) {
			throw new Error('Unable to create edge.  Circular connection detected!');
		}
		const e = top.connectTo(bottom, this._edges.length);
		this._edges.push(e);
		return e;
	}

	/**
	 * Clears all vertices and edges from the graph.
	 */
	public clear() {
		this._vertices = [];
		this._edges = [];
	}

	/**
	 * Finds the Common ancestors of two vertices in the graph
	 */
	public commonAncestors(v0: Vertex, v1: Vertex): Vertex[] {
		const v0Ancestors = v0.before;
		const v1Ancestors = v1.before;
		const commonAncestors: Vertex[] = [];
		v0Ancestors.forEach(ancestorVertex0 => {
			v1Ancestors.forEach(ancestorVertex1 => {
				if(ancestorVertex0 === ancestorVertex1)
				commonAncestors.push(ancestorVertex0);
			});
		});
		return commonAncestors;
	}

	/**
	 * Finds the Lowest Common ancestor of two vertices in the graph
	 */
	public lowestCommonAncestor(v0: Vertex, v1: Vertex): Vertex {
		const ancestors: Vertex[] = this.commonAncestors(v0, v1)
		return ancestors[0];
	}

}