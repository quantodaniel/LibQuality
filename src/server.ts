import app from "@src/app";

const PORT = process.env.VIRTUAL_PORT || 3000;

app.listen(PORT, function () {
  console.log("*".repeat(60));
  console.log(`Server running on: ${PORT}`);
});
