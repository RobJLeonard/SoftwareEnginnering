import BSTree from '../src/BST';
import { expect } from 'chai';
import 'mocha';

describe('Create Binary Search Tree Function', () => {

    it('should create a binary search tree', () => {
      const result = new BSTree();
      expect(result).to.equal(new BSTree);
    });
  
  });