import request from "supertest";
import app from "./app";

describe("Server setup", () => {
  it("should return status 200 and text 'ok'", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.text).toBe("ok");
  });
});
