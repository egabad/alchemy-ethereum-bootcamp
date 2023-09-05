const TrieNode = require('./1TrieNode');

class Trie {
    constructor() {
        this.root = new TrieNode(null);
    }

    insert(word) {
        let node = this.root;
        for (let i in word) {
            node.children[word[i]] = new TrieNode(word[i]);
            node = node.children[word[i]];

            if (i == word.length - 1) node.isWord = true;
        }
    }
}

module.exports = Trie;