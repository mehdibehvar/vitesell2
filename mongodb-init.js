// Initialize replica set automatically
db.adminCommand({
  replSetInitiate: {
    _id: "rs0",
    members: [
      { _id: 0, host: "localhost:27017" }
    ]
  }
}).catch(err => {
  // Ignore error if already initialized
  if (err.code !== 23) {
    throw err;
  }
});

console.log("MongoDB replica set initialized");
