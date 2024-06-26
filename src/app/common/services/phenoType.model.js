// Phenotype model definition, used for entries in the phenotable

class PhenotypeModel {
    constructor(Parse) {
        this.Parse = Parse;
        this.data = {};
        this.collection = [];
        this.name = 'Phenotype';
        this.fields = [
          'nameChinese',
          'namePinyin',
          'originalRegion',
          'source',
          'gender',
          'dynasty',
          'emperor',
          'highestPosition'
        ];
    }
    // New method
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
    // Retrieve by ID
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
    // Retrieve all phenotypes
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

// Register the model
angular
.module('components')
.service('PhenotypeModel', PhenotypeModel);
