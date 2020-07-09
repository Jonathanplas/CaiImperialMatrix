// NOTE: This model isn't implemented within the release yet due to time constraints
//      As seen in our current release, we have a table which contains data on many different
//      persons and their phenotypes. We plan on being able to click a person which would
//      then display a person view, populated with both the person and its relevant phenotype data

//      The model is set up but we could not implement the view due to time constraints

class PersonModel {    
    constructor(Parse) {        
        this.Parse = Parse;        
        this.data = {};        
        this.collection = [];        
        this.name = 'Phenotypes';        
        this.fields = [                       
            'name',
            'pictureName',
            'phenoId'
        ];    
    }    
    New(obj) {        
        if (angular.isUndefined(obj)) {            
            const parseObject = new this.Parse.Object(this.name)            
            this.Parse.defineAttributes(parseObject, this.fields);            
            return parseObject;        
        } else {            
            this.Parse.defineAttributes(obj, this.fields);            
            return obj;        
        }    
    }    
    getByName(name) {        
        return new this.Parse.Query(this.New())            
        .get(name)            
        .then(result => {                
            this.Parse.defineAttributes(result, this.fields);                
            this.data = result;                
            return Promise.resolve(result);            
        })            
        .catch(error => Promise.reject(error));    
    }    
    getAllPersons() {        
        return new this.Parse.Query(this.New())                               
        .find(results => {                
            results.forEach(result =>          
                this.Parse.defineAttributes(result, this.fields) 
                 
                );                
            this.data = results;   
                         
            return Promise.resolve(results);            
            })            
            .catch(error => Promise.reject(error));    
        }
    }
angular    
.module('components')    
.service('PersonModel', PersonModel);