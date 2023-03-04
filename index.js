/** @format */

class BST {
    constructor() {
        this.root = null
    }

    // 遞迴插入一個數字
    _insertNode(node, data) {
        if (node === null) {
            node = new Node(data)
        } else if (data < node.data) {
            node.left = this._insertNode(node.left, data)
        } else if (data > node.data) {
            node.right = this._insertNode(node.right, data)
        }
        return node
    }

    insert(data) {
        this.root = this._insertNode(this.root, data)
    }

    // 遞迴查詢一個數字是否存在
    _searchNode(node, data) {
        if (node === null) {
            return false
        } else if (data < node.data) {
            return this._searchNode(node.left, data)
        } else if (data > node.data) {
            return this._searchNode(node.right, data)
        } else {
            return true
        }
    }

    search(data) {
        return this._searchNode(this.root, data)
    }

    // 遞迴插入 k 個隨機數字
    insertRandomNumbers(k, range) {
        for (let i = 0; i < k; i++) {
            let randomNumber = Math.floor(Math.random() * range)
            this.insert(randomNumber)
        }
    }

    // 遞迴中序走訪，回傳結果為排序後的數列
    _inorderTraversal(node) {
        let result = []
        if (node !== null) {
            result = result.concat(this._inorderTraversal(node.left))
            result.push(node.data)
            result = result.concat(this._inorderTraversal(node.right))
        }
        return result
    }

    inorderTraversal() {
        return this._inorderTraversal(this.root)
    }

    // 遞迴前序走訪
    _preorderTraversal(node) {
        let result = []
        if (node !== null) {
            result.push(node.data)
            result = result.concat(this._preorderTraversal(node.left))
            result = result.concat(this._preorderTraversal(node.right))
        }
        return result
    }
    preorderTraversal() {
        return this._preorderTraversal(this.root)
    }

    // 遞迴後序走訪
    _postorderTraversal(node) {
        let result = []
        if (node !== null) {
            result = result.concat(this._postorderTraversal(node.left))
            result = result.concat(this._postorderTraversal(node.right))
            result.push(node.data)
        }
        return result
    }

    postorderTraversal() {
        return this._postorderTraversal(this.root)
    }
}

// 定義節點類別
class Node {
    constructor(data) {
        this.data = data
        this.left = null
        this.right = null
    }
}


new Vue({
    el: '#app',
    data: {
        bst: new BST(),
        newNodeValue: null,
        targetValue: null,
        nodeCount: null,
        nodeRangeStart: null,
        nodeRangeEnd: null,
    },
    computed: {
        inorderTraversalResult() {
            return this.bst.inorderTraversal()
        },
        preorderTraversalResult() {
            return this.bst.preorderTraversal()
        },
        postorderTraversalResult() {
            return this.bst.postorderTraversal()
        },
    },
    methods: {
        insertNode() {
            const nodeValue = parseInt(this.newNodeValue)
            if (!isNaN(nodeValue)) {
                this.bst.insert(nodeValue)
                this.newNodeValue = null
            }
        },
        searchNode() {
            const targetValue = parseInt(this.targetValue)
            if (!isNaN(targetValue)) {
                const isFound = this.bst.search(targetValue)
                alert(`節點 ${targetValue} ${isFound ? '存在' : '不存在'}!`)
                this.targetValue = null
            }
        },
        insertMultipleNodes() {
            const nodeCount = parseInt(this.nodeCount)
            const nodeRangeStart = parseInt(this.nodeRangeStart)
            const nodeRangeEnd = parseInt(this.nodeRangeEnd)

            if (!isNaN(nodeCount) &&
                !isNaN(nodeRangeStart) &&
                !isNaN(nodeRangeEnd)
            ) {
                let numbers = []
                while (numbers.length < nodeCount) {
                    let nodeValue =
                        Math.floor(
                            Math.random() * (nodeRangeEnd - nodeRangeStart + 1)
                        ) + nodeRangeStart

                    if (!numbers.includes(nodeValue)) {
                        numbers.push(nodeValue)
                        this.bst.insert(nodeValue)
                    }
                }
                this.nodeRangeStart = null
                this.nodeRangeEnd = null
                this.nodeCount = null
            }

        },
        deleteNode() {
            this.bst = new BST()
        },
    },
})