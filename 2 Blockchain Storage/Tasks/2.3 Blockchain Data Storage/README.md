# Content
- [Content](#content)
- [1. Constructors](#1-constructors)
  - [Trie \& Trie Node](#trie--trie-node)
  - [Your Goal: Constructors](#your-goal-constructors)
- [2. Insert](#2-insert)
  - [Simple Trie Insert](#simple-trie-insert)
  - [Your Goal: Link the Nodes](#your-goal-link-the-nodes)
- [3. Insert Branching](#3-insert-branching)
  - [Branching](#branching)
  - [Your Goal: Implement Branching](#your-goal-implement-branching)
- [4. Contains](#4-contains)
  - [Does it Contain the Word?](#does-it-contain-the-word)
  - [Your Goal: Implement Contains](#your-goal-implement-contains)

# 1. Constructors
## Trie & Trie Node

We're going to create two data structures for the first stage. The **Trie** and **TrieNode**.

The Trie will represent the entire data structure, while the **TrieNode** will represent each letter in the structure.

Let's see this in a simple example:

![simple example](https://res.cloudinary.com/divzjiip8/image/upload/v1591583930/Frame_2_5_ndafsc.png)

This single trie data structure has **four nodes**. It has a root node, which points to a node with the key `h`, which points to a node with the key `e`, which points to a node with the key `y`.
## Your Goal: Constructors

Implement the `constructor` function for both the `Trie` and `TrieNode` class.

For each `TrieNode` instance, add **three properties**:

1. `key` - This will be passed to the node, it is the letter stored as a string
2. `children` - This will be an object, containing the children elements, by default set it to an empty object
3. is`Word - This will be a boolean, whether or not the node finishes a word, set it to `false` by default.

For each `Trie` instance, add a **single property**:

1. `root` - This will be an instance of `TrieNode` that contains a `null` key. The `null` key will indicate that this is the top parent in the list.

    Be sure to store these properties on this so they are accessible for every instance of the class.

# 2. Insert
## Simple Trie Insert

Let's focus on that example from the previous stage:

![simple example](https://res.cloudinary.com/divzjiip8/image/upload/v1591583930/Frame_2_5_ndafsc.png)

To create this trie, we would simply do this:
```js
trie = new Trie();
trie.insert('HEY');
```
In fact, if you look at the test cases, that's exactly what it does!

Let's see the data we're expecting in our nodes:

![Data Expected](https://res.cloudinary.com/divzjiip8/image/upload/v1611852494/Frame_5_19_mkeetb.png)

Here, the box inside the JSON indicates a reference to the other node.

The root node stores a reference to the `H` node in its `H` key of its `children` property.

The first node stores a reference to the `E` node in its `E` key of its `children` property.

    Notice that only the last node Y has set the isWord to true! This property should indicate if the node is the end of a word.

## Your Goal: Link the Nodes

Add a new function called `insert` on the `Trie` class.

This function will take a string word like `"hey"`. Split this word up by character and create nodes for each character.

Link the nodes `children` property as indicated in the above image.

    Be sure to also update the properties isWord property.

# 3. Insert Branching
## Branching

An important aspect of the trie is its ability to branch and have **many children**. Let's take a look at a larger example:

![Larger Example](https://res.cloudinary.com/divzjiip8/image/upload/v1591585649/Frame_4_2_jmpu1a.png)

In this example, both the letter `E` and the first `L` will have **two children**.

The data for the `E` would be:
```js
{
    key: "E",
    isWord: false,
    children: {
        'L': lNode,
        'R': rNode,
    }
}
```

Here the `hNode`, `lNode`, and `rNode` are object references to those particular nodes.

    In the above example, there are three nodes that should have isWord set to true. They are D, O and T.

## Your Goal: Implement Branching

Add branching to the `insert` function. When a second child comes up, be sure to add it as well.

    Depending on how you implemented your logic on the previous stage, you may already be passing the test cases!

# 4. Contains
## Does it Contain the Word?

With the **trie** we should be able to quickly figure out if the data structure contains a word we are looking for.

For example, if we were to add a few words:
```js
const trie = new Trie();
trie.insert('happy');
trie.insert('healthy');
```
We should be able to check for those words:
```js
console.log( trie.contains('happy') ); // true
console.log( trie.contains('healthy') ); // true
```
Without it picking up on words that aren't contained:
```js
console.log( trie.contains('whimsical') ); // false
console.log( trie.contains('health') ); // false
```
Because these words are not in the trie, it should return false.

    Notice that second example is a bit tricky! The word "healthy" is in the trie, while the word "health" is not.

## Your Goal: Implement Contains

Add a function `contains` to the `Trie` class.

This function should take a string `word` and return `true`/`false` depending on whether the word is in our trie or not.