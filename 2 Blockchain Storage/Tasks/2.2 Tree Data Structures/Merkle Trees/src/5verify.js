function verifyProof(proof, node, root, concat) {
    let x = node;
    for (let p of proof) {
        if (p.left) {
            x = concat(p.data, x);
        } else {
            x = concat(x, p.data);
        }
    }
    return x === root;
}

module.exports = verifyProof;
