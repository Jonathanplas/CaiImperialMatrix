# person.model.js

## Overview
The `person.model.js` file contains the definition of the `PersonModel` class, which serves as the model for interacting with Person objects in the application.

## Class: PersonModel
- **Constructor:** Initializes the `PersonModel` with necessary dependencies and properties.
  - `Parse`: The Parse object used for data interaction.
  - `data`: Holds the retrieved data.
  - `collection`: Collection of Person objects.
  - `name`: Name of the model.
  - `fields`: Array containing field names of Person objects.

### Methods
1. **New(obj):**
   - Creates a new Person object.
   - Parameters:
     - `obj` (optional): Existing object to modify.
   - Returns:
     - Newly created or modified Person object.

2. **getById(phenoId):**
   - Retrieves a Person object by its phenoId.
   - Parameters:
     - `phenoId`: Identifier of the Person object.
   - Returns:
     - Promise resolving to the retrieved Person object.

3. **getAllPersons():**
   - Retrieves all Person objects.
   - Returns:
     - Promise resolving to an array of all Person objects.

## Usage
The `PersonModel` class is used to interact with Person objects in the application.

---

# phenoType.model.js

## Overview
The `phenoType.model.js` file contains the definition of the `PhenotypeModel` class, which serves as the model for interacting with Phenotype objects in the application.

## Class: PhenotypeModel
- **Constructor:** Initializes the `PhenotypeModel` with necessary dependencies and properties.
  - `Parse`: The Parse object used for data interaction.
  - `data`: Holds the retrieved data.
  - `collection`: Collection of Phenotype objects.
  - `name`: Name of the model.
  - `fields`: Array containing field names of Phenotype objects.

### Methods
1. **New(obj):**
   - Creates a new Phenotype object.
   - Parameters:
     - `obj` (optional): Existing object to modify.
   - Returns:
     - Newly created or modified Phenotype object.

2. **getById(id):**
   - Retrieves a Phenotype object by its ID.
   - Parameters:
     - `id`: Identifier of the Phenotype object.
   - Returns:
     - Promise resolving to the retrieved Phenotype object.

3. **getAllPhenotypes():**
   - Retrieves all Phenotype objects.
   - Returns:
     - Promise resolving to an array of all Phenotype objects.

## Usage
The `PhenotypeModel` class is used to interact with Phenotype objects in the application.
