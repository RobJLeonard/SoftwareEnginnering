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

    it('should add several nodes to the tree unorder', () => {
      let tree = new BSTree();

      let array = [8,3,10,1,6,4,7,14,13,9];

      array.forEach(element => {
        tree.add(element)
      });

      expect(tree.size()).to.equal(10);
    })

  });

  describe('findPath() tests', () => {

    it('should return true for elements with a path from the root', () =>{
      let tree = new BSTree();
      let array = [8,3,10,1,6,4,,7,14,13,9,0];

      array.forEach(element => {
        tree.add(element)
      });

      let path = [];
      expect(tree.findPath(tree.root,path,9)).to.be.true;
    })

    it('should return false for elements without a path from the root', () =>{
      let tree = new BSTree();
      let array = [8,3,10,1,6,4,7,14,13,9,0];

      array.forEach(element => {
        tree.add(element)
      });

      let path = [];
      expect(tree.findPath(tree.root,path,18)).to.be.false;
    })
  });

  describe('Lowest Common Ancestor Tests', () => {

    it('should test findLCA for an empty tree', () =>{
      let tree = new BSTree();
      
      expect(tree.findLCA(3,5)).to.be.undefined;
    })

    it('should test findLCA for a tree of 10 nodes', () =>{
      let tree = new BSTree();
      
      tree.add(8);
      tree.add(3);
      tree.add(10);
      tree.add(1);
      tree.add(6);
      tree.add(4);
      tree.add(7);
      tree.add(14);
      tree.add(13);
      tree.add(9);
      tree.add(0);

      expect(tree.findLCA(0,4)).to.equal(3);
    })
  })