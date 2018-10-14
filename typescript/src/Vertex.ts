import { Edge, ProtoEdge } from "./edge";

/**
 * Represents a vertex within a directed-acyclic-graph.
 */
export class Vertex {

	private _id: number;

	private _next: Vertex = null;
	private _previous: Vertex = null;

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
	 * Produces a string representation of this vertex.
	 */
	toString(): String {
		return `Vertex [$this.id]`;
	}
	
}