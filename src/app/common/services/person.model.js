
class PersonModel {
    constructor(Parse) {
        this.Parse = Parse;
        this.data = {};
        this.collection = [];
        this.name = 'Person';
        this.fields = [
            'desc',
            'image_link',
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
    getById(phenoId) {
        return new this.Parse.Query(this.New())
        .include('phenoId')
        .equalTo('phenoId', phenoId)
        .find()
        .then(results => {
            results.forEach(result => {
                this.Parse.defineAttributes(result, this.fields);
            });
            return Promise.resolve(results);
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
