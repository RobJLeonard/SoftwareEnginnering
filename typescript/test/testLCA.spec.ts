import BSTree from '../src/BST';
import { expect } from 'chai';
import 'mocha';

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

    it('should add several nodes to the tree in random order', () => {
      let tree = new BSTree();
      
      for (let index = 0; index < 10; index++) {
        tree.add(Math.floor((100*Math.random())));
      }

      expect(tree.size()).to.equal(10);
    })

  });