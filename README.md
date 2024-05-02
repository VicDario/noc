# NOC - Network Operations Center

This project was created to learn about good practices and clean architecture

## Clean Architecture

### File system

The project is divided into the following folders:

- **domain**:
  This is where the business rules and core domain logic reside. Classes and interfaces in this layer should be independent of any frameworks or tools.

- **infrastructure**:
  This layer contains implementations of the interfaces defined in the domain layer. It deals with external concerns such as databases, third-party integrations, or any I/O operations. Ideally, the domain layer should not depend on details of this layer.

- **presentation**:
  This layer handles user interface and interaction. It could be a web interface, command-line interface, or any other means through which users interact with the application. The presentation layer should depend on the domain layer but not vice versa.

## Run

### Dev
1. Clone file .env.example to .env
2. Fill the file with the proper variables
3. Run ``npm run dev`` in terminal