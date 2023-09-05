const TrieNode = require('./1TrieNode');

class Trie {
    constructor() {
        this.root = new TrieNode(null);
    }
}

module.exports = Trie;