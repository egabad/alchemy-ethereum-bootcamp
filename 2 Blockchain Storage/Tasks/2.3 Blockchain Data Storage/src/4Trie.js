const TrieNode = require('./1TrieNode');

class Trie {
    constructor() {
        this.root = new TrieNode(null);
    }

    insert(word) {
        let node = this.root;
        for (let i in word) {
            if (!node.children[word[i]]) {
                node.children[word[i]] = new TrieNode(word[i]);
            }
            node = node.children[word[i]];

            if (i == word.length - 1) node.isWord = true;
        }
    }

    contains(word) {
        let node = this.root;
        for (let i in word) {
            if (!node.children[word[i]]) return false;
            node = node.children[word[i]];
        }

        return node.isWord;
    }
}

module.exports = Trie;