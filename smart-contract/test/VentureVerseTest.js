const { ethers } = require('hardhat');
const { expect } = require('chai');

describe('VentureVerse', function () {
  let VentureVerse;
  let ventureVerse;
  let owner, testCompanyOwner, addr1;
  let testTitle = 'Test Company';
  let testDesc = 'A test company description';
  let testEnd;
  let testNeedDonate = ethers.utils.parseEther('10');

  beforeEach(async function () {
    VentureVerse = await ethers.getContractFactory('VentureVerse');
    [owner, testCompanyOwner, addr1] = await ethers.getSigners();
    ventureVerse = await VentureVerse.deploy();
    await ventureVerse.deployed();

    testEnd = (await ethers.provider.getBlock('latest')).timestamp + 604800; // Adding 1 week to the current block timestamp
  });

  describe('Initial state', function () {
    it('Should have an initial company index of zero', async function () {
      expect(await ventureVerse.indexCompany()).to.equal(0);
    });
  });

  describe('Create company', function () {
    it('Should create a new company', async function () {
      const createCompanyTx = await ventureVerse
        .connect(testCompanyOwner)
        .createCompany(testCompanyOwner.address, testTitle, testDesc, testEnd, testNeedDonate, {
          value: ethers.utils.parseEther('0.01'),
        });
      await createCompanyTx.wait();

      const company = await ventureVerse.companies(0);

      expect(company.companyOwner).to.equal(testCompanyOwner.address);
      expect(company.title).to.equal(testTitle);
      expect(company.desc).to.equal(testDesc);
      expect(company.end).to.equal(testEnd);
      expect(company.needDonate).to.equal(testNeedDonate);
      expect(company.index).to.equal(0);
    });
  });

  describe('Make donation', function () {
    beforeEach(async function () {
      const createCompanyTx = await ventureVerse
        .connect(testCompanyOwner)
        .createCompany(testCompanyOwner.address, testTitle, testDesc, testEnd, testNeedDonate, {
          value: ethers.utils.parseEther('0.01'),
        });
      await createCompanyTx.wait();
    });

    it('Should make a donation', async function () {
      const donationAmount = ethers.utils.parseEther('1');
      const makeDonationTx = await ventureVerse
        .connect(addr1)
        .makeDonation(0, { value: donationAmount });
      await makeDonationTx.wait();

      const newDonate = await ventureVerse.getDonate(0, addr1.address);
      expect(newDonate).to.equal(donationAmount);
    });
  });

  describe('Get money', function () {
    beforeEach(async function () {
      const createCompanyTx = await ventureVerse
        .connect(testCompanyOwner)
        .createCompany(testCompanyOwner.address, testTitle, testDesc, testEnd, testNeedDonate, {
          value: ethers.utils.parseEther('0.01'),
        });
      await createCompanyTx.wait();
    });

    it('Should allow the owner to get the money', async function () {
      const initialBalance = await owner.getBalance();

      await ventureVerse.connect(owner).getMoney(); // Call getMoney as the contract owner

      const newBalance = await owner.getBalance();
      expect(newBalance.gt(initialBalance)).to.equal(true);
    });
  });

  describe('Access control and failure cases', function () {
    beforeEach(async function () {
      const createCompanyTx = await ventureVerse
        .connect(testCompanyOwner)
        .createCompany(testCompanyOwner.address, testTitle, testDesc, testEnd, testNeedDonate, {
          value: ethers.utils.parseEther('0.01'),
        });
      await createCompanyTx.wait();
    });
  });

  it('Should revert when trying to create a company with incorrect BNB amount', async function () {
    await expect(
      ventureVerse
        .connect(testCompanyOwner)
        .createCompany(testCompanyOwner.address, testTitle, testDesc, testEnd, testNeedDonate, {
          value: ethers.utils.parseEther('0.02'),
        }),
    ).to.be.revertedWith('0.01 BNB only');
  });

  it('Should revert when trying to create a company with a deadline in the past', async function () {
    const pastEnd = (await ethers.provider.getBlock('latest')).timestamp - 1000;
    await expect(
      ventureVerse
        .connect(testCompanyOwner)
        .createCompany(testCompanyOwner.address, testTitle, testDesc, pastEnd, testNeedDonate, {
          value: ethers.utils.parseEther('0.01'),
        }),
    ).to.be.revertedWith('deadline in past');
  });

  it('Should revert when trying to make a donation of zero', async function () {
    await expect(ventureVerse.connect(addr1).makeDonation(0, { value: 0 })).to.be.revertedWith(
      'donate is zero',
    );
  });

  it('Should revert when trying to make a donation after the end date', async function () {
    // Advance the time
    await ethers.provider.send('evm_increaseTime', [604800]); // Advance the time by 1 week
    await ethers.provider.send('evm_mine');

    await expect(
      ventureVerse.connect(addr1).makeDonation(0, { value: ethers.utils.parseEther('1') }),
    ).to.be.revertedWith('end');
  });

  it('Should revert when a non-owner tries to get the money', async function () {
    await expect(ventureVerse.connect(addr1).getMoney()).to.be.revertedWith(
      'Ownable: caller is not the owner',
    );
  });

  it('Should revert when trying to get money with no balance to withdraw', async function () {
    // Create a new VentureVerse contract with no deposits
    const newVentureVerse = await VentureVerse.deploy();
    await newVentureVerse.deployed();

    await expect(newVentureVerse.getMoney()).to.be.revertedWith('No balance to withdraw');
  });
});
