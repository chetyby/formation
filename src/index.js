import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';



ReactDOM.render(<App/>, document.getElementById('root'));
/*
class Former{
    constructor(aFirstName, aLastName, anEmail, aPassword, aPhone, aSpecialization, acv){
        this.firstName = aFirstName,
        this.lastName = aLastName,
        this.email = anEmail,
        this.password = aPassword,
        this.phone = aPhone,
        this.specialization = aSpecialization,
        this.cv = acv       
    }

    convertToMap(){
        let item = {
            firstName : this.firstName,
            lastName : this.lastName,
            email : this.email,
            password : this.password,
            phone : this.phone,
            specialization : this.specialization,
            cv : this.cv
        
        };
        return item;
    }

    register(){
        
        var admin = require("firebase-admin");
       
        var serviceAccount = require("./projet-react-421bd.json");
       
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
        });

        
        let dataBase = admin.firestore();
      
        let collection = dataBase.collection('former');
        
        let newFormer = {
            firstName : this.firstName,
            lastName : this.lastName,
            email : this.email,
            password : this.password,
            phone : this.phone,
            specialization : this.specialization,
            cv : this.cv
        };
        
        collection.add(newFormer);
    }

}






let former = new Former("Alex", "ABCD", "abcd@gmail.com", "azertyy", "+2126+5479547", "IA", "https://test.com");
console.log(former.convertToMap());
former.register();*/