
# Near Dice

A small game where a user can create a room by putting Near tokens into it. A second user can then join the game and guess the dice result (1-6), if the guess is correct the total amount of tokens is transferred to the player, otherwise it is transferred to the creator.



[![asciicast]](https://www.loom.com/share/c59147126c5a4b9aa8956bae77739c2f)



# Cloning the project
After cloning the project please run 

    yarn
in order to install all of the necessary packages for the project to run correctly.

## Building and Deploying the contract
The contract is located in under the ***contract/assembly*** folders, after editing the contract you can run

    yarn build-contract
in order to build the contract and get the ***.wasm*** file , if you want to build and deploy the contract at the same time, you can run 

    yarn deploy-contract
This will create a test account and deploy the contract into it.

after the contract is deployed, it is necessary to run the following command in the terminal in order to be able to run the contract

***#This step is not needed if you are going to use the contract with the front-end***

    export CONTRACT=ACCOUNT_ID
where the **ACCOUNT_ID** will be returned after the contract deployment

## Running the contract

**Running contract in the terminal**
If you want to run the contract in the terminal you can either:

 1. Run the `yarn run-contract` which will run a bash file that allows the user to create a room, join said room and play a game.
 Before running this command, **{NEAR_ACCOUNT}** placeholders must be replaced with correct Near accounts (one for creating the games, and one for joining and playing the games)
 
 2. You can call the contract manually in the terminal , examples are show below in the functions section.
 
**Running contract in the front-end**
Check the front-end section for instructions

# Functions
## initGame 

 - Does not take any parameters.
 - Creator must attach a deposit > 0 in order to create a room
 - returns a **game id**

**Example call:**
`near call $CONTRACT initGame --amount 5 --account_id $NEAR_ACCOUNT`


## joinGame

 - Takes ***_gameId*** as a parameter
 - Player must attach a deposit > 0 in order to create a room
 - Returns a string confirming that the player has successfully joined the room

**Example call:**
`near call $CONTRACT joinGame '{"_gameId": '$GAMEID'}' --amount 3 --accountId $NEAR_ACCOUNT`

## playGame 

 - Takes ***_gameId*** and ***_guess*** as parameters
 - Guess must be between 1-6
 - The game's player and the person calling the function must be the same
 - A game has to be in the **JOINED** state in order to be played
 - returns the dice number as well as the winner's name
 
**Example call:**
`near call $CONTRACT playGame '{"_gameId":'$GAMEID' , "_guess":3 }' --accountId $NEAR_ACCOUNT`

## deleteGame 

 - Takes ***_gameId*** as  a parameters
 - The person calling this function must be the owner 
 - The game must be in the **FINISHED** in order to be deleted
 - returns a string confirming game deletion

 **Example call:**
`near call $CONTRACT deleteGame '{"_gameId":'$GAMEID' }' --accountId $NEAR_ACCOUNT`
 
## viewGame 
 - Takes ***_gameId*** as  a parameters
 - returns the game's details
 
 **Example call:**
`near call $CONTRACT viewGame '{"_gameId":'$GAMEID' }' --accountId $NEAR_ACCOUNT`
 
## viewAllGames 
 - Does not take anything as a parameter
 - returns an array of all games

**Example call:** 
`near view $CONTRACT viewGame --accountId $NEAR_ACCOUNT`
 - 
## reactivateGame 
 - Takes ***_gameId*** as  a parameters
 - The person calling this function must be the owner 
 - The game must be in the **FINISHED** in order to be reactivated
 - The creator must attach some tokens into the function
 - Returns a string confirming game reactivation

**Example call:**

`near call $CONTRACT reactivateGame '{"_gameId": '$GAMEID'}' --amount 3 --accountId $NEAR_ACCOUNT`


# Front-end
The front-end for this project was build using NextJS as a framework.

In order to run the front-end locally you have to run the command:

    yarn dev

 

## Linking front-end to the contract
The front-end is linked to the 	***dice.aimensh.testnet*** contract by default ,  if you want to connect your own contract with the front-end, you need to replace the **CONTRACT_ID** variable in the ***near/near-setup.js*** file with your own contract id.

    export  const  CONTRACT_ID = "CONTRACT_IDs";

