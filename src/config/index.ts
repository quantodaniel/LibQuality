import mongoose from "mongoose";

const uri = process.env.MONGO_HOST;
export const connectMongoDb = async () => {
  mongoose.connection.on("error", (err) => {
    console.log(err);
    console.log("erro durante a conexão");
  });

  return await mongoose
    .connect(uri, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    .catch(() => {
      console.log("erro ao conectar ao mongo");
    });
};

export const db = mongoose;
export const DataTypes = mongoose.Types;
