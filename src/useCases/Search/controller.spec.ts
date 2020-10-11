import request from "supertest";
import app from "@src/app";

describe("Search", () => {
  it("should return error without query", async () => {
    const response = await request(app).get("/search");
    expect(response.status).toBe(400);
  });

  it("should return search results", async () => {
    const response = await request(app).get("/search/?q=react");
    expect(response.status).toBe(200);
  });
});
