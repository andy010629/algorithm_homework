/** @format */
class Node {
    constructor(data) {
        this.data = data
        this.left = null
        this.right = null
    }
}

class BST {
    constructor() {
        this.root = null
    }

    insert(data) {
        const newNode = new Node(data)
        if (!this.root) {
            this.root = newNode
        } else {
            this.insertNode(this.root, newNode)
        }
    }

    insertNode(node, newNode) {
        if (newNode.data < node.data) {
            if (!node.left) {
                node.left = newNode
            } else {
                this.insertNode(node.left, newNode)
            }
        } else {
            if (!node.right) {
                node.right = newNode
            } else {
                this.insertNode(node.right, newNode)
            }
        }
    }

    insertIteratively(data) {
        const newNode = new Node(data)
        if (!this.root) {
            this.root = newNode
            return
        }
        let currentNode = this.root
        while (currentNode) {
            if (newNode.data < currentNode.data) {
                if (!currentNode.left) {
                    currentNode.left = newNode
                    break
                }
                currentNode = currentNode.left
            } else {
                if (!currentNode.right) {
                    currentNode.right = newNode
                    break
                }
                currentNode = currentNode.right
            }
        }
    }

    search(node, target) {
        if (!node) return false
        if (target < node.data) {
            return this.search(node.left, target)
        } else if (target > node.data) {
            return this.search(node.right, target)
        }
        return true
    }

    searchIteratively(target) {
        let currentNode = this.root
        while (currentNode) {
            if (target < currentNode.data) {
                currentNode = currentNode.left
            } else if (target > currentNode.data) {
                currentNode = currentNode.right
            } else {
                return true
            }
        }
        return false
    }

    delete(node, target) {
        if (!node) return null
            // console.log(node)
        if (node.left === null && node.right === null && node.data == target) {
            // this.root = null
            return null
        }


        if (target < node.data) {
            node.left = this.delete(node.left, target)
            return node
        } else if (target > node.data) {
            node.right = this.delete(node.right, target)
            return node
        }

        if (!node.left && !node.right) return null

        if (!node.left) return node.right
        if (!node.right) return node.left

        let rightSmallest = node.right
        while (rightSmallest.left) {
            rightSmallest = rightSmallest.left
        }
        node.data = rightSmallest.data
        node.right = this.delete(node.right, rightSmallest.data)
        return node
    }

    recInOrderTraversal(node, result) {
        if (node) {
            this.recInOrderTraversal(node.left, result)
            result.push(node.data)
            this.recInOrderTraversal(node.right, result)
        }
    }

    recPreOrderTraversal(node, result) {
        if (node) {
            result.push(node.data)
            this.recPreOrderTraversal(node.left, result)
            this.recPreOrderTraversal(node.right, result)
        }
    }

    recPostOrderTraversal(node, result) {
        if (node) {
            this.recPostOrderTraversal(node.left, result)
            this.recPostOrderTraversal(node.right, result)
            result.push(node.data)
        }
    }

    preOrderTraversal(root) {
        const stack = [];
        let res = [];
        let node = root;

        while (node || stack.length) {
            if (node) {
                res.push(node.data); // 输出节点值
                stack.push(node);
                node = node.left;
            } else {
                node = stack.pop();
                node = node.right;
            }
        }
        return res;
    }

    inOrderTraversal(root) {
        const stack = [];
        let res = [];
        let node = root;

        while (node || stack.length) {
            if (node) {
                stack.push(node);
                node = node.left;
            } else {
                node = stack.pop();
                res.push(node.data);
                node = node.right;
            }
        }
        return res;
    }

    postOrderTraversal(root) {
        const stack = [];
        let res = [];
        let node = root;
        let lastVisited = null;

        while (node || stack.length) {
            if (node) {
                stack.push(node);
                node = node.left;
            } else {
                const peekNode = stack[stack.length - 1];
                if (peekNode.right && lastVisited !== peekNode.right) {
                    node = peekNode.right;
                } else {
                    res.push(peekNode.data);
                    lastVisited = stack.pop();
                }
            }
        }
        return res;
    }
    levelOrderTraversal(root) {
        const queue = [root];
        let res = [];
        while (queue.length) {
            const node = queue.shift();
            res.push(node.data);

            if (node.left) {
                queue.push(node.left);
            }
            if (node.right) {
                queue.push(node.right);
            }
        }
        return res;
    }
    buildTreeFromPreorderInorder(preorder, inorder) {
        if (!preorder.length || !inorder.length) {
            return null;
        }
        const rootValue = preorder[0];
        const rootNode = new Node(rootValue);
        console.log(rootValue)

        const rootIndexInInorder = inorder.indexOf(rootValue);
        const leftInorder = inorder.slice(0, rootIndexInInorder);
        const rightInorder = inorder.slice(rootIndexInInorder + 1);

        const leftPreorder = preorder.slice(1, 1 + leftInorder.length);
        const rightPreorder = preorder.slice(1 + leftInorder.length);

        rootNode.left = this.buildTreeFromPreorderInorder(leftPreorder, leftInorder);
        rootNode.right = this.buildTreeFromPreorderInorder(rightPreorder, rightInorder);
        return rootNode;
    }
    buildTreeFromInorderPostorder(inorder, postorder) {
        if (!inorder.length || !postorder.length) {
            return null;
        }

        const rootValue = postorder[postorder.length - 1];
        const rootNode = new Node(rootValue);

        const rootIndexInInorder = inorder.indexOf(rootValue);
        const leftInorder = inorder.slice(0, rootIndexInInorder);
        const rightInorder = inorder.slice(rootIndexInInorder + 1);

        const leftPostorder = postorder.slice(0, leftInorder.length);
        const rightPostorder = postorder.slice(leftInorder.length, postorder.length - 1);

        rootNode.left = this.buildTreeFromInorderPostorder(leftInorder, leftPostorder);
        rootNode.right = this.buildTreeFromInorderPostorder(rightInorder, rightPostorder);

        return rootNode;
    }
    buildTreeFromInorderLevelorder(inorder, levelorder) {
        if (!inorder.length || !levelorder.length) {
            return null;
        }

        const rootValue = levelorder.find((value) => inorder.includes(value));
        const rootNode = new Node(rootValue);

        const rootIndexInInorder = inorder.indexOf(rootValue);
        const leftInorder = inorder.slice(0, rootIndexInInorder);
        const rightInorder = inorder.slice(rootIndexInInorder + 1);

        const leftLevelorder = levelorder.filter((value) => leftInorder.includes(value));
        const rightLevelorder = levelorder.filter((value) => rightInorder.includes(value));

        rootNode.left = this.buildTreeFromInorderLevelorder(leftInorder, leftLevelorder);
        rootNode.right = this.buildTreeFromInorderLevelorder(rightInorder, rightLevelorder);

        return rootNode;
    }
}