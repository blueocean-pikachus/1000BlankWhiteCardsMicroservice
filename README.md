# 1000BlankWhiteCardsMicroservice

### Overview
This is a socketed server used to keep track of up to 4 players in the game and the cards that they are playing.

### DB Schema

![image](https://user-images.githubusercontent.com/68455115/159383553-54edd07d-f8ee-4db0-b73b-79ed39763e05.png)

### How to use
First off make sure to 'npm install socket.io-client' and 'import io from 'socket.io-client';' in your react app then connect to the socket using:

![image](https://user-images.githubusercontent.com/68455115/159384781-6a21128d-26bf-43c6-bc30-59289b3c50b3.png)

### NOTE
TRY TO USE ADD's INSTEAD OF GET's SINCE ADD's ALSO SEND AN UPDATED LIST ALREADY. WHENEVER YOU EMIT, YOU ARE ALSO SENDING THE RESULT OF THAT EMIT TO OTHER SOCKETS THAT ARE CONNECTED SO THEY'LL ALSO UPDATE AUTOMATICALLY.

#### Get Players
![image](https://user-images.githubusercontent.com/68455115/159384274-618e05f0-46b3-44e4-aa0a-77bda5497ce8.png)

This sends a signal to the server to send back a list of players with player names and socket id. You can catch this response by using:

![image](https://user-images.githubusercontent.com/68455115/159384530-bfcc2fe8-718b-4681-a78d-ca77ab1ba3d9.png)

#### Add Players
![image](https://user-images.githubusercontent.com/68455115/159384832-ea1bd1d3-b677-4fe4-80e4-9a3f596f9a94.png)

This adds a player to the db if there is less than 4 entries in the db. It emits 2 options, one where it does get put into the db which it emits the updated list of players: 

![image](https://user-images.githubusercontent.com/68455115/159384981-a6c6fe19-30e1-4e09-8f47-d1163b1faeda.png)

Another where the lobby is full: 

![image](https://user-images.githubusercontent.com/68455115/159385041-fc599f9a-3741-4a5f-8844-8fa7e3ad510f.png)

#### Get Cards
![image](https://user-images.githubusercontent.com/68455115/159385159-41147720-2e79-4e63-a3cd-3f3ab0b960dc.png)

This gets the list of cards with their picture urls and positions in the db. Use this to catch:

![image](https://user-images.githubusercontent.com/68455115/159385330-c0019552-500e-4c49-ad6c-effd299d73a4.png)

#### Add Cards
![image](https://user-images.githubusercontent.com/68455115/159385547-5ec6b0a3-6e7a-488e-ac6d-db2b5e0704c5.png)

Use this to add as many cards to the db as you want in an array of picture urls. This also emits the updated list of cards to all socketed connections:

![image](https://user-images.githubusercontent.com/68455115/159385687-81782054-7146-44d1-b9ce-ca83ec39fd78.png)

#### Move Card
![image](https://user-images.githubusercontent.com/68455115/159385889-743fab63-1faf-47e2-95bf-701bf817843e.png)

update a card to be in a different position, also emits an updated card list:

![image](https://user-images.githubusercontent.com/68455115/159385687-81782054-7146-44d1-b9ce-ca83ec39fd78.png)

#### Ending the Game
![image](https://user-images.githubusercontent.com/68455115/159386057-cfb4777c-181a-45ca-a99c-fd50ce09e2ee.png)

This deletes all entries from both tables and disconnects all users from the socket server. This emits a disconnect you can use:

![image](https://user-images.githubusercontent.com/68455115/159386135-b6f697e6-1990-4bc2-9ccd-63a379184951.png)
