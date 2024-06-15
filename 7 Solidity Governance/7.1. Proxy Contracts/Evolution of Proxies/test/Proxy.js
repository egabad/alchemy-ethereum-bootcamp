const { loadFixture } = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { expect } = require("chai");

describe("Proxy", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployFixture() {
    const Proxy = await ethers.getContractFactory("Proxy");
    const proxy = await Proxy.deploy();

    const Logic1 = await ethers.getContractFactory("Logic1");
    const logic1 = await Logic1.deploy();

    const Logic2 = await ethers.getContractFactory("Logic2");
    const logic2 = await Logic2.deploy();

    // ethers.Interface(["function changeX() external"]);
    const proxyAsLogic1 = await ethers.getContractAt("Logic1", proxy.target);
    const proxyAsLogic2 = await ethers.getContractAt("Logic2", proxy.target);

    return { proxy, logic1, logic2, proxyAsLogic1, proxyAsLogic2 };
  }

  async function lookupUint(contractAddress, slot) {
    return parseInt(await ethers.provider.getStorage(contractAddress, slot));
  }

  it("should work with logic1", async function () {
    const { proxy, proxyAsLogic1, logic1 } = await loadFixture(deployFixture);

    await proxy.changeImplementation(logic1.target);
    // expect(await logic1.x()).to.equal(0);
    expect(await lookupUint(proxy.target, "0x0")).to.equal(0);

    await proxyAsLogic1.changeX(52);
    expect(await lookupUint(proxy.target, "0x0")).to.equal(52);
  });

  it("should work with upgrades", async function () {
    const { proxy, logic1, logic2, proxyAsLogic1, proxyAsLogic2 } = await loadFixture(deployFixture);

    // start at logic1
    await proxy.changeImplementation(logic1.target);
    expect(await lookupUint(proxy.target, "0x0")).to.equal(0);

    await proxyAsLogic1.changeX(45);
    expect(await lookupUint(proxy.target, "0x0")).to.equal(45);

    // upgrade to logic2
    await proxy.changeImplementation(logic2.target);
    expect(await lookupUint(proxy.target, "0x0")).to.equal(45);

    await proxyAsLogic2.changeX(79);
    expect(await lookupUint(proxy.target, "0x0")).to.equal(79);

    await proxyAsLogic2.tripleX();
    expect(await lookupUint(proxy.target, "0x0")).to.equal(79*3);
  });
});
