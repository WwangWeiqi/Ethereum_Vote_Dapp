module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // for more about customizing your Truffle configuration!
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*", // Match any network id
      from:'0x14C3661Aa4c10ED39024eEDd18c247fF00C952b1'
    }
  }
};
