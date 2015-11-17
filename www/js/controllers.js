angular.module('starter.controllers', [])

.controller('PouchCtrl', function($scope) {
  // PouchDB.debug.enable('*');
  var dbLogin = new PouchDB('http://162.243.234.60:5984/_myapp_provision', {skipSetup: true});
  var db = new PouchDB('pouch');                                // <--- this one uses any available adapter
  //var idb = new PouchDB('idbpouch', {adapter: 'idb'});          // <--- this one uses IndexedDB
  var websql = new PouchDB('websqlpouch', {adapter: 'websql'}); // <--- this one uses WebSQL
  
  $scope.pouchdbSupported = !!db.adapter;
  //$scope.idbSupported = !!idb.adapter;
  $scope.websqlSupported = !!websql.adapter;

  // db.info().then(console.log.bind(console));
  //db.sync(dbremote, {live: true, retry: true}).on('error', console.log.bind(console));

  dbLogin.signup('batman129', 'brucewayne', {
    metadata : {
      email : 'robin@boywonder.com',
      birthday : '1932-03-27T00:00:00.000Z',
      likes : ['acrobatics', 'short pants', 'sidekickin']
    }
  }, function (err, response) {
    if (err) {

      if (err.name === 'conflict') {
        console.log("conflict", err)
        // "batman" already exists, choose another username
      } else if (err.name === 'forbidden') {
        console.log("forbidden", err)
        // invalid username
      } else {

        console.log("SUCCESS USER CREATED", response, err)
        // HTTP error, cosmic rays, etc.
      }
    }
  });

  // dbLogin.login('batman12', 'brucewayne', function (err, response) {
  //   if (err) {
  //     if (err.name === 'unauthorized') {
  //       console.log("USER NOT LOGGED IND", err)
  //     } else {
  //       console.log("USER LOGGED IN", response)
  //     }
  //   }
  // });

  // dbLogin.getUser('batman12', function (err, response) {
  //   if (err) {
  //     if (err.name === 'not_found') {
  //       console.log("USER NOT found", err)
  //     } else {
  //        console.log("USER NOT found", err)
  //     }
  //   } else {
  //      console.log("USER found", response)
  //   }
  // });


  // dbLogin.getSession(function (err, response) {
  //   if (err) {
  //     // network error
  //     console.log("Error", err)
  //   } else if (!response.userCtx.name) {
  //     // nobody's logged in
  //      console.log("No one logged in", response)
  //   } else {
  //     // response.userCtx.name is the current user
  //     console.log("userlogged in", response)
  //   }
  // });

})

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('FriendsCtrl', function($scope, Friends) {
  $scope.friends = Friends.all();
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
