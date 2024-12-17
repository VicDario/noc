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
```pnpm start```

### Dev
1. Run ```pnpm install```
2. Clone file .env.example to .env
3. Fill the file with the proper variables
4. Run ```docker compose up -d``` to create the necessary services
5. Run ```pnpm run dev``` in terminal


## Testing
1. Run ```pnpm run docker:test``` to create the necessary services
2. Run ```pnpm run test``` in terminal
