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

    inOrderTraversal(node, result) {
        if (node) {
            this.inOrderTraversal(node.left, result)
            result.push(node.data)
            this.inOrderTraversal(node.right, result)
        }
    }

    preOrderTraversal(node, result) {
        if (node) {
            result.push(node.data)
            this.preOrderTraversal(node.left, result)
            this.preOrderTraversal(node.right, result)
        }
    }

    postOrderTraversal(node, result) {
        if (node) {
            this.postOrderTraversal(node.left, result)
            this.postOrderTraversal(node.right, result)
            result.push(node.data)
        }
    }
}