import mongoose from "mongoose";

const MONGODB_URI = process.env.DB_CONNECTION_STRING;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the DB_CONNECTION_STRING environment variable inside .env.local",
  );
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const dbConnect = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      maxPoolSize: 10, // Adjust the pool size as needed
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
};

const disconnect = () => {
  if (cached.conn) {
    cached.conn.disconnect();
  }
};

const handleExit = () => {
  disconnect();
  process.exit(0);
};

process.on("SIGINT", handleExit);
process.on("SIGTERM", handleExit);
process.on("beforeExit", handleExit);

export default dbConnect;
