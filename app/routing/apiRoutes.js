var friends = require('../data/friends.js');

module.exports = function (app) {
    app.get('/api/friends', function (req, res) {
        res.json(friends);
    });

    app.post('/api/friends', function (req, res) {

        var newFriend = req.body.scores;
        var scores = [];
        var bestMatch = 0;

        for (var i = 0; i < friends.length; i++) {
            var scoreDifference = 0;
            for (var j = 0; j < scores.length; j++) {
                scoreDifference += (Math.abs(parseInt(friends[i].scores[j]) - parseInt(newFriend[j])));
            }
            scores.push(scoreDifference);
        }

        for (var i = 0; i < scores.length; i++) {
            if (scores[i] <= scores[bestMatch]) {
                bestMatch = i;
            }
        }

        var bestie = friends[bestMatch];
        res.json(bestie);

        friends.push(req.body);

    });
}

