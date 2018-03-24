# NeverGetLost

Pour récuperer la base de donnée vous devez vous placer avec un terminal dans le dossier server puis éxécuter:
	> bash getMongoDB.sh

Pour lancer la base de données se placer avec un terminal dans le dossier server puis éxécuter:
	> ./mongodb-linux-x86_64-3.6.3/bin/mongod -dbpath data/db/ --nojournal

Pour lancer le service Web se placer avec un terminal dans le dossier server puis éxécuter : 
	> npm install
	> node app.js
