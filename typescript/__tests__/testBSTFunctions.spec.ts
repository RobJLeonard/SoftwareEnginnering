import BSTree from '../src/BST';
import { expect } from 'chai';
import 'jest';

describe('Minimum Function Tests', ()=> {

    it('should return undefined if the tree is empty', () => {
        let tree = new BSTree();

        expect(tree.minimum()).to.be.undefined
    });

    it('should return the minimum element of the tree', () => {
        let tree = new BSTree();

        let array = [8, 3, 10, 1, 6, 4, 7, 14, 13, 9];

        array.forEach(element => {
            tree.add(element)
        });

        expect(tree.minimum()).to.equal(1);
    });
});

describe('Maximum Function Tests', ()=> {

    it('should return undefined if the tree is empty', () => {
        let tree = new BSTree();

        expect(tree.maximum()).to.be.undefined
    });

    it('should return the minimum element of the tree', () => {
        let tree = new BSTree();

        let array = [8, 3, 10, 1, 6, 4, 7, 14, 13, 9];

        array.forEach(element => {
            tree.add(element)
        });

        expect(tree.maximum()).to.equal(14);
    });
});

describe('Height Function Tests', ()=> {

    it('should return -1 if the tree is empty', () => {
        let tree = new BSTree();

        expect(tree.height()).to.equal(-1)
    });

    it('should return the minimum element of the tree', () => {
        let tree = new BSTree();

        let array = [8, 3, 10, 1, 6, 4, 7, 14, 13, 9];

        array.forEach(element => {
            tree.add(element)
        });

        expect(tree.height()).to.equal(3);
    });
});