import BSTree from '../src/BST';
import { expect } from 'chai';
import 'jest';


  describe('findPath() tests', () => {

    it('should return false for an empty tree', () => {
      let tree = new BSTree();

      let path = [];

      expect(tree.findPath(this.root, path,  5))
    });

    it('should return true for elements with a path from the root', () =>{
      let tree = new BSTree();
      let array = [8,3,10,1,6,4,,7,14,13,9,0];

      array.forEach(element => {
        tree.add(element)
      });

      let path = [];
      expect(tree.findPath(tree.root,path,9)).to.be.true;
    });

    it('should return false for elements without a path from the root', () =>{
      let tree = new BSTree();
      let array = [8,3,10,1,6,4,7,14,13,9,0];

      array.forEach(element => {
        tree.add(element)
      });

      let path = [];
      expect(tree.findPath(tree.root,path,18)).to.be.false;
    });
  });

  describe('Lowest Common Ancestor Tests', () => {

    it('should return undefined for an empty tree', () =>{
      let tree = new BSTree();
      
      expect(tree.findLCA(3,5)).to.be.undefined;
    });

    it('should undefined elements not in the tree', () =>{
      let tree = new BSTree();
      
      let array = [8, 3, 10, 1, 6, 4, 7, 14, 13, 9];

        array.forEach(element => {
            tree.add(element)
        });

      expect(tree.findLCA(15,25)).to.be.undefined;
    });

    it('should test findLCA for a tree of 10 nodes', () =>{
      let tree = new BSTree();
      
      let array = [8, 3, 10, 1, 6, 4, 7, 14, 13, 9, 0];

        array.forEach(element => {
            tree.add(element)
        });

      expect(tree.findLCA(0,4)).to.equal(3);
    });
  });