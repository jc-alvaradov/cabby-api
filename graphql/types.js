const typeDefs = `
  type Client {
    _id: String
    login: String!
    clientName: String!
    location: Location
    phone: String
    email: String
    password: String
    login: String
    payment: String!
    rating: Float
    photo: String
    active: String!
  }
  
  type Driver {
    _id: String
    login: String!
    driverName: String!
    location: Location!
    phone: String!
    email: String!
    password: String!
    earnings: String!
    payment: String!
    rating: Float!
    photo: String!
    active: String!
    carColor: String!
    carPlate: String!
    carSeatCount: Int!
    carModel: String!
    carPhoto: String!
  }

  type DriverPos {
    _id: String
    driverId: String!
    socketId: String!
    coordinate: DriverLocationPos!
  }

  type Ride {
    _id: String
    clientId: String!
    driverId: String!
    driverName: String!
    clientName: String!
    startLocation: Location!
    destination: Location!
    rideState: String! 
    cancelReason: String
    amount: String!
    rating: Float
  }

  type Rating {
    _id: String
    fromId: String
    toId: String
    message: String
    rating: String!
    date: String
  }

  input RatingInput {
    fromId: String!
    toId: String!
    message: String
    rating: String!
  }

  input LocationInput {
    lat: String!
    lng: String!
  }

  type Location {
    lat: String!
    lng: String!
  }

  input ClientInput {
    _id: String
    login: String!
    clientName: String!
    phone: String!
    photo: String!
    email: String!
    payment: String!
    rating: Float!
    active: String!
    location: LocationInput
    password: String
  }

  input DriverInput {
    _id: String
    login: String!
    driverName: String!
    location: LocationInput!
    phone: String!
    email: String!
    password: String!
    earnings: String!
    payment: String!
    rating: Float!
    photo: String!
    active: String!
    carColor: String!
    carPlate: String!
    carSeatCount: Int!
    carModel: String!
    carPhoto: String!
  }

  input DriverLocationInput {
    longitude: String!
    latitude: String!
  }

  input DriverLocationPosInput {
    type: String!
    coordinates: [Float]!
  }

  type DriverLocationPos {
    type: String!
    coordinates: [Float]!
  }

  input DriverPosInput {
    _id: String
    driverId: String!
    socketId: String!
    coordinate: DriverLocationPosInput!
  }

  input RideInput {
    _id: String
    clientId: String!
    driverId: String
    driverName: String
    clientName: String!
    startLocation: LocationInput!
    destination: LocationInput!
    rideState: String! 
    cancelReason: String
    amount: String!
    rating: Float
  }

  input RideEditInput {
    _id: String!
    driverName: String!
    clientName: String!
    startLocation: LocationInput!
    destination: LocationInput!
    rideState: String! 
    cancelReason: String
    amount: String!
    rating: Float
  }

  input DriverEditInput {
    _id: String!
    driverName: String!
    location: LocationInput!
    phone: String!
    payment: String!
    photo: String!
    active: String!
    carPlate: String!
    carModel: String!
    carPhoto: String!
  }

  input ClientEditInput {
    _id: String!
    clientName: String!
    location: LocationInput
    phone: String!
    payment: String!
    active: String!
  }

  type Query {
    getDriver(driverName: String!): [Driver]
    getDriverById(id: String!): Driver
    getDrivers(state: String!): [Driver]
    getDriverPos(id: String!): DriverPos
    getClosestDrivers(clientPos: DriverLocationInput!): [DriverPos]
    getRide(name: String!): [Ride]
    getRides(state: String!): [Ride]
    getClient(login: String!): Client
    getClients(state: String!): [Client]
    getClientRides(id: String!): [Ride]
    getRating(name: String!): [Rating]
    getRatings(filter: String!): [Rating]
    getClientRatings(id: String!): [Rating]
  }

  type Mutation {
    addClient(client: ClientInput!): Client
    addDriver(driver: DriverInput!): Boolean
    addActiveDriver(driverPos: DriverPosInput!) : Boolean
    addRide(ride: RideInput!): Boolean
    addRating(rating: RatingInput!): Boolean
    editClient(client: ClientEditInput!): Boolean
    editDriver(driver: DriverEditInput!): Boolean
    editRide(ride: RideEditInput!): Boolean
    editRating(rating: RatingInput!): Boolean
    deleteClient(id: String!): Boolean
    deleteDriver(id: String!): Boolean
    deleteActiveDriver(socketId: String!) : Boolean
    deleteRide(id: String!): Boolean
    deleteRating(id: String!): Boolean
  }
`;

module.exports = typeDefs;
