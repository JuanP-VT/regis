import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local",
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

if (process.listenerCount("SIGINT") < 1) {
  process.on("SIGINT", handleExit);
}
if (process.listenerCount("SIGTERM") < 1) {
  process.on("SIGTERM", handleExit);
}
if (process.listenerCount("beforeExit") < 1) {
  process.on("beforeExit", handleExit);
}
export default dbConnect;
