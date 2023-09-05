# Contents
- [Contents](#contents)
- [1. Node](#1-node)
  - [Creating a Node](#creating-a-node)
  - [Your Goal: Complete Constructor](#your-goal-complete-constructor)
- [2. Tree](#2-tree)
  - [Storing the Root](#storing-the-root)
  - [Your Goal: Store the Root](#your-goal-store-the-root)
- [3. Add Root](#3-add-root)
  - [Adding a Root](#adding-a-root)
  - [Your Goal: Add Node Method](#your-goal-add-node-method)
- [4. First Layer](#4-first-layer)
  - [First Layer](#first-layer)
  - [Your Goal: Modify Add Node](#your-goal-modify-add-node)
- [5. Many Layers](#5-many-layers)
  - [Generalizing](#generalizing)
  - [Your Goal: Generalize](#your-goal-generalize)
- [6. Search](#6-search)
  - [Search Tree](#search-tree)
  - [Your Goal: hasNode Method](#your-goal-hasnode-method)

# 1. Node
## Creating a Node

Let's first create the class Node, from which we will create each element inside of our tree:

![Node](https://res.cloudinary.com/divzjiip8/image/upload/v1572548951/Frame_1_50_wiuxcn.png)

The node should contain `data`, which in this case is `5`. It should also contain references to the `left` child (`3`) and the `right` child (`7`).
## Your Goal: Complete Constructor

Complete the constructor function on the node. Store the `data` inside a `data` property on the instance.

Store `null` in properties `left` and `right`.

Usage Example:
```js
const node = new Node(5);

console.log(node.data); // 5
console.log(node.left); // null
console.log(node.right); // null
```

# 2. Tree
## Storing the Root

Now it's time to create our Tree!

A tree will keep track of one property: a reference to the `root` node.

![Root](https://res.cloudinary.com/divzjiip8/image/upload/v1572549482/Frame_1_51_x1l4si.png)
## Your Goal: Store the Root

Finish the constructor function on the `Tree` class in the new file `Tree.js`.

All you need to do for now is store `null` on a `root` property.
```js
const tree = new Tree();

console.log(tree.root); // null
```

# 3. Add Root
## Adding a Root

In this stage we'll create a new method for adding nodes to our tree. This is a difficult task to generalize so we'll attack it piece by piece!

First let's start by **adding a root** to an empty tree.

![Adding Root](https://res.cloudinary.com/divzjiip8/image/upload/v1572549735/Frame_1_52_gqn5ik.png)
## Your Goal: Add Node Method

Create a new method `addNode` on `Tree` which will take a new `node` and add it to the tree.

Assume that the tree is empty for this stage. Simply set the root to be the node passed into the method.
```js
// create a new tree and new node
const tree = new Tree();
const node = new Node(5);

// add the node to the tree using addNode
tree.addNode(node);

// the new node becomes the tree's root
console.log(tree.root.data); // 5
```

    In the next few stages we'll start to generalize this function, so it won't hurt to start thinking in that direction!

# 4. First Layer
## First Layer

Now it's time to focus on adding the first layer of nodes underneath our root!

    The bottom-most layer of a tree is referred to as the tree's leaves

Keep the code you used to pass the last stage and then add another case for when a root already exists:

![First Layer](https://res.cloudinary.com/divzjiip8/image/upload/v1572550307/Frame_1_53_vgill7.png)

When the root already exists, we'll need to decide which side to add the new leaf node to.

If the new node `data` is **less than** the root data, we'll want to add it to the **left**.

Conversely, if the data is **greater** we'll add it to the right.
## Your Goal: Modify Add Node

Modify the `addNode` function to **also** handle adding the first children of the `root`.
```js
const tree = new Tree();
const node1 = new Node(5);
const node2 = new Node(3);
const node3 = new Node(7);

tree.addNode(node1);
tree.addNode(node2);
tree.addNode(node3);

console.log(tree.root.left.data); // 3
console.log(tree.root.right.data); // 7
```
    Don't worry about generalizing this any further than the first left and right children just yet! We'll focus on that in the next stage.

# 5. Many Layers
## Generalizing

Now it's time to make our `addNode` function work for many layers of the tree:

![Many Layer](https://res.cloudinary.com/divzjiip8/image/upload/v1572550789/Frame_1_54_ec9o91.png)

    You can do this iteratively or recursively! For help on designing your solution, check out details.

## Your Goal: Generalize

Complete the function `addNode` so that it can handle adding nodes no matter how large the tree gets.

    Don't worry if you start to get frustrated! This is a tough stage. It may take you several tries to get it right.

# 6. Search
## Search Tree

It's time to reap the rewards of creating our binary search tree. That's right, it's time to **search**!

Let's use the sort order to find nodes in the tree. For instance, if we were searching for the node `4`:

![Search 4](https://res.cloudinary.com/divzjiip8/image/upload/v1572552613/Frame_1_57_k9ywj1.png)

1. We start at the root `5`, recognize that `4` is less than `5` so we move left.

2. We find `3`, recognize that `4` is greater than `3` so we move right.

3. We find `4`, recognize this is what we are looking for and return `true`.

If we search for a missing node, we return `false`.

For instance if we were looking for `7` on this tree:

![Missing Node](https://res.cloudinary.com/divzjiip8/image/upload/v1572552993/Frame_1_59_gara4d.png)

After recognizing that `7` is greater than `5`, we attempt to move right, but there is no `right` node! We return `false`.
## Your Goal: hasNode Method

Add a method `hasNode` that will take a `number` and search our tree to find a node that has that number inside it's `data` property.

If a node exists with the `number`, return `true`. If not return `false`.

For example:
```js
const tree = new Tree();
const node1 = new Node(4);

tree.addNode(node1);

console.log(tree.hasNode(4)); // true
console.log(tree.hasNode(7)); // false
```