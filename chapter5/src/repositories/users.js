const { PrismaClient } = require("@prisma/client");
const JSONBigInt = require("json-bigint");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

exports.createUser = async (data) => {
    // encrypt password
    const saltRounds = 10;
    data.password = await bcrypt.hash(data.password, saltRounds);

    // create the new user
    const newUser = await prisma.users.create({
        data,
    });

    // Convert BigInt fields to string for safe serialization
    const serializedStudents = JSONBigInt.stringify(newUser);
    return JSONBigInt.parse(serializedStudents);
};

exports.getUserByEmail = async (email) => {
    const user = await prisma.users.findFirst({
        where: {
            email,
        },
    });

    // Convert BigInt fields to string for safe serialization
    const serializedStudents = JSONBigInt.stringify(user);
    return JSONBigInt.parse(serializedStudents);
};

exports.getUserById = async (id) => {
    const user = await prisma.users.findFirst({
        where: {
            id,
        },
    });

    // Convert BigInt fields to string for safe serialization
    const serializedStudents = JSONBigInt.stringify(user);
    return JSONBigInt.parse(serializedStudents);
};
