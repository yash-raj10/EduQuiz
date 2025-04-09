// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract QuizLeaderboard {
    // Struct to hold player data
    struct PlayerScore {
        address playerAddress;
        uint256 score;
        uint256 timestamp;
    }

    // Array to hold all scores
    PlayerScore[] public leaderboard;

    // Event to be emitted when a player adds their score
    event ScoreAdded(address indexed player, uint256 score, uint256 timestamp);

    // Function to add a player's score
    function addScore(uint256 _score, address _player) public {
        // Add the player's score to the leaderboard
        leaderboard.push(PlayerScore({
            playerAddress: _player,
            score: _score,
            timestamp: block.timestamp
        }));

        // Emit the event
        emit ScoreAdded(_player, _score, block.timestamp);
    }

    // Function to retrieve the leaderboard data in ascending order of scores
    function getLeaderboard() public view returns (PlayerScore[] memory) {
        // Create a temporary array to hold the leaderboard
        PlayerScore[] memory sortedLeaderboard = leaderboard;

        // Sort the array by score in ascending order
        for (uint256 i = 0; i < sortedLeaderboard.length; i++) {
            for (uint256 j = i + 1; j < sortedLeaderboard.length; j++) {
                if (sortedLeaderboard[i].score < sortedLeaderboard[j].score) {
                    // Swap the elements
                    PlayerScore memory temp = sortedLeaderboard[i];
                    sortedLeaderboard[i] = sortedLeaderboard[j];
                    sortedLeaderboard[j] = temp;
                }
            }
        }

        // Return the sorted leaderboard
        return sortedLeaderboard;
    }
    
    // Function to retrieve the leaderboard data with player addresses and scores
    function getLeaderboardWithScores() public view returns (PlayerScore[] memory) {
        // Return the leaderboard array
        return leaderboard;
    }
}