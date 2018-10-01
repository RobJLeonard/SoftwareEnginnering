import BSTree from '../src/BST';
import { expect } from 'chai';
import 'jest';

describe('Create Binary Tree', () => {

    it('should create a binary tree', () => {
        let tree = new BSTree();
        // checks if the tree was created successfully
        expect(tree).exist;
    });

    it('should check if the tree isEmpyt', () => {
        let tree = new BSTree();

        expect(tree.isEmpty()).to.be.true;
    })
});

describe('Adding Nodes to the tree', () => {

    it('should add one node to the tree', () => {
        let tree = new BSTree();

        tree.add(1);
        expect(tree.size()).to.equal(1);
    })

    it('should check if the tree isEmpty', () => {
        let tree = new BSTree();

        tree.add(1);

        expect(tree.isEmpty()).to.be.false;
    })

    it('should add several nodes to the tree in order', () => {
        let tree = new BSTree();
        tree.add(1);
        tree.add(2);
        tree.add(3);
        tree.add(4);
        tree.add(5);

        expect(tree.size()).to.equal(5);
    })

    it('should add several nodes to the tree in reverse order', () => {
        let tree = new BSTree();
        tree.add(5);
        tree.add(4);
        tree.add(3);
        tree.add(2);
        tree.add(1);

        expect(tree.size()).to.equal(5);
    })

    it('should add several nodes to the tree unordered', () => {
        let tree = new BSTree();

        let array = [8, 3, 10, 1, 6, 4, 7, 14, 13, 9];

        array.forEach(element => {
            tree.add(element)
        });

        expect(tree.size()).to.equal(10);
    });

    it('should return false if element is undefined', () => {
        let tree = new BSTree();

        expect(tree.add(undefined)).to.be.false;
    });

    it('should return false if element is already in the tree', () => {
        let tree = new BSTree();

        tree.add(5);
        
        expect(tree.add(5)).to.be.false;
    })

});

describe('Searching for Nodes', () => {
    
    it('should return undefined for an empty tree', ()=> {
        let tree = new BSTree();

        expect(tree.search(5)).to.be.undefined;
    });

    it('should return the value of the node if it exists in the tree', () =>{
        let tree = new BSTree();

        let array = [8, 3, 10, 1, 6, 4, 7, 14, 13, 9];

        array.forEach(element => {
            tree.add(element)
        });

        expect(tree.search(6)).to.equal(6)
    });

    it('should return a true if the element exists in the tree', () => {
        let tree = new BSTree();

        let array = [8, 3, 10, 1, 6, 4, 7, 14, 13, 9];

        array.forEach(element => {
            tree.add(element)
        });

        expect(tree.contains(7)).to.be.true
    });

    it('should return a false if the element does not exists in the tree', () => {
        let tree = new BSTree();

        let array = [8, 3, 10, 1, 6, 4, 7, 14, 13, 9];

        array.forEach(element => {
            tree.add(element)
        });

        expect(tree.contains(-8)).to.be.false;
    });

    it('should return false if element is undefined', () => {
        let tree = new BSTree();

        expect(tree.contains(undefined)).to.be.false;
    });
})

describe('Removing elements from the tree', () => {

    it('should return false if the tree is empty', () =>{
        let tree = new BSTree();

        expect(tree.remove(5)).to.be.false;
    });

    it('should return true if the element is removed from the tree', () =>{
        let tree = new BSTree();

        tree.add(5);

        expect(tree.remove(5)).to.be.true;
    });

    it('should remove all nodes from the tree', () => {
        let tree = new BSTree();

        let array = [8, 3, 10, 1, 6, 4, 7, 14, 13, 9];

        array.forEach(element => {
            tree.add(element)
        });

        tree.clear();
        expect(tree.isEmpty()).to.be.true;
    });

    it('should remove element with no children from tree', ()=> {
        let tree = new BSTree();

        let array = [8, 3, 10, 1, 6, 4, 7, 14, 13, 9];

        array.forEach(element => {
            tree.add(element)
        });

        tree.remove(4);
        expect(tree.search(4)).to.be.undefined;
    });

    it('should remove element with left child from tree', ()=> {
        let tree = new BSTree();

        let array = [8, 3, 10, 1, 6, 4, 7, 14, 13, 9];

        array.forEach(element => {
            tree.add(element)
        });

        tree.remove(14);
        expect(tree.search(14)).to.be.undefined;
    });

    it('should remove element with right child from tree', ()=> {
        let tree = new BSTree();

        let array = [8, 3, 10, 1, 6, 4, 7, 14, 13, 9, 15, 16];

        array.forEach(element => {
            tree.add(element)
        });

        tree.remove(15);
        expect(tree.search(15)).to.be.undefined;
    });

    it('should remove element 2 children from tree', ()=> {
        let tree = new BSTree();

        let array = [8, 3, 10, 1, 6, 4, 7, 14, 13, 9];

        array.forEach(element => {
            tree.add(element)
        });

        tree.remove(10);
        expect(tree.search(10)).to.be.undefined;
    });
})
