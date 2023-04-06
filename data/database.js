import mongoose from "mongoose";

export const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "todojs",
    })
    .then((c) => {
      console.log(
        `DataBase Connected http://${c.connection.host}:${process.env.PORT}`
      );
    })
    .catch((e) => {
      console.log(e);
    });
};
