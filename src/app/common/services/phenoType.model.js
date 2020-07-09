class PhenotypeModel {    
    constructor(Parse) {        
        this.Parse = Parse;        
        this.data = {};        
        this.collection = [];        
        this.name = 'Phenotypes';        
        this.fields = [                       
            'position',            
            'name',            
            'highest_pos',            
            'region1',            
            'region2',
            'region3'        
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
    getById(id) {        
        return new this.Parse.Query(this.New())            
        .get(id)            
        .then(result => {                
            this.Parse.defineAttributes(result, this.fields);                
            this.data = result;                
            return Promise.resolve(result);            
        })            
        .catch(error => Promise.reject(error));    
    }    
    getAllPhenotypes() {        
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
.service('PhenotypeModel', PhenotypeModel);