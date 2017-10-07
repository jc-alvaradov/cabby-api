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
    allRatings: [Float]
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
    allRatings: [Float]!
    photo: String!
    active: String!
    carColor: String!
    carPlate: String!
    carSeatCount: Int!
    carModel: String!
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
    fromId: String!
    toId: String!
    from: String!
    to: String!
    message: String
    rating: String!
    date: String!
  }

  input RatingInput {
    _id: String
    fromId: String!
    toId: String!
    from: String!
    to: String!
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
    avatar: String!
    clientName: String!
    phone: String!
    email: String!
    payment: String!
    rating: Float!
    active: String!
    location: LocationInput
    allRatings: [Float]
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
    allRatings: [Float]!
    photo: String!
    active: String!
    carColor: String!
    carPlate: String!
    carSeatCount: Int!
    carModel: String!
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
    getDrivers(state: String!): [Driver]
    getClosestDrivers(clientPos: DriverLocationInput!): [DriverPos]
    getRide(name: String!): [Ride]
    getRides(state: String!): [Ride]
    getClient(clientName: String!): [Client]
    getClients(state: String!): [Client]
    getClientRides(id: String!): [Ride]
    getRating(name: String!): [Rating]
    getRatings(filter: String!): [Rating]
    userExists(login: String!): Client
  }

  type Mutation {
    addClient(client: ClientInput!): Boolean
    addDriver(driver: DriverInput!): Boolean
    addActiveDriver(driverPos: DriverPosInput!) : Boolean
    addRide(ride: RideInput!): Boolean
    addRating(rating: RatingInput!): Boolean
    editClient(client: ClientEditInput!): Boolean
    editDriver(driver: DriverEditInput!): Boolean
    editRide(ride: RideEditInput!): Boolean
    deleteClient(id: String!): Boolean
    deleteDriver(id: String!): Boolean
    deleteActiveDriver(socketId: String!) : Boolean
    deleteRide(id: String!): Boolean
    deleteRating(id: String!): Boolean
  }
`;

module.exports = typeDefs;
