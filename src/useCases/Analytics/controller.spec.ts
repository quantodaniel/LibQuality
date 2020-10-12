import request from "supertest";
import app from "@src/app";

describe("Analytics", () => {
  it("should return error with inexistent repo", async () => {
    const response = await request(app).get(
      "/repos/octocat/inexistent-repo/analytics"
    );
    expect(response.status).toBe(400);
  });

  it("should return success with existing repo", async () => {
    await request(app).get("/repos/octocat/Hello-World/metadata");
    const response = await request(app).get(
      "/repos/octocat/Hello-World/analytics"
    );
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});
