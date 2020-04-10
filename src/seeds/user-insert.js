db.createUser({
    user: "user",
    pwd: "password",
    roles: [
      {
        role: "readWrite",
        db: "auth_fenoul"
      }
    ]
  });

db.users.insert({
_id: '001',
username: 'auth',
password: 'fenoul',
});