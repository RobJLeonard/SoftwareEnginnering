import unittest
import BST

class TestLowestCommonAncestor (unittest.TestCase):

    # Driver program to test above function 
    # Let's create the Binary Tree shown in above diagram 
    root = Node(1) 
    root.left = Node(2) 
    root.right = Node(3) 
    root.left.left = Node(4) 
    root.left.right = Node(5) 
    root.right.left = Node(6) 
    root.right.right = Node(7) 

    def testEmpty(self):
        self.assertEqual(findLCA(2,4),2)

if __name__ == '__main__':
    unittest.main()