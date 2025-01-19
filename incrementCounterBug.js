function incrementCounter(userId) {
  // Get a reference to the counter document
  const counterRef = db.collection('counters').doc(userId);

  // Atomically increment the counter using a transaction
  return db.runTransaction(transaction => {
    return transaction.get(counterRef)
      .then(doc => {
        // Get the current counter value (or 0 if it doesn't exist)
        let newCount = (doc.exists ? doc.data().count : 0) + 1;

        // Update the counter document
        transaction.update(counterRef, {
          count: newCount
        });

        return newCount;
      });
  });
}