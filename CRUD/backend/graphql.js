const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLSchema, GraphQLList } = require('graphql');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./config');
const app = express();
app.use(cors());
const PORT = 3000;


mongoose
    .connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

const carSchema = new mongoose.Schema({
    number: { type: String, required: true },
    release_date: { type: String, required: true },
    brand: { type: String, required: true },
    color: { type: String, required: true },
    state: { type: String, required: true },
    owner_surname: { type: String, required: true },
    address: { type: String, required: true },
}, { timestamps: true });

const Car = mongoose.model('Car', carSchema);

const CarType = new GraphQLObjectType({
    name: 'Car',
    fields: () => ({
        id: { type: GraphQLID },
        number: { type: GraphQLString },
        release_date: { type: GraphQLString },
        brand: { type: GraphQLString },
        color: { type: GraphQLString },
        state: { type: GraphQLString },
        owner_surname: { type: GraphQLString },
        address: { type: GraphQLString }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        cars: {
            type: new GraphQLList(CarType),
            resolve(parent, args) {
                return Car.find();
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addCar: {
            type: CarType,
            args: {
                number: { type: GraphQLString },
                release_date: { type: GraphQLString },
                brand: { type: GraphQLString },
                color: { type: GraphQLString },
                state: { type: GraphQLString },
                owner_surname: { type: GraphQLString },
                address: { type: GraphQLString }
            },
            resolve(parent, args) {
                let car = new Car({
                    number: args.number,
                    release_date: args.release_date,
                    brand: args.brand,
                    color: args.color,
                    state: args.state,
                    owner_surname: args.owner_surname,
                    address: args.address
                });
                return car.save();
            }
        },
        updateCar: {
            type: CarType,
            args: {
                id: { type: GraphQLID },
                number: { type: GraphQLString },
                release_date: { type: GraphQLString },
                brand: { type: GraphQLString },
                color: { type: GraphQLString },
                state: { type: GraphQLString },
                owner_surname: { type: GraphQLString },
                address: { type: GraphQLString }
            },
            resolve(parent, args) {
                return Car.findByIdAndUpdate(args.id, {
                    number: args.number,
                    release_date: args.release_date,
                    brand: args.brand,
                    color: args.color,
                    state: args.state,
                    owner_surname: args.owner_surname,
                    address: args.address
                }, { new: true });
            }
        },
        deleteCar: {
            type: CarType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Car.findByIdAndDelete(args.id);
            }
        }
    }
});

const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
