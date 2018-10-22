import { Edge, ProtoEdge } from "./edge";

/**
 * Represents a vertex within a directed-acyclic-graph.
 */
export class Vertex {

	private _id: number;

	public _next: Vertex = null;
	public _previous: Vertex = null;

	private _uplinks: Edge[] = [];
	private _downlinks: Edge[] = [];

	/**
	 * Joins the given vertices such that the second is the first's next.  This method does not
	 * repair the structure of the chain.
	 */
	static join(v1: Vertex, v2: Vertex): void {
		v1 && (v1._next = v2);
		v2 && (v2._previous = v1);
	}

	/**
	 * Instantiates a new instance of Vertex.
	 */
	constructor(id: number = 0) {
		this._id = id;
	}

	/** Gets or sets the content of this vertex. */
	public content: any;

	/** Gets the unique id of this Vertex. */
	get id(): number {
		return this._id;
	}

	/** Gets the collection of uplinks. */
	get uplinks(): Edge[] { return this._uplinks; }

	/** Gets the collection of downlinks. */
	get downlinks(): Edge[] { return this._downlinks; }

	/** Gets the first vertex in the chain. */
	get first(): Vertex { 
		return this._previous ? this._previous.first : this; 
	}

	/**
	 * Inserts the given vertex directly after this one.
	 * @param {Vertex} vertex The vertex to insert.
	 */
	insertAfter(vertex: Vertex): Vertex {
		const next = this._next;
		Vertex.join(vertex._previous, vertex._next);
		Vertex.join(this, vertex);
		Vertex.join(vertex, next);
		return vertex;
	}

	/**
	 * Connects this vertex to the given vertex, returning a new instance of edge which defines the
	 * relationship between the two vertices.
	 */
	connectTo(vertex: Vertex, id: number = 0): Edge {
		for (let e of this._downlinks) {
			if (e.bottom === vertex) {
				throw new Error("The vertices are already connected.");
			}
		}
		const e: Edge = {
			id: id,
			top: this,
			bottom: vertex,
			content: null
		};
		this._downlinks.push(e);
		vertex._uplinks.push(e);
		return e;
	}

	/**
	 * Returns an array of vertices to which this vertex direectly connects.
	 */
	directlyBelow(): Vertex[] {
		return this._downlinks.map(e => e.bottom);
	}

	/**
	 * Returns an array of vertices to which this vertex connects directly or indirectly.
	 */
	below(): Vertex[] {
		return this.directlyBelow().reduce((prev, cur) => {
			return [ ...prev, cur, ...cur.directlyBelow() ];
		}, []);
	}

	/**
	 * Returns true if the given vertex is a direct or indirect downlink of this vertex.
	 */
	isBelow(vertex: Vertex): boolean {
		if (vertex === this) {
			return false;
		}
		const cb = (e, i, arr) => e === vertex;
		return this.below().some(cb, this);
	}

	/**
	 * Returns an array of possible edges that could be created without creating a cyclical
	 * connection.
	 */
	availableConnections(): ProtoEdge[] {
		const protos: ProtoEdge[] = [];
		const isConnected = (v: Vertex) => this._downlinks.some(e => e.bottom === v);
		let pointer = this.first;
		while (pointer) {
			if (pointer !== this && !pointer.isBelow(this) && !isConnected(pointer)) {
				protos.push({
					top: this,
					bottom: pointer
				});
			}
			pointer = pointer._next;
		}
		return protos;
	}

	/**
	 * Produces a string representation of this vertex.
	 */
	toString(): String {
		return `Vertex [$this.id]`;
	}
	
}