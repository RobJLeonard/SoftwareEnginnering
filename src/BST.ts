class BSTNode {
    data: number
    left: BSTNode;
    right: BSTNode;
    
    Node(value: number){
        let data = value;
        this.left = this.right = null;
    }

}

class BinaryTree {
    root: Node

    findLCA(decendant1: number, decendant2: number): string{
        return "Hello";
    }

    findLCAFromRoot(root: Node, decendant1: number, decendant2: number){
        return
    }
}

let tree = new BinaryTree;
console.log(tree.findLCA);